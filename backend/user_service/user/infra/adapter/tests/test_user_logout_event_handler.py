from django.test import TestCase

from backend.user_service.user.infra.adapter.user_logout_event_handler \
    import UserLogoutEventHandler
from backend.common.event.user_logout_event \
    import UserLogoutEvent


class UserLogoutEventHandlerTestCase(TestCase):

    def test_when_message_has_no_user_id_raise_exception(self):
        user_logout_event_handler = \
            UserLogoutEventHandler(user_application_service=None)

        with self.assertRaises(ValueError):
            user_logout_event_handler.handle(
                UserLogoutEvent(user_id=None))

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
        user_logout_event_handler = UserLogoutEventHandler(
            user_application_service=mock_user_application_service)

        user_logout_event_handler.handle(UserLogoutEvent(
            user_id=USER_ID))
