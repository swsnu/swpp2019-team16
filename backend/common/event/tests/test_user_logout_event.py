from django.test import TestCase

from backend.common.event.user_logout_event import UserLogoutEvent


class UserLogoutEventTestCase(TestCase):

    def test_properties(self):
        USER_ID = 1
        event = UserLogoutEvent(user_id=USER_ID)
        self.assertEqual(event.user_id, USER_ID)

    def test_str(self):
        USER_ID = 1
        event = UserLogoutEvent(user_id=USER_ID)
        self.assertEqual(
            str(event),
            'user_id=1'
        )
