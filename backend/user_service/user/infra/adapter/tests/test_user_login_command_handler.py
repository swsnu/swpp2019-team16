from django.test import TestCase

from backend.user_service.user.infra.adapter.user_login_command_handler \
    import UserLoginCommandHandler
from backend.common.command.user_login_command \
    import UserLoginCommand


class UserLoginCommandHandlerTestCase(TestCase):

    def test_when_message_has_no_email_or_password_or_no_user_type_raise_exception(self):
        user_login_command_handler = \
            UserLoginCommandHandler(user_application_service=None)

        with self.assertRaises(ValueError):
            user_login_command_handler.handle(
                UserLoginCommand(email=None, password=None, user_type=None, request=None))

    def test_when_message_valid_field_then_call_register(self):

        class MockUserApplicationService:

            def __init__(self, assert_func):
                self.assert_func = assert_func

            def login(self, email, password, user_type, request):
                self.assert_func(email, password, user_type, request)

        EMAIL = 'test@gmail.com'
        PASSWORD = 1234
        USER_TYPE = 'RIDER'        
        REQUEST = {'user':{id: 1}}

        def assert_func(email, password, user_type, request):
            self.assertEqual(email, EMAIL)
            self.assertEqual(password, PASSWORD)
            self.assertEqual(user_type, USER_TYPE)
            self.assertEqual(request, REQUEST)

        mock_user_application_service = \
            MockUserApplicationService(assert_func=assert_func)
        user_login_command_handler = UserLoginCommandHandler(
            user_application_service=mock_user_application_service)

        user_login_command_handler.handle(UserLoginCommand(
            email=EMAIL, password=PASSWORD, user_type=USER_TYPE, request=REQUEST))
