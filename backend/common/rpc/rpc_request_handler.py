from interface import Interface


class RpcRequestHandler(Interface):

    def handle(self, message):
        pass
