import pickle
import shortuuid

from django.conf import settings
from interface import implements
from redis import Redis

from backend.common.rpc.rpc_client import RpcClient
from backend.common.rpc.rpc_request import RpcRequest


class RedisRpcClient(implements(RpcClient)):

    def __init__(self):
        try:
            self.__client = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)
        except Exception as e:
            print(e)

    def call(self, topic, data):
        request = RpcRequest(
            params=data,
            id=shortuuid.uuid(),
        )
        self.__client.lpush(topic, pickle.dumps(request))
        a, response = self.__client.brpop(keys=request.id, timeout=5)
        return pickle.loads(response)
