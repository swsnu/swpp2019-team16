from django.test import TestCase

from backend.common.event.group_driver_updated_event import GroupDriverUpdatedEvent


class GroupDriverUpdatedEventTestCase(TestCase):
    def test_event_properties(self):
        event = GroupDriverUpdatedEvent(
            group_id=1,
            driver_id=2,
            rider_id_list=[3, 4, 5, 6],
            from_location='A',
            to_location='B'
        )
        self.assertEqual(event.group_id, 1)
        self.assertEqual(event.driver_id, 2)
        self.assertEqual(event.rider_id_list, [3, 4, 5, 6])
        self.assertEqual(event.from_location, 'A')
        self.assertEqual(event.to_location, 'B')

    def test_str(self):
        event = GroupDriverUpdatedEvent(
            group_id=1,
            driver_id=2,
            rider_id_list=[3, 4, 5, 6],
            from_location='A',
            to_location='B'
        )
        self.assertEqual(
            str(event),
            'group_id=1,driver_id=2,rider_id_list=[3, 4, 5, 6],from_location=A,to_location=B'
        )
