class RpcRequest:

    def __init__(self, params, id, method=''):
        self._jsonrpc = '2.0'
        self._params = params
        self._id = id
        self._method = method

    @property
    def jsonrpc(self):
        return self._jsonrpc

    @property
    def params(self):
        return self._params

    @property
    def id(self):
        return self._id

    @property
    def method(self):
        return self._method

    def __str__(self):
        return 'jsonrpc={},id={},params={},method={}'.format(
            self.jsonrpc, self.id, self.params, self.method)
