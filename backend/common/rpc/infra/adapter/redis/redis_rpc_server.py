import asyncio
import pickle
import traceback
from asyncio import CancelledError

from django.conf import settings
from interface import implements
from redis import Redis

from backend.common.rpc.rpc_server import RpcServer
from backend.common.rpc.rpc_response import RpcResponse


class RedisRpcServer(implements(RpcServer)):

    def __init__(self):
        self.__client = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)
        self.__stop = False

    async def register_handler(self, topic, request_handler):
        while self.stop is False:
            request = None
            try:
                if self.__client.llen(name=topic) < 1:
                    await asyncio.sleep(1)
                    continue

                request = self.__client.rpop(topic)
                request = pickle.loads(request)

                """
                when request successfully unmarshalled, process request
                with request_handler
                """
                result = request_handler.handle(request.params)

                """
                send back result to client
                """
                self.__client.rpush(request.id, pickle.dumps(
                    RpcResponse(result=result, id=request.id)
                ))
                self.__client.expire(request.id, time=15)
            except CancelledError:
                self.close()
                break
            except Exception as ex:
                # TODO: refactor it
                # TODO: replace print() with logger
                print(''.join(traceback.format_exception(
                    None, ex, ex.__traceback__)))

                self.__client.rpush(request.id, pickle.dumps(
                    RpcResponse(result=ex, id=request.id)
                ))
                self.__client.expire(request.id, time=15)

    @property
    def stop(self):
        return self.__stop

    def close(self):
        self.__stop = True
        self.__client.close()
