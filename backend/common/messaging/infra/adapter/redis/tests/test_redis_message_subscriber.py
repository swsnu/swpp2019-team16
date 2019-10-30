import asyncio
import pickle

from django.conf import settings
from django.test import TestCase
from interface import implements
from redis import Redis

from backend.common.messaging.message_handler import MessageHandler
from backend.common.messaging.infra.adapter.redis.redis_message_subscriber \
    import RedisMessageSubscriber
from backend.common.messaging.message import Message


class TestMessage(Message):
    def __init__(self, type_name):
        super().__init__(type_name)


class TestMessageHandler(implements(MessageHandler)):

    def __init__(self, assertion_func, subscriber):
        self.assertion_func = assertion_func
        self.subscriber = subscriber

    def handle(self, message):
        self.assertion_func(message)
        # when assertion done, close subscriber
        self.subscriber.close()


class RedisMessageSubscriberIntegrationTestCase(TestCase):

    def setUp(self):
        self.redis_client = Redis(
            connection_pool=settings.REDIS_CONNECTION_POOL)

    def test_subscribe_message(self):
        async def run_async_test():

            COMMAND_TYPE = "create_user"
            message = TestMessage(COMMAND_TYPE)

            def assertion_func(received):
                self.assertEqual(received, message)

            subscriber = RedisMessageSubscriber()
            handler = TestMessageHandler(assertion_func, subscriber)

            async def subscribe():
                await subscriber.subscribe_message(COMMAND_TYPE, handler)

            async def publish():
                await asyncio.sleep(0.5)
                self.redis_client.publish(COMMAND_TYPE, pickle.dumps(message))

            subscribe_task = asyncio.create_task(subscribe())
            publish_task = asyncio.create_task(publish())

            await publish_task
            await subscribe_task

            subscriber.close()

        asyncio.run(run_async_test())
