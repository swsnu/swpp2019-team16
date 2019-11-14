from django.test import TestCase

from backend.common.command.carpool_request_create_command \
    import CarpoolRequestCreateCommand


class CarpoolRequestCreateCommandTestCase(TestCase):

    def test_properties(self):
        command = CarpoolRequestCreateCommand(
            from_location="A", to_location="B",
            minimum_passenger="2", rider_id=1)
        self.assertEqual(command.from_location, 'A')
        self.assertEqual(command.to_location, 'B')
        self.assertEqual(command.minimum_passenger, '2')
        self.assertEqual(command.rider_id, 1)

    def test_str(self):
        command = CarpoolRequestCreateCommand(
                from_location='A', to_location="B",
                rider_id=1, minimum_passenger="2")
        self.assertEqual(
            str(command),
            'rider_id=1,from=A,to=B,minimum_passenger=2'
        )
