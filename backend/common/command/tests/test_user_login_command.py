from django.test import TestCase

from backend.common.command.user_login_command import UserLoginCommand


class UserLoginCommandTestCase(TestCase):

    def test_properties(self):
        command = UserLoginCommand(user_id=1)
        self.assertEqual(command.user_id, 1)

    def test_str(self):
        command = UserLoginCommand(user_id=1)
        self.assertEqual(
            str(command),
            'user_id=1'
        )
