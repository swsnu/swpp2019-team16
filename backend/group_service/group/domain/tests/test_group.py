from django.test import TestCase

from backend.user_service.user.domain.user import User
from backend.user_service.user.domain.driver import Driver
from backend.group_service.group.domain.group import Group


class GroupTestCase(TestCase):

    def test_group(self):
        mockUser = User()
        mockDriver = Driver(user=mockUser)
        mockGroup = Group(
            driver=mockDriver, from_location='SNU Station',
            to_location='301 Building', cost=9, departure=False)
        self.assertEqual(
            str(mockGroup),
            'driver=user_id=None,from_location=SNU Station,\
                to_location=301 Building,cost=9,departure=False')
