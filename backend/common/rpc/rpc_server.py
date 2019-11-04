from interface import Interface


class RpcServer(Interface):

    def register_handler(self, topic, request_handler):
        pass
