from django.test import TestCase

from backend.user_service.user.infra.adapter.user_point_update_command_handler \
    import UserPointUpdateCommandHandler
from backend.common.command.user_point_update_command \
    import UserPointUpdateCommand


class UserCreateCommandHandlerTestCase(TestCase):

    def test_when_message_has_no_user_id_or_point_raise_exception(self):
        user_point_update_command_handler = \
            UserPointUpdateCommandHandler(user_application_service=None)

        with self.assertRaises(ValueError):
            user_point_update_command_handler.handle(
                UserPointUpdateCommand(user_id=None, point=None))

    def test_when_message_valid_field_then_call_register(self):

        class MockUserApplicationService:

            def __init__(self, assert_func):
                self.assert_func = assert_func

            def point(self, user_id, point):
                self.assert_func(user_id, point)

        USER_ID=1
        POINT=1234

        def assert_func(user_id, point):
            self.assertEqual(user_id, USER_ID)
            self.assertEqual(point, POINT)

        mock_user_application_service = \
            MockUserApplicationService(assert_func=assert_func)
        user_point_update_command_handler = UserPointUpdateCommandHandler(
            user_application_service=mock_user_application_service)

        user_point_update_command_handler.handle(UserPointUpdateCommand(
            user_id=USER_ID, point=POINT))
