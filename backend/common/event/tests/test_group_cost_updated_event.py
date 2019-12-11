from django.test import TestCase

from backend.common.event.group_cost_updated_event import GroupCostUpdatedEvent


class GroupCostUpdatedEventTestCase(TestCase):
    def test_event_properties(self):
        event = GroupCostUpdatedEvent(
            group_id=1,
            rider_id_list=[3, 4, 5, 6],
            cost=5000,
        )
        self.assertEqual(event.group_id, 1)
        self.assertEqual(event.rider_id_list, [3, 4, 5, 6])
        self.assertEqual(event.cost, 5000)
        
    def test_str(self):
        event = GroupCostUpdatedEvent(
            group_id=1,
            rider_id_list=[3, 4, 5, 6],
            cost=5000,
        )
        self.assertEqual(
            str(event),
            'group_id=1,rider_id_list=[3, 4, 5, 6],cost=5000'
        )
