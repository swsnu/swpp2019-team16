from django.test import TestCase

from backend.user_service.user.infra.adapter.user_login_command_handler \
    import UserLoginCommandHandler
from backend.common.command.user_login_command \
    import UserLoginCommand


class UserLoginCommandHandlerTestCase(TestCase):

    def test_when_message_has_user_id_or_no_user_type_raise_exception(self):
        user_login_command_handler = \
            UserLoginCommandHandler(user_application_service=None)

        with self.assertRaises(ValueError):
            user_login_command_handler.handle(
                UserLoginCommand(user_id=None))

    def test_when_message_valid_field_then_call_register(self):

        class MockUserApplicationService:

            def __init__(self, assert_func):
                self.assert_func = assert_func

            def login(self, user_id):
                self.assert_func(user_id)

        USER_ID = 1

        def assert_func(user_id):
            self.assertEqual(user_id, USER_ID)

        mock_user_application_service = \
            MockUserApplicationService(assert_func=assert_func)
        user_login_command_handler = UserLoginCommandHandler(
            user_application_service=mock_user_application_service)

        user_login_command_handler.handle(UserLoginCommand(user_id=USER_ID))
