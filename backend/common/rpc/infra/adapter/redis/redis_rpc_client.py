import pickle
import shortuuid

from django.conf import settings
from interface import implements
from redis import Redis

from backend.common.rpc.rpc_client import RpcClient
from backend.common.rpc.rpc_request import RpcRequest


class RedisRpcClient(implements(RpcClient)):

    def __init__(self):
        self.__client = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)

    def call(self, topic, data):
        request = RpcRequest(
            params=data,
            id=shortuuid.uuid(),
        )
        self.__client.lpush(topic, pickle.dumps(request))
        _, response = self.__client.brpop(keys=request.id)
        return pickle.loads(response)
