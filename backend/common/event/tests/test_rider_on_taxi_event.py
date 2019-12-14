from django.test import TestCase

from backend.common.event.rider_on_taxi_event import RiderOnTaxiEvent


class RiderOnTaxiEventTestCase(TestCase):
    def test_event_properties(self):
        event = RiderOnTaxiEvent(
            group_id=2,
            rider={'id': 1},
        )
        self.assertEqual(event.group_id, 2)
        self.assertEqual(event.rider['id'], 1)

    def test_str(self):
        event = RiderOnTaxiEvent(
            group_id=2,
            rider={'id': 1},
        )
        self.assertEqual(
            str(event),
            "group_id=2,rider={'id': 1}"
        )
