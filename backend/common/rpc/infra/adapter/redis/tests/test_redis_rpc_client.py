import pickle
import threading
import time

from django.conf import settings
from django.test import TestCase
from random_word import RandomWords
from redis import Redis

from backend.common.rpc.infra.adapter.redis.redis_rpc_client \
    import RedisRpcClient
from backend.common.command.user_create_command \
    import UserCreateCommand


class RedisRpcClientTestCase(TestCase):

    def test_call(self):
        TOPIC = RandomWords().get_random_word()
        PARAMS = UserCreateCommand(email='test@gmail.com', password=1234)
        RESULT = 'ok'

        def listen():
            redis = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)
            while True:
                if redis.llen(name=TOPIC) < 1:
                    time.sleep(1)
                    continue
                request = redis.rpop(TOPIC)
                request = pickle.loads(request)

                self.assertEqual(request.params, PARAMS)

                redis.rpush(request.id, pickle.dumps(RESULT))
                redis.expire(request.id, 1)
                break
        """
        Python runs on single thread, infinite loop (server) with
        blocking code (client) do not work correctly.
        So infinite loop runs on another thread
        """
        threading.Thread(target=listen).start()

        client = RedisRpcClient()
        response = client.call(TOPIC, PARAMS)
        self.assertEqual(response, RESULT)
