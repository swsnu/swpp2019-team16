from django.test import TestCase

from backend.common.event.driver_go_taxi_event import DriverGoTaxiEvent


class DriverGoTaxiEventTestCase(TestCase):
    def test_event_properties(self):
        event = DriverGoTaxiEvent(
            group_id=2,
            driver={'id': 1},
        )
        self.assertEqual(event.driver['id'], 1)
        self.assertEqual(event.group_id, 2)

    def test_str(self):
        event = DriverGoTaxiEvent(
            group_id=2,
            driver={'id': 1},
        )
        self.assertEqual(
            str(event),
            "group_id=2,driver={'id': 1}"
        )
