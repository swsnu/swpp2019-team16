from django.contrib.auth import get_user_model
from django.test import TestCase

from backend.user_service.user.app.user_application_service \
    import UserApplicationService
from backend.user_service.user.domain.rider import Rider


class UserApplicationServiceTestCase(TestCase):

    def setUp(self):
        self.user_application_service = UserApplicationService()

    def test_register_when_no_vehicle_then_create_user_without_vehicle(self):
        EMAIL = 'test@gmail.com'
        PASSWORD = 1234
        USER_TYPE = "rider"
        CAR_TYPE = 'benz'
        PLATE_NO = None

        result = self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type=CAR_TYPE, plate_no=PLATE_NO)

        self.assertEqual(result['email'], EMAIL)
        self.assertEqual(result['vehicle'], None)

    def test_register_when_vehicle_provided_then_create_with_vehicle(self):
        EMAIL = 'test@gmail.com'
        PASSWORD = 1234
        CAR_TYPE = 'benz'
        USER_TYPE = "driver"
        PLATE_NO = '1234가'

        result = self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type=CAR_TYPE, plate_no=PLATE_NO)

        self.assertEqual(result['email'], EMAIL)
        self.assertEqual(result['vehicle']['car_type'], CAR_TYPE)
        self.assertEqual(result['vehicle']['plate_no'], PLATE_NO)

    def test_login(self):

        EMAIL = 'test@gmail.com'
        PASSWORD = 1234
        CAR_TYPE = 'benz'
        USER_TYPE = "driver"
        PLATE_NO = '1234가'

        user1 = self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type=CAR_TYPE, plate_no=PLATE_NO)

        self.user_application_service.login(
            user_id=user1['id']
        )

        EMAIL = 'test2@gmail.com'
        PASSWORD = 12345
        USER_TYPE = "rider"

        user2 = self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type=None, plate_no=None)
        self.user_application_service.login(user_id=user2['id'])

        with self.assertRaises(ValueError):
            EMAIL = 'test3@gmail.com'
            PASSWORD = 12345
            USER_TYPE = "wrong type"

            self.user_application_service.register(
                email=EMAIL, password=PASSWORD,
                user_type=USER_TYPE, car_type=None, plate_no=None)

    def test_login_correct(self):

        EMAIL = "rider1@gmail.com"
        PASSWORD = 1234
        USER_TYPE = "rider"

        user1 = self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type='', plate_no='')
        result = self.user_application_service.login(user_id=user1['id'])
        self.assertEqual(result.status, 'IDLE')
        self.assertEqual(result.group, None)
        self.assertEqual(result.user.id, user1['id'])
        self.assertEqual(result.user.email, EMAIL)
        self.assertEqual(result.user.user_type, USER_TYPE)

        EMAIL = "driver1@gmail.com"
        PASSWORD = 1234
        USER_TYPE = "driver"
        CAR_TYPE = "BMW"
        PLATE_NO = "02로 7608"

        user2 = self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type=CAR_TYPE, plate_no=PLATE_NO)
        result = self.user_application_service.login(user_id=user2['id'])
        self.assertEqual(result.status, 'IDLE')
        self.assertEqual(result.group, None)
        self.assertEqual(result.user.id, user2['id'])
        self.assertEqual(result.user.email, EMAIL)
        self.assertEqual(result.user.user_type, USER_TYPE)
        self.assertEqual(result.user.vehicle.car_type, CAR_TYPE)
        self.assertEqual(result.user.vehicle.plate_no, PLATE_NO)

    def test_logout(self):
        EMAIL = 'test@gmail.com'
        PASSWORD = 1234
        CAR_TYPE = 'benz'
        USER_TYPE = "driver"
        PLATE_NO = '1234가'

        user = self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type=CAR_TYPE, plate_no=PLATE_NO)

        self.user_application_service.login(user_id=user['id'])
        self.user_application_service.logout(user_id=user['id'])

    def test_create_rider_if_not_exist_when_rider_exist(self):
        user = get_user_model().objects.create_user(
            id=123,
            email='zeroFruit@gmail.com',
            password='password',
            user_type='rider'
        )
        rider = Rider.objects.create(user_id=user.id, status="IDLE")

        result = self.user_application_service._create_rider_if_not_exist(user.id)
        self.assertEqual(result.user.id, user.id)
        self.assertEqual(result.id, rider.id)

    def test_create_rider_or_driver_if_not_exist_when_user_type_is_rider(self):
        user = get_user_model().objects.create_user(
            id=123,
            email='zeroFruit@gmail.com',
            password='password',
            user_type='rider'
        )
        result = self.user_application_service._create_rider_or_driver_if_not_exist(
            user_type='rider', user_id=user.id
        )

        self.assertEqual(result.user.id, user.id)

    def test_create_rider_or_driver_if_not_exist_when_user_type_is_driver(self):
        user = get_user_model().objects.create_user(
            id=123,
            email='zeroFruit@gmail.com',
            password='password',
            user_type='driver'
        )
        result = self.user_application_service._create_rider_or_driver_if_not_exist(
            user_type='driver', user_id=user.id
        )

        self.assertEqual(result.user.id, user.id)

    def test_create_rider_or_driver_if_not_exist_return_value_error(self):
        result = self.user_application_service._create_rider_or_driver_if_not_exist(
            user_type='something_wrong', user_id=1
        )
        self.assertTrue(type(result) is ValueError)
