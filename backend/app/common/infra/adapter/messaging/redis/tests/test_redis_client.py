from django.test import TestCase

from ..redis_client import RedisClient


class RedisClientTestCase(TestCase):

    def test_redis_client_instantiate(self):
        self.assertIsNotNone(RedisClient.new())

