from django.test import TestCase

from backend.user_service.user.app.user_application_service \
    import UserApplicationService


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

        self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type=CAR_TYPE, plate_no=PLATE_NO)

        self.user_application_service.login(
            user_id=1
        )

        EMAIL = 'test2@gmail.com'
        PASSWORD = 12345
        USER_TYPE = "rider"

        self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type=None, plate_no=None)
        self.user_application_service.login(user_id=2)

        with self.assertRaises(ValueError):
            EMAIL = 'test3@gmail.com'
            PASSWORD = 12345
            USER_TYPE = "wrong type"

            self.user_application_service.register(
                email=EMAIL, password=PASSWORD,
                user_type=USER_TYPE, car_type=None, plate_no=None)
            self.user_application_service.login(user_id=3)

    def test_login_correct(self):

        EMAIL = "rider1@gmail.com"
        PASSWORD = 1234
        USER_TYPE = "rider"

        self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type='', plate_no='')
        result = self.user_application_service.login(user_id=1)
        self.assertEqual(result['status'], 'IDLE')
        self.assertEqual(result['group'], None)
        self.assertEqual(result['user']['id'], 1)
        self.assertEqual(result['user']['email'], EMAIL)
        self.assertEqual(result['user']['user_type'], USER_TYPE)

        EMAIL = "driver1@gmail.com"
        PASSWORD = 1234
        USER_TYPE = "driver"
        CAR_TYPE = "BMW"
        PLATE_NO = "02로 7608"

        self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type=CAR_TYPE, plate_no=PLATE_NO)
        result = self.user_application_service.login(user_id=2)
        self.assertEqual(result['status'], 'IDLE')
        self.assertEqual(result['group'], None)
        self.assertEqual(result['user']['id'], 2)
        self.assertEqual(result['user']['email'], EMAIL)
        self.assertEqual(result['user']['user_type'], USER_TYPE)
        self.assertEqual(result['user']['vehicle']['car_type'], CAR_TYPE)
        self.assertEqual(result['user']['vehicle']['plate_no'], PLATE_NO)

    def test_logout(self):
        EMAIL = 'test@gmail.com'
        PASSWORD = 1234
        CAR_TYPE = 'benz'
        USER_TYPE = "driver"
        PLATE_NO = '1234가'

        self.user_application_service.register(
            email=EMAIL, password=PASSWORD,
            user_type=USER_TYPE, car_type=CAR_TYPE, plate_no=PLATE_NO)

        self.user_application_service.login(user_id=1)
        self.user_application_service.logout(user_id=1)
