from django.test import TestCase

from backend.user_service.user.infra.adapter.user_logout_command_handler \
    import UserLogoutCommandHandler
from backend.common.command.user_logout_command \
    import UserLogoutCommand


class UserLogoutCommandHandlerTestCase(TestCase):

    def test_when_message_has_no_user_id_raise_exception(self):
        user_logout_command_handler = \
            UserLogoutCommandHandler(user_application_service=None)

        with self.assertRaises(ValueError):
            user_logout_command_handler.handle(
                UserLogoutCommand(user_id=None))

    def test_when_message_valid_field_then_call_register(self):

        class MockUserApplicationService:

            def __init__(self, assert_func):
                self.assert_func = assert_func

            def logout(self, user_id):
                self.assert_func(user_id)

        USER_ID = 1

        def assert_func(user_id):
            self.assertEqual(user_id, USER_ID)
            
        mock_user_application_service = \
            MockUserApplicationService(assert_func=assert_func)
        user_logout_command_handler = UserLogoutCommandHandler(
            user_application_service=mock_user_application_service)

        user_logout_command_handler.handle(UserLogoutCommand(
            user_id=USER_ID))
