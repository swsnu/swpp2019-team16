from django.test import TestCase

from ..vehicle import Vehicle
from ..user import User


class UserTestCase(TestCase):

    def test_user_string_when_vehicle_is_none(self):
        user = User(email='test@gmail.com', password='1234', user_type="RIDER", point=123)
        self.assertEqual(str(user),
                         'email=test@gmail.com,user_type=RIDER,point=123')

    def test_user_string_when_vehicle_exist(self):
        vehicle = Vehicle(car_type='benz', plate=1234)
        user = User(email='test@gmail.com', password='1234', user_type="DRIVER",
                    point=123, vehicle=vehicle)
        self.assertEqual(
            str(user),
            'email=test@gmail.com,user_type=DRIVER,point=123,vehicle=car_type=benz,plate=1234')
