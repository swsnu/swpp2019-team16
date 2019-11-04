from interface import Interface


class RpcClient(Interface):

    def call(self, topic, data):
        pass
