from django.test import TestCase, Client
from unittest.mock import patch
from backend.common.rpc.infra.adapter.redis.redis_rpc_client \
    import RedisRpcClient
from backend.common.rpc.rpc_response import RpcResponse
from backend.common.command.user_create_command \
    import USER_CREATE_COMMAND
from backend.common.event.user_login_event \
    import USER_LOGIN_EVENT
from django.contrib.auth import get_user_model


class UserControllerTestCase(TestCase):

    def setUp(self):
        self.client = Client()

    def test_register_user_wrong_api(self):
        response = self.client.get('/api/v1/user/register',
                                   content_type='application/json')

        self.assertEqual(response.status_code, 405)


    @patch.object(RedisRpcClient, 'call')
    def test_register_user_rider_success(self, call_fn):
        request = {
            'email': 'swpp@swpp.com',
            'password': 'pleaseNotC',
            'userType': 'rider',
            'carType': '',
            'plateNo': ''
        }
        call_fn.return_value = RpcResponse(
            result={
                'email': 'swpp@swpp.com',
                'password': 'pleaseNotC',
                'user_type': 'rider',
                'car_type': '',
                'plate_no': ''
            },
            id=1,
        )
        response = self.client.post(
            '/api/v1/user/register',
            request,
            content_type='application/json'
        )

        args, kwargs = call_fn.call_args
        self.assertEqual(args[0], USER_CREATE_COMMAND)
        self.assertEqual(response.status_code, 200)


    @patch.object(RedisRpcClient, 'call')
    def test_register_user_driver_success(self, call_fn):
        request = {
            'email': 'swpp@swpp.com',
            'password': 'pleaseNotC',
            'userType': 'driver',
            'carType': 'BMW',
            'plateNo': '01a 1234'
        }
        call_fn.return_value = RpcResponse(
            result={
                'email': 'swpp@swpp.com',
                'password': 'pleaseNotC',
                'user_type': 'driver',
                'car_type': 'BMW',
                'plate_no': '01a 1234'
            },
            id=1,
        )
        response = self.client.post(
            '/api/v1/user/register',
            request,
            content_type='application/json'
        )

        args, kwargs = call_fn.call_args
        self.assertEqual(args[0], USER_CREATE_COMMAND)
        self.assertEqual(response.status_code, 200)
    

    @patch.object(RedisRpcClient, 'call')
    def test_check_user_success(self, call_fn):
        mock_user = get_user_model().objects.create(id=1)
        call_fn.return_value = RpcResponse(
            result={},
            id=1,
        )
        response = self.client.get(
            '/api/v1/user/1',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)


    def test_login_user_when_method_is_not_post_response_with_405(self):
        response = self.client.get('/api/v1/user/login',
                                   content_type='application/json')

        self.assertEqual(response.status_code, 405)


    def test_logout_user_when_method_is_not_post_response_with_405(self):
        response = self.client.get('/api/v1/user/logout',
                                   content_type='application/json')

        self.assertEqual(response.status_code, 401)


    def test_check_when_not_get(self):
        response = self.client.post('/api/v1/user/1',
                                    content_type='application/json')

        self.assertEqual(response.status_code, 405)
