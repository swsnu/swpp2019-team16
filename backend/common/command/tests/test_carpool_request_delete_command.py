from django.test import TestCase

from backend.common.command.carpool_request_delete_command import CarpoolRequestDeleteCommand


class CarpoolRequestDeleteCommandTestCase(TestCase):

    def test_properties(self):
        command = CarpoolRequestDeleteCommand(request_id=1)
        self.assertEqual(command.request_id, 1)

    def test_str(self):
        command = CarpoolRequestDeleteCommand(request_id=1)
        self.assertEqual(
            str(command),
            'request_id=1'
        )
