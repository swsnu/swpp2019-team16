from unittest.mock import patch

from django.core.management import call_command
from django.test import TestCase


class CommandTestCases(TestCase):

    @patch('time.sleep', return_value=True)
    def test_wait_for_redis(self, ts):
        """
        Test waiting for redis
        """
        with patch('redis.Redis') as ri:
            # Exception raises for 5 times, then return true
            ri.side_effect = [Exception] * 5 + [True]
            call_command('wait_for_redis')
            self.assertEqual(ri.call_count, 6)
