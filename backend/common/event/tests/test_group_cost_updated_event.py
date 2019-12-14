from django.test import TestCase

from backend.common.event.group_cost_updated_event import GroupCostUpdatedEvent


class GroupCostUpdatedEventTestCase(TestCase):
    def test_event_properties(self):
        event = GroupCostUpdatedEvent(
            group_id=1,
            rider_id_list=[3, 4, 5, 6],
            total_cost=5000,
            rider_cost=1300,
        )
        self.assertEqual(event.group_id, 1)
        self.assertEqual(event.rider_id_list, [3, 4, 5, 6])
        self.assertEqual(event.total_cost, 5000)
        self.assertEqual(event.rider_cost, 1300)
        
    def test_str(self):
        event = GroupCostUpdatedEvent(
            group_id=1,
            rider_id_list=[3, 4, 5, 6],
            total_cost=5000,
            rider_cost=1300,
        )
        self.assertEqual(
            str(event),
            'group_id=1,rider_id_list=[3, 4, 5, 6],total_cost=5000,rider_cost=1300'
        )
