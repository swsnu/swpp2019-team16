import asyncio
import pickle
import threading
import time

import shortuuid
from django.conf import settings
from django.test import TestCase
from interface import implements
from random_word import RandomWords
from redis import Redis

from backend.common.command.user_create_command \
    import UserCreateCommand
from backend.common.rpc.infra.adapter.redis.redis_rpc_server \
    import RedisRpcServer
from backend.common.rpc.rpc_request_handler import RpcRequestHandler
from backend.common.rpc.rpc_request import RpcRequest


class RedisRpcServerTestCase(TestCase):

    def test_register_handler(self):
        TOPIC = RandomWords().get_random_word()
        PARAMS = UserCreateCommand(email='test@gmail.com', password=1234, user_type='RIDER')

        def call():
            """ wait 1 sec for server to start """
            time.sleep(1)

            redis = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)
            request = RpcRequest(params=PARAMS, id=shortuuid.uuid())

            redis.lpush(TOPIC, pickle.dumps(request))
            _, response = redis.brpop(keys=request.id)
            response = pickle.loads(response)

            """ assertion """
            self.assertEqual(response.id, request.id)
            self.assertEqual(response.result, PARAMS)

        """
        check_message takes message which is come from server test handler
        """
        def check_message(message):
            self.assertEqual(message, PARAMS)

        """
        TestRpcRequestHandler receive assertion_func which verify received
        message from client
        """
        class TestRpcRequestHandler(implements(RpcRequestHandler)):

            def __init__(self, assertion_func):
                self.assertion_func = assertion_func

            def handle(self, message):
                self.assertion_func(message)
                return message

        """
        shutdown close server after 2 secs to break infinite loop
        """
        async def shutdown(server):
            await asyncio.sleep(3)
            server.close()

        async def listen():
            server = RedisRpcServer()
            server_task = asyncio.create_task(
                server.register_handler(
                    topic=TOPIC,
                    request_handler=TestRpcRequestHandler(check_message))
            )
            shutdown_task = asyncio.create_task(
                shutdown(server)
            )
            await asyncio.gather(server_task, shutdown_task)

        threading.Thread(target=call).start()
        asyncio.run(listen())
