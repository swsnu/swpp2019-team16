from django.test import TestCase

from backend.common.command.group_driver_update_command import GroupDriverUpdateCommand


class GroupDriverUpdateCommandTestCase(TestCase):

    def test_properties(self):
        command = GroupDriverUpdateCommand(group_id=1, driver_id=1,)

        self.assertEqual(command.group_id, 1)
        self.assertEqual(command.driver_id, 1)

    def test_str(self):
        command = GroupDriverUpdateCommand(group_id=1, driver_id=1)
        self.assertEqual(str(command), 'group_id=1,driver_id=1')
