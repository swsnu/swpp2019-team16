from django.test import TestCase
from django.contrib.auth import get_user_model

from ..vehicle import Vehicle
from ..user import UserManager


class UserManagerTestCase(TestCase):

    def setUp(self):
        self.user_manager = UserManager()

    def test_create_user_with_email_then_successful(self):
        email = 'test@gmail.com'
        password = 'TestPass123'
        vehicle = Vehicle.objects.create(car_type='benz', plate_no='1234')

        user = get_user_model().objects.create_user(
            email=email, password=password, vehicle=vehicle)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.vehicle, vehicle)

    def test_create_user_with_no_vehicle_then_successful(self):
        email = 'test@gmail.com'
        password = 'TestPass123'
        vehicle = None

        user = get_user_model().objects.create_user(
            email=email, password=password, vehicle=vehicle)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.vehicle, vehicle)

    def test_create_user_email_normalized(self):
        email = 'test@GMAIL.COM'

        user = get_user_model().objects.create_user(
            email=email,
            password='TestPass123',
            vehicle=Vehicle.objects.create(car_type='benz', plate_no='1234')
        )

        self.assertEqual(user.email, email.lower())

    def test_create_user_when_email_is_none_then_raise_value_error(self):
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(
                email=None,
                password='TestPass123',
                vehicle=Vehicle.objects.create(car_type='benz', plate_no='1234')
            )
