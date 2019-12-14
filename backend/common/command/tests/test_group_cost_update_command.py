from django.test import TestCase

from backend.common.command.group_cost_update_command import GroupCostUpdateCommand


class GroupDriverUpdateCommandTestCase(TestCase):

    def test_properties(self):
        command = GroupCostUpdateCommand(group_id=1, cost=1234,)

        self.assertEqual(command.group_id, 1)
        self.assertEqual(command.cost, 1234)

    def test_str(self):
        command = GroupCostUpdateCommand(group_id=1, cost=1234)
        self.assertEqual(str(command), 'group_id=1,cost=1234')
