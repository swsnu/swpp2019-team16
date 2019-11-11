from django.test import TestCase

from backend.user_service.user.app.user_application_service \
    import UserApplicationService


class UserApplicationServiceTestCase(TestCase):

    def setUp(self):
        self.user_application_service = UserApplicationService()

    def test_register_when_no_vehicle_then_create_user_without_vehicle(self):
        EMAIL = 'test@gmail.com'
        PASSWORD = 1234
        CAR_TYPE = 'benz'
        PLATE = None

        result = self.user_application_service.register(
            email=EMAIL, password=PASSWORD, car_type=CAR_TYPE, plate=PLATE)

        self.assertEqual(result.email, EMAIL)
        self.assertEqual(result.vehicle, None)

    def test_register_when_vehicle_provided_then_create_with_vehicle(self):
        EMAIL = 'test@gmail.com'
        PASSWORD = 1234
        CAR_TYPE = 'benz'
        PLATE = '1234가'

        result = self.user_application_service.register(
            email=EMAIL, password=PASSWORD, car_type=CAR_TYPE, plate=PLATE)

        self.assertEqual(result.email, EMAIL)
        self.assertEqual(result.vehicle.car_type, CAR_TYPE)
        self.assertEqual(result.vehicle.plate, PLATE)

    def test_login(self):
        EMAIL = 'test@gmail.com'
        PASSWORD = 1234
        
        result = self.user_application_service.login(
            email=EMAIL, password=PASSWORD
        )