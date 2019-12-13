from django.test import TestCase, Client
from unittest.mock import patch
from backend.common.rpc.infra.adapter.redis.redis_rpc_client \
    import RedisRpcClient
from backend.common.rpc.rpc_response import RpcResponse
from backend.common.command.group_create_command import GROUP_CREATE_COMMAND
from backend.common.command.group_update_command import GROUP_UPDATE_COMMAND
from backend.group_service.group.domain.group import Group


class GroupControllerTestCase(TestCase):

    def setUp(self):
        self.client = Client()


    def test_create_group_wrong_api(self):
        response = self.client.get(
            '/api/v1/group/',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 405)


    @patch.object(RedisRpcClient, 'call')
    def test_create_group_success(self, call_fn):
        request = {
            'rider_id_list': [1,2,3,4],
            'from_location': 'here',
            'to_location': 'there'
        }
        call_fn.return_value = RpcResponse(
            result={
                'rider_id_list': [1,2,3,4],
                'from_location': 'here',
                'to_location': 'there'
            },
            id=1,
        )
        response = self.client.post(
            '/api/v1/group/', 
            request,
            content_type='application/json'
        )

        args, kwargs = call_fn.call_args
        self.assertEqual(args[0], GROUP_CREATE_COMMAND)
        self.assertEqual(response.status_code, 204)


    @patch.object(RedisRpcClient, 'call')
    def test_update_group_sucess(self, call_fn):
        mock_group = Group.objects.create(id=1)
        request = {
            'driverId': 1,
            'groupId': 2,
        }
        call_fn.return_value = RpcResponse(
            result={
                'driver_id': 1,
                'group_id': 2,
            },
            id=1,
        )
        response = self.client.put(
            '/api/v1/group/1',
            request,
            content_type='application/json'
        )

        args, kwargs = call_fn.call_args
        self.assertEqual(args[0], GROUP_UPDATE_COMMAND)
        self.assertEqual(response.status_code, 204)
