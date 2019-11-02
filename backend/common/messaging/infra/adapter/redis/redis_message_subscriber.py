import asyncio
import pickle
import logging
import traceback

from django.conf import settings
from interface import implements
from redis import Redis

from backend.common.messaging.message_subscriber import MessageSubscriber


logger = logging.getLogger(__name__)


class RedisMessageSubscriber(implements(MessageSubscriber)):

    def __init__(self):
        self.__client = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)
        self.__stop = False

    async def subscribe_message(self, topic, message_handler):
        p = self.__client.pubsub()
        p.subscribe(topic)
        while self.stop is False:
            await asyncio.sleep(1)

            message = p.get_message(ignore_subscribe_messages=True)
            if message is None:
                continue

            try:
                message_handler.handle(
                    pickle.loads(message['data']))
            except Exception as ex:
                # TODO: refactor it
                # TODO: replace print() with logger
                print(''.join(traceback.format_exception(
                    None, ex, ex.__traceback__)))

    @property
    def stop(self):
        return self.__stop

    def close(self):
        self.__stop = True
