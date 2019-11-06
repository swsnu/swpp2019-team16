from django.test import TestCase

from backend.group_service.group.infra.adapter.group_create_command_handler \
    import GroupCreateCommandHandler
from backend.common.command.group_create_command \
    import GroupCreateCommand

class GroupCreateCommandHandlerTestCase(TestCase):

    def test_when_invalid(self):

        group_create_command_handler = \
            GroupCreateCommandHandler(group_application_service=None)

        with self.assertRaises(ValueError):
            group_create_command_handler.handle(
                GroupCreateCommandHandler(riders=None))

    def test_when_group_created(self):

        class MockGroupApplicationService:

            def __init__(self, assert_func):
                self.assert_func = assert_func

            def create(self, riders, from_location, to_location):
                self.assert_func(riders, from_location, to_location)

        RIDERS = ['1', '2', '3', '4']
        DRIVER = None
        FROM_LOCATION ='SNU Station'
        TO_LOCATION = '301 Building'

        def assert_func(riders, driver, from_location, to_location, cost, departure):
            self.assertEqual(riders, RIDERS)
            self.assertEqual(driver, DRIVER)
            self.assertEqual(from_location, FROM_LOCATION)
            self.assertEqual(to_location, TO_LOCATION)

        mock_group_application_service = \
            MockGroupApplicationService(assert_func=assert_func)
        group_create_command_handler = GroupCreateCommandHandler(
            group_application_service = mock_group_application_service)

        group_create_command_handler.handle(GroupCreateCommandHandler(
            riders=RIDERS, driver=DRIVER, from_location=FROM_LOCATION, to_location=TO_LOCATION))  