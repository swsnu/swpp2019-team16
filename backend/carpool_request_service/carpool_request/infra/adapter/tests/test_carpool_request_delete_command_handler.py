from django.test import TestCase

from backend.carpool_request_service.carpool_request.infra.adapter.carpool_request_delete_command_handler \
    import CarpoolRequestDeleteCommandHandler
from backend.common.command.carpool_request_delete_command \
    import CarpoolRequestDeleteCommand


class CarpoolRequestCreateCommandHandlerTestCase(TestCase):

    def test_delete_with_no_request_id(self):
        carpool_request_delete_command_handler = \
            CarpoolRequestDeleteCommandHandler(carpool_request_application_service=None)

        with self.assertRaises(ValueError):
            carpool_request_delete_command_handler.handle(
                CarpoolRequestDeleteCommand(request_id=None))

    def test_delete_with_request_id(self):

        class MockCarpoolRequestApplicationService:

            def __init__(self, assert_func):
                self.assert_func = assert_func

            def delete(self, request_id):
                self.assert_func(request_id)

        REQUEST_ID = 1

        def assert_func(request_id):
            self.assertEqual(request_id, REQUEST_ID)

        mock_carpool_request_application_service = \
            MockCarpoolRequestApplicationService(assert_func=assert_func)
        carpool_request_delete_command_handler = CarpoolRequestDeleteCommandHandler(
            carpool_request_application_service=mock_carpool_request_application_service)

        carpool_request_delete_command_handler.handle(CarpoolRequestDeleteCommand(
            request_id=REQUEST_ID))
