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
        rider_id = 1
        result = self.carpool_request_application_service.create(
            from_location, to_location, minimum_passenger, rider_id
        )
        self.assertEqual(result.from_location, from_location)
        self.assertEqual(result.to_location, to_location)
        self.assertEqual(result.minimum_passenger, minimum_passenger)
        self.assertEqual(result.rider_id, rider_id)

    # TODO: assert after delete
    def test_del(self):
        from_location = "TEST_FROM"
        to_location = "TEST_TO"
        minimum_passenger = "TEST_PASSENGER"
        rider_id = 1
        self.carpool_request_application_service.create(
            from_location, to_location, minimum_passenger, rider_id
        )
        request_id = 1
        result = self.carpool_request_application_service.delete(
            request_id
        )
        self.assertEqual(result[0], 1)

    # TODO: assert after get
    def test_get(self):
        from_location = "TEST_FROM"
        to_location = "TEST_TO"
        minimum_passenger = "TEST_PASSENGER"
        rider_id = 1
        self.carpool_request_application_service.create(
            from_location, to_location, minimum_passenger, rider_id
        )
        request_id = 1
        result = self.carpool_request_application_service.get(
            request_id=request_id
        )

        self.assertEqual(result.from_location, from_location)
        self.assertEqual(result.to_location, to_location)
        self.assertEqual(result.minimum_passenger, minimum_passenger)
        self.assertEqual(result.rider_id, rider_id)
