from django.test import TestCase

from backend.carpool_request_service.carpool_request.app.\
    carpool_request_application_service \
    import CarpoolRequestApplicationService

from backend.user_service.user.domain.user import User
from backend.user_service.user.domain.rider import Rider


class CarpoolRequestApplicationServiceTestCase(TestCase):

    def setUp(self):
        self.carpool_request_application_service = \
            CarpoolRequestApplicationService()
        self.user = User(email="TEST", password="password")
        self.user.save()
        self.rider = Rider(user=self.user)
        self.rider.save()

    def test_create(self):
        from_location = "TEST_FROM"
        to_location = "TEST_TO"
        minimum_passenger = "TEST_PASSENGER"

        result = self.carpool_request_application_service.create(
            from_location, to_location, minimum_passenger, self.rider.id
        )
        self.assertEqual(result.from_location, from_location)
        self.assertEqual(result.to_location, to_location)
        self.assertEqual(result.minimum_passenger, minimum_passenger)
        self.assertEqual(result.rider_id, self.rider.id)

    def test_del(self):
        from_location = "TEST_FROM"
        to_location = "TEST_TO"
        minimum_passenger = "TEST_PASSENGER"

        carpool_request = self.carpool_request_application_service.create(
            from_location, to_location, minimum_passenger, self.rider.id
        )
        result = self.carpool_request_application_service.delete(
            request_id=carpool_request.id
        )
        self.assertEqual(result[0], 1)

    def test_get(self):
        from_location = "TEST_FROM"
        to_location = "TEST_TO"
        minimum_passenger = "TEST_PASSENGER"

        carpool_request = self.carpool_request_application_service.create(
            from_location, to_location, minimum_passenger, self.rider.id
        )
        result = self.carpool_request_application_service.get(
            request_id=carpool_request.id
        )

        self.assertEqual(result.from_location, from_location)
        self.assertEqual(result.to_location, to_location)
        self.assertEqual(result.minimum_passenger, minimum_passenger)
        self.assertEqual(result.rider_id, self.rider.id)
