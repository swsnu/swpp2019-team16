from django.test import TestCase

from backend.grpc_gateway.connection.domain.message_queue import MessageQueue


class MessageQueueTestCase(TestCase):

    def test_sharing_queue(self):
        class Producer:
            def __init__(self, mq):
                self.mq = mq

            def produce(self, item):
                self.mq.put(item)

        class Consumer:
            def __init__(self, mq):
                self.mq = mq

            def consume(self):
                return self.mq.get()

        mq = MessageQueue()
        producer = Producer(mq)
        consumer = Consumer(mq)

        producer.produce('message')
        result = consumer.consume()
        self.assertEqual(result, 'message')
