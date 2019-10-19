from django.conf import settings
from redis import Redis


class RedisClient:

    @staticmethod
    def new():
        return Redis(connection_pool=settings.REDIS_CONNECTION_POOL)
