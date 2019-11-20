from django.test import TestCase

from backend.carpool_request_service.carpool_request.infra.adapter \
    .carpool_request_create_command_handler \
    import CarpoolRequestCreateCommandHandler
from backend.common.command.carpool_request_create_command \
    import CarpoolRequestCreateCommand


class CarpoolRequestCreateCommandHandlerTestCase(TestCase):

    def test_when_message_has_no_email_or_password_raise_exception(self):
        carpool_request_create_command_handler = \
            CarpoolRequestCreateCommandHandler(
                carpool_request_application_service=None)

        with self.assertRaises(ValueError):
            carpool_request_create_command_handler.handle(
                CarpoolRequestCreateCommand(
                    from_location=None,
                    to_location=None,
                    minimum_passenger=None,
                    rider_id=None
                ))

    def test_when_message_valid_field_then_call_register(self):
        class MockCarpoolRequestApplicationService:

            def __init__(self, assert_func):
                self.assert_func = assert_func

            def create(self, from_location, to_location,
                       minimum_passenger, rider_id):
                self.assert_func(from_location, to_location,
                                 minimum_passenger, rider_id)

        FROM_LOC = 'TEST_FROM'
        TO_LOC = "TEST_TO"
        MIN = '2'
        RIDER_ID = 1

        def assert_func(from_location, to_location, minimum_passenger,
                        rider_id):
            self.assertEqual(from_location, FROM_LOC)
            self.assertEqual(to_location, TO_LOC)
            self.assertEqual(minimum_passenger, MIN)
            self.assertEqual(rider_id, RIDER_ID)

        carpool_request_app = \
            MockCarpoolRequestApplicationService(assert_func=assert_func)
        carpool_request_create_command_handler =\
            CarpoolRequestCreateCommandHandler(
                carpool_request_application_service=carpool_request_app)

        carpool_request_create_command_handler.handle(
            CarpoolRequestCreateCommand(
                from_location=FROM_LOC, to_location=TO_LOC,
                minimum_passenger=MIN, rider_id=RIDER_ID))
