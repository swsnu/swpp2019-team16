from django.test import TestCase

from backend.common.event.user_login_event import UserLoginEvent


class UserLoginEventTestCase(TestCase):

    def test_properties(self):
        USER_ID = 1
        event = UserLoginEvent(user_id=USER_ID)
        self.assertEqual(event.user_id, USER_ID)

    def test_str(self):
        USER_ID = 1
        event = UserLoginEvent(user_id=USER_ID)
        self.assertEqual(
            str(event),
            'user_id=1'
        )
