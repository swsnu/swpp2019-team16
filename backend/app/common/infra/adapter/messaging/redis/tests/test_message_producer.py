import pickle
import codecs
import time

from django.conf import settings
from django.test import TestCase
from redis import Redis
from tenacity import retry, stop_after_delay, wait_exponential

from common.domain_model import DomainEvent
from common.notification import Notification
from common.infra.adapter.messaging.redis.message_producer import MessageProducer


class DomainEventImpl(DomainEvent):

    def __init__(self, version):
        super().__init__(version)

    def __eq__(self, other):
        return super().__eq__(other)


class MessageProducerIntegrationTestCase(TestCase):

    def setUp(self):
        redis_client = Redis(connection_pool=settings.REDIS_CONNECTION_POOL)
        self.ps = redis_client.pubsub()

    def test_message_producer_send(self):
        # given
        EVENT_TYPE = "create_user"
        self.ps.subscribe(EVENT_TYPE)
        # when
        message_producer = MessageProducer()
        event = DomainEventImpl("v1")
        notification = Notification(
            notification_id=1,
            event=event,
            type_name=EVENT_TYPE,
            version="v1")
        # when
        # sleep for 0.5 sec to ensure successfully subscribe topic
        time.sleep(0.5)
        message_producer.send(notification)

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
