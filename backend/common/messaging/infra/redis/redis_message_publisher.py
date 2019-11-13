import pickle

from django.conf import settings
from interface import implements
from redis import Redis

from backend.common.messaging.message_publisher import MessagePublisher


class RedisMessagePublisher(implements(MessagePublisher)):

    def __init__(self):
        self.__client = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)

    def publish_message(self, message):
        """
        Later we can save published events to event_store and track
        most latest published redis and we can utilize that information
        to rollback the system
        """
        self.__publish(message.type_name, message)

    def __publish(self, topic, message):
        self.__client.publish(topic,
                              pickle.dumps(message))
