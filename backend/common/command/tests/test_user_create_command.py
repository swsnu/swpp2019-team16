from django.test import TestCase

from backend.common.command.user_create_command import UserCreateCommand


class UserCreateCommandTestCase(TestCase):

    def test_properties(self):
        command = UserCreateCommand(
            email='test@gmail.com', password=1234,
            user_type='rider', car_type='benz',
            plate_no='1234가')
        self.assertEqual(command.email, 'test@gmail.com')
        self.assertEqual(command.password, 1234)
        self.assertEqual(command.user_type, 'rider')
        self.assertEqual(command.car_type, 'benz')
        self.assertEqual(command.plate_no, '1234가')
        self.assertEqual(command.user_type, 'rider')

    def test_str(self):
        command = UserCreateCommand(
            email='test@gmail.com', password=1234, user_type='rider')
        self.assertEqual(
            str(command),
            'email=test@gmail.com,'
            + 'password=1234,user_type=rider,car_type=None,plate_no=None'
        )
        self.assertEqual(command.user_type, "rider")
