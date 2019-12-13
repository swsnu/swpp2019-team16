from django.test import TestCase, Client
from unittest.mock import patch
from backend.common.rpc.infra.adapter.redis.redis_rpc_client \
    import RedisRpcClient
from backend.common.rpc.rpc_response import RpcResponse
from backend.common.command.carpool_request_create_command \
    import CARPOOL_REQUEST_CREATE_COMMAND
from backend.common.command.carpool_request_delete_command \
    import CARPOOL_REQUEST_DELETE_COMMAND
from backend.carpool_request_service.carpool_request.domain.carpool_request \
    import CarpoolRequest


class CarpoolRequestControllerTestCase(TestCase):

    def setUp(self):
        self.client = Client()


    def test_create_carpool_request_wrong_api(self):
        response = self.client.get('/api/v1/carpool_request/',
                                   content_type='application/json')
        self.assertEqual(response.status_code, 405)


    @patch.object(RedisRpcClient, 'call')
    def test_create_carpool_request_success(self, call_fn):
        request = {
            'from_location': 'here',
            'to_location': 'there',
            'minimum_passenger': 4,
            'rider_id': 1
        }
        call_fn.return_value = RpcResponse(
            result={
                'from_location': 'here',
                'to_location': 'there',
                'minimum_passenger': 4,
                'rider_id': 1
            },
            id=1,
        )
        response = self.client.post(
            '/api/v1/carpool_request/',
            request,
            content_type='application/json'
        )

        args, kwargs = call_fn.call_args
        self.assertEqual(args[0], CARPOOL_REQUEST_CREATE_COMMAND)
        self.assertEqual(response.status_code, 204)

        @patch.object(RedisRpcClient, 'call')
        def test_delete_carpool_request_success(self, call_fn):
            mock_carpool_request = CarpoolRequest.objects.create(id=1)
            request = {
                'request_id': 1
            }
            call_fn.return_value = RpcResponse(
                result={
                    'request_id': 1
                },
                id=1,
            )
            response = self.client.delete(
                '/api/v1/carpool_request/1',
                request,
                content_type='application/json'
            )

            args, kwargs = call_fn.call_args
            self.assertEqual(args[0], CARPOOL_REQUEST_DELETE_COMMAND)
            self.assertEqual(response.status_code, 204)
