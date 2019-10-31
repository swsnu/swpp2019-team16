from django.test import TestCase

from backend.common.utils.time import monotonic_utc_now


class TimeTestCase(TestCase):

    def test_monotonic_utc_now(self):
        time1 = monotonic_utc_now()
        time2 = monotonic_utc_now()
        self.assertTrue(time1 < time2)
