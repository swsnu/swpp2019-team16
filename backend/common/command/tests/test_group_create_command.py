from django.test import TestCase

from backend.common.command.group_create_command import GroupCreateCommand


class GroupCreateCommandTestCase(TestCase):

    def test_properties(self):
        command = GroupCreateCommand(
            rider_id_list=[1, 2, 3, 4],
            from_location='SNU Station', to_location='301 Building')

        self.assertEqual(command.rider_id_list, [1, 2, 3, 4])
        self.assertEqual(command.from_location, 'SNU Station')
        self.assertEqual(command.to_location, '301 Building')

    def test_str(self):
        command = GroupCreateCommand(
            rider_id_list=[1, 2, 3, 4],
            from_location='SNU Station', to_location='301 Building')
        self.assertEqual(
            str(command),
            'rider_id_list=[1, 2, 3, 4],from_location=SNU Station,to_location=301 Building')