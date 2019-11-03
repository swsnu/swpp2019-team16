from django.test import TestCase

from backend.common.command.user_create_command import UserCreateCommand


class UserCreateCommandTestCase(TestCase):

    def test_properties(self):
        command = UserCreateCommand(email='test@gmail.com', password=1234,
                                    car_type='benz', plate='1234가')
        self.assertEqual(command.email, 'test@gmail.com')
        self.assertEqual(command.password, 1234)
        self.assertEqual(command.car_type, 'benz')
        self.assertEqual(command.plate, '1234가')

    def test_str(self):
        command = UserCreateCommand(email='test@gmail.com', password=1234)
        self.assertEqual(
            str(command),
            'email=test@gmail.com,password=1234,car_type=None,plate=None'
        )
