import pickle
import time

from django.conf import settings
from django.test import TestCase
from redis import Redis
from tenacity import retry, stop_after_delay, wait_exponential

from backend.common.event.domain_event import DomainEvent
from backend.common.messaging.infra.redis.redis_message_publisher \
    import RedisMessagePublisher


class TestDomainEvent(DomainEvent):

    def __init__(self, type_name, version):
        super().__init__(type_name, version)

    def __eq__(self, other):
        return super().__eq__(other)


class RedisMessageProducerIntegrationTestCase(TestCase):

    def setUp(self):
        redis_client = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)
        self.ps = redis_client.pubsub()

    def test_publish_message(self):
        # given
        COMMAND_TYPE = "create_user"
        self.ps.subscribe(COMMAND_TYPE)
        # when
        event_publisher = RedisMessagePublisher()
        event = TestDomainEvent(COMMAND_TYPE, "v1")

        # when
        # sleep for 0.5 sec to ensure successfully subscribe topic
        time.sleep(0.5)
        event_publisher.publish_message(event)

        # then
        self.ps.get_message()  # first message is channel message

        @retry(
            stop=stop_after_delay(10),
            wait=wait_exponential(multiplier=1, min=1, max=2)
        )
        def retry_get_message():
            message = self.ps.get_message()
            if message is None or message['type'] is 'subscribe':
                raise Exception(
                    "message is None or type is subscribe, retry...")
            # then
            result = pickle.loads(message['data'])
            self.assertEqual(result, event)

        retry_get_message()
