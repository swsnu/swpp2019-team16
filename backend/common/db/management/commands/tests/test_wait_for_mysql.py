from unittest.mock import patch

from django.core.management import call_command
from django.db import OperationalError
from django.test import TestCase


class CommandTestCases(TestCase):

    def test_wait_for_db_ready(self):
        """
        Test waiting for db when db is available
        """
        with patch('django.db.utils.ConnectionHandler.__getitem__') as gi:
            gi.return_value = True
            call_command('wait_for_mysql')
            self.assertEqual(gi.call_count, 1)

    @patch('time.sleep', return_value=True)
    def test_wait_for_db(self, ts):
        """
        Test waiting for db
        """
        with patch('django.db.utils.ConnectionHandler.__getitem__') as gi:
            # OperationError raises for 5 times, then return true
            gi.side_effect = [OperationalError] * 5 + [True]
            call_command('wait_for_mysql')
            self.assertEqual(gi.call_count, 6)
