import json

class RpcResponse:

    def __init__(self, result, id):
        self._jsonrpc = '2.0'
        self._result = result
        self._id = id

    @property
    def jsonrpc(self):
        return self._jsonrpc

    @property
    def result(self):
        return self._result

    @property
    def id(self):
        return self._id
        
    def __str__(self):
        
        return 'jsonrpc={},id={},result={}'.format(
            self.jsonrpc, self.id, self.result)
