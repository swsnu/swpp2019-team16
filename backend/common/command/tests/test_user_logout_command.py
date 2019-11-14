from django.test import TestCase

from backend.common.command.user_logout_command import UserLogoutCommand


class UserLogoutCommandTestCase(TestCase):

    def test_properties(self):
        command = UserLogoutCommand(user_id=1)
        self.assertEqual(command.user_id, 1)

    def test_str(self):
        command = UserLogoutCommand(user_id=1)
        self.assertEqual(
            str(command),
            'user_id=1'
        )
