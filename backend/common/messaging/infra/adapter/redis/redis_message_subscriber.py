import asyncio
import pickle

from django.conf import settings
from interface import implements
from redis import Redis

from backend.common.messaging.message_subscriber import MessageSubscriber


class RedisMessageSubscriber(implements(MessageSubscriber)):

    def __init__(self):
        self.__client = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)
        self.__stop = False

    async def subscribe_message(self, topic, message_handler):
        p = self.__client.pubsub()
        p.subscribe(topic)

        while self.stop is False:
            await asyncio.sleep(0.5)

            message = p.get_message(ignore_subscribe_messages=True)
            if message is None:
                continue

            message_handler.handle(
                pickle.loads(message['data']))

    @property
    def stop(self):
        return self.__stop

    def close(self):
        self.__stop = True
