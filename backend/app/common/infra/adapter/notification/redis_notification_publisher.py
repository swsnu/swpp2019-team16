from interface import implements

from common.infra.adapter.messaging.redis.message_producer import MessageProducer
from common.notification_publisher import NotificationPublisher


class RedisNotificationPublisher(implements(NotificationPublisher)):

    def __init__(self, event_store, published_notification_tracker_store):
        self.__event_store = event_store
        self.__published_notification_tracker_store \
            = published_notification_tracker_store

    # TODO: implement me
    def publish_notification(self):
        # retrieve notification tracker

        # retrieve unpublished notifications

        # create redis message producer

        # update latest published notification

        # close redis message producer
        pass

    # TODO: implement me
    def list_unpublished_notifications(self, most_recent_published_message_id):
        # get all stored events since most_recent_published_message_id

        # convert events to notifications

        # return notifications
        pass

    def __publish(self, message_producer, notification):
        message_producer.send(notification)

    @property
    def published_notification_tracker_store(self):
        return self.__published_notification_tracker_store

    def __message_producer(self):
        return MessageProducer()
