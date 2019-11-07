from django.test import TestCase

from backend.common.command.group_update_command import GroupUpdateCommand

class GroupUpdateCommandTestCase(TestCase):

    def test_properties(self):
        command = GroupUpdateCommand(driver_id='1',)

        self.assertEqual(command.driver_id, '1')

    def test_str(self):
        command = GroupUpdateCommand(driver_id='1')
        self.assertEqual(str(command), 'driver_id=1')