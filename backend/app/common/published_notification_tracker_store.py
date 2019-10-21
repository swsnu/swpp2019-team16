from interface import Interface


class PublishedNotificationTrackerStore(Interface):

    def published_notification_tracker(self):
        pass

    def track_most_recent_published_notification(self,
                                                 published_notification_tracker,
                                                 notifications):
        pass
