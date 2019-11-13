from django.test import TestCase

from backend.user_service.user.infra.adapter.user_create_command_handler \
    import UserCreateCommandHandler
from backend.common.command.user_create_command \
    import UserCreateCommand


class UserCreateCommandHandlerTestCase(TestCase):

    def test_when_message_has_no_email_or_password_raise_exception(self):
        user_create_command_handler = \
            UserCreateCommandHandler(user_application_service=None)

        with self.assertRaises(ValueError):
            user_create_command_handler.handle(
                UserCreateCommand(email=None, password=None, user_type=None))

    def test_when_message_valid_field_then_call_register(self):

        class MockUserApplicationService:

            def __init__(self, assert_func):
                self.assert_func = assert_func

            def register(self, email, password, user_type, car_type, plate):
                self.assert_func(email, password, user_type, car_type, plate)

        EMAIL = 'test@gmail.com'
        PASSWORD = 1234
        USER_TYPE = 'RIDER'
        CAR_TYPE = None
        PLATE = None

        def assert_func(email, password, user_type, car_type, plate):
            self.assertEqual(email, EMAIL)
            self.assertEqual(password, PASSWORD)
            self.assertEqual(user_type, USER_TYPE)
            self.assertEqual(car_type, CAR_TYPE)
            self.assertEqual(plate, PLATE)

        mock_user_application_service = \
            MockUserApplicationService(assert_func=assert_func)
        user_create_command_handler = UserCreateCommandHandler(
            user_application_service=mock_user_application_service)

        user_create_command_handler.handle(UserCreateCommand(
            email=EMAIL, password=PASSWORD, user_type=USER_TYPE, car_type=CAR_TYPE, plate=PLATE))
