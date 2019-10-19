from interface import implements

from common.notification_publisher import NotificationPublisher


class RedisNotificationPublisher(implements(NotificationPublisher)):

    def __init__(self, event_store, published_notification_tracker_store):
        self.__event_store = event_store
        self.__published_notification_tracker_store \
            = published_notification_tracker_store

    def publish_notification(self):
        # retrieve notification tracker

        # retrieve unpublished notifications

        # create redis message producer

        # update latest published notification

        # close redis message producer
        pass

    @property
    def published_notification_tracker_store(self):
        return self.__published_notification_tracker_store
