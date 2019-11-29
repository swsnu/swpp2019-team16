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
        user_type = 'rider'
        vehicle = Vehicle.objects.create(car_type='benz', plate_no='1234')

        user = get_user_model().objects.create_user(
            email=email, password=password,
            user_type=user_type, vehicle=vehicle)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.vehicle, vehicle)
        self.assertEqual(user.user_type, user_type)

    def test_create_user_with_no_vehicle_then_successful(self):
        email = 'test@gmail.com'
        password = 'TestPass123'
        user_type = 'rider'
        vehicle = None

        user = get_user_model().objects.create_user(
            email=email, password=password,
            user_type=user_type, vehicle=vehicle)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.vehicle, vehicle)

    def test_create_user_email_normalized(self):
        email = 'test@GMAIL.COM'

        user = get_user_model().objects.create_user(
            email=email,
            user_type='rider',
            password='TestPass123',
            vehicle=Vehicle.objects.create(car_type='benz', plate_no='1234')
        )

        self.assertEqual(user.email, email.lower())

    def test_create_user_when_email_is_none_then_raise_value_error(self):
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(
                email=None,
                user_type='rider',
                password='TestPass123',
                vehicle=Vehicle.objects.create(car_type='benz', plate_no='1234')
            )

    def test_create_user_when_user_type_is_invalid_raise_error(self):
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(
                email='test@gmail.com',
                user_type='user',
                password='TestPass123',
                vehicle=Vehicle.objects.create(car_type='benz', plate_no='1234')
            )
