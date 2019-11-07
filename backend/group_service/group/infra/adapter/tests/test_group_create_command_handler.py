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
                GroupCreateCommandHandler(rider_id_list=None))

    def test_when_group_created(self):

        class MockGroupApplicationService:

            def __init__(self, assert_func):
                self.assert_func = assert_func

            def create(self, rider_id_list, from_location, to_location):
                self.assert_func(rider_id_list, from_location, to_location)

        RIDER_ID_LIST = [1, 2, 3, 4]
        FROM_LOCATION ='SNU Station'
        TO_LOCATION = '301 Building'

        def assert_func(rider_id_list, from_location, to_location, cost, departure):
            self.assertEqual(rider_id_list, RIDER_ID_LIST)
            self.assertEqual(from_location, FROM_LOCATION)
            self.assertEqual(to_location, TO_LOCATION)

        mock_group_application_service = \
            MockGroupApplicationService(assert_func=assert_func)
        group_create_command_handler = GroupCreateCommandHandler(
            group_application_service = mock_group_application_service)

        group_create_command_handler.handle(GroupCreateCommandHandler(
            rider_id_list=RIDER_ID_LIST, from_location=FROM_LOCATION, to_location=TO_LOCATION))  