from django.test import TestCase

from common.domain_model import DomainEvent
from common.notification import Notification


class DomainEventImpl(DomainEvent):

    def __init__(self, version):
        super().__init__(version)


class NotificationTestCase(TestCase):

    def test_properties(self):
        event = DomainEventImpl("v1")
        noti = Notification(
            notification_id=1,
            event=event,
            type_name="create_user",
            version="v1")

        self.assertEqual(noti.notification_id, 1)
        self.assertEqual(noti.event, event)
        self.assertEqual(noti.type_name, "create_user")
        self.assertEqual(noti.version, "v1")
        self.assertIsNotNone(noti.occurred_on)
