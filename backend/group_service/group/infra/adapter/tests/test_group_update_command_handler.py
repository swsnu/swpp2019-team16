from django.test import TestCase

from backend.group_service.group.infra.adapter.group_update_command_handler \
    import GroupUpdateCommandHandler
from backend.common.command.group_update_command \
    import GroupUpdateCommand

class GroupUpdateCommandHandlerTestCase(TestCase):

    def test_when_invalid(self):

        group_update_command_handler = \
            GroupUpdateCommandHandler(group_application_service=None)

        with self.assertRaises(ValueError):
            group_update_command_handler.handle(
                GroupUpdateCommandHandler(driver_id=None))

    def test_when_group_updated(self):

        class MockGroupApplicationService:

            def __init__(self, assert_func):
                self.assert_func = assert_func

            def create(self,driver_id):
                self.assert_func(driver_id)

        DRIVER_ID = '1'

        def assert_func(driver_id):
            self.assertEqual(driver_id, DRIVER_ID)

        mock_group_application_service = \
            MockGroupApplicationService(assert_func=assert_func)
        group_create_command_handler = GroupCreateCommandHandler(
            group_application_service = mock_group_application_service)

        group_create_command_handler.handle(GroupCreateCommandHandler(driver_id=DRIVER_ID))  