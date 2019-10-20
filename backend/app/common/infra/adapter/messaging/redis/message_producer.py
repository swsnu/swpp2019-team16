import pickle
import codecs

from django.conf import settings
from redis import Redis


class MessageProducer:

    def __init__(self):
        self.__client = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)

    def send(self, notification):
        self.__client.publish(notification.type_name,
                              pickle.dumps(notification.event))
