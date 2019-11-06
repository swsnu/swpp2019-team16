from django.test import TestCase

from ..group import Group

class GroupTestCase(TestCase):

    def test_group(self):
        group = Group(driver='Driver', from_location='SNU Station', 
            to_location='301 Building', cost=9, departure=False)
        self.assertEqual(str(group), 
                            'driver=Driver,from_location=SNU Station,to_location=301 Building,departure=False')
