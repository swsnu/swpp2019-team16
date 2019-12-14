from django.test import TestCase

from backend.common.event.group_driver_updated_event import GroupDriverUpdatedEvent


class GroupDriverUpdatedEventTestCase(TestCase):
    def test_event_properties(self):
        event = GroupDriverUpdatedEvent(
            group_id=1,
            driver={'id': 2},
            rider_list=[
                {'id': 3},
                {'id': 4},
                {'id': 5},
                {'id': 6},
            ],
            from_location='A',
            to_location='B'
        )
        self.assertEqual(event.group_id, 1)
        self.assertEqual(event.driver, {'id': 2})
        self.assertEqual(event.rider_list, [
                {'id': 3},
                {'id': 4},
                {'id': 5},
                {'id': 6},
            ])
        self.assertEqual(event.from_location, 'A')
        self.assertEqual(event.to_location, 'B')

    def test_str(self):
        event = GroupDriverUpdatedEvent(
            group_id=1,
            driver={'id': 2},
            rider_list=[
                {'id': 3},
                {'id': 4},
                {'id': 5},
                {'id': 6},
            ],
            from_location='A',
            to_location='B'
        )
        self.assertEqual(
            str(event),
            "group_id=1,driver={'id': 2},rider_list=[{'id': 3}, {'id': 4}, {'id': 5}, {'id': 6}],from_location=A,to_location=B"
        )
