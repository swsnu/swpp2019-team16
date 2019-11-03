from django.test import TestCase

from backend.common.rpc.rpc_response import RpcResponse


class RpcResponseTestCase(TestCase):

    def test_properties(self):
        rpc_request = RpcResponse(id='hello', result='created')
        self.assertEqual(rpc_request.jsonrpc, '2.0')
        self.assertEqual(rpc_request.id, 'hello')
        self.assertEqual(rpc_request.result, 'created')

    def test_str(self):
        rpc_request = RpcResponse(id='hello', result='created')
        self.assertEqual(
            str(rpc_request), 'jsonrpc=2.0,id=hello,result=created')
