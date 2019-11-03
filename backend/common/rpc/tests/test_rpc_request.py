from django.test import TestCase

from backend.common.rpc.rpc_request import RpcRequest


class RpcRequestTestCase(TestCase):

    def test_properties(self):
        rpc_request = RpcRequest(id='hello', params='params', method='create')
        self.assertEqual(rpc_request.jsonrpc, '2.0')
        self.assertEqual(rpc_request.params, 'params')
        self.assertEqual(rpc_request.id, 'hello')
        self.assertEqual(rpc_request.method, 'create')

    def test_str(self):
        rpc_request = RpcRequest(id='hello', params='params', method='create')
        self.assertEqual(str(rpc_request), 'jsonrpc=2.0,id=hello,params=params,method=create')
