from django.test import TestCase

from backend.group_service.group.app.group_application_service \
    import GroupApplicationService

from backend.group_service.group.domain.group import Group
from backend.user_service.user.domain.rider import Rider
from backend.user_service.user.domain.driver import Driver
from backend.user_service.user.domain.user import User


class GroupApplicationServiceTestCase(TestCase):

    # TODO: set different user!
    def setUp(self):
        self.group_application_service = GroupApplicationService()
        self.group = Group()
        self.group.save()
        EMAIL = 'test@gmail.com'
        PASSWORD = 1234

        user = User(email=EMAIL, password=PASSWORD)
        user.save()
        Rider(user=user).save()
        Rider(user=user).save()
        Rider(user=user).save()
        Rider(user=user).save()

    def test_create_group(self):
        RIDER_ID_LIST = [1, 2, 3, 4]
        FROM_LOCATION = 'SNU Station'
        TO_LOCATION = '301 Building'

        result = self.group_application_service.create_group(
            rider_id_list=RIDER_ID_LIST,
            from_location=FROM_LOCATION,
            to_location=TO_LOCATION)

        self.assertEqual(result.from_location, FROM_LOCATION)
        self.assertEqual(result.to_location, TO_LOCATION)

    def test_update_group(self):
        EMAIL = 'driver@gmail.com'
        PASSWORD = 1234

        user = User(email=EMAIL, password=PASSWORD)
        user.save()
        driver = Driver(user=user)
        driver.save()

        result = self.group_application_service.update_group(
            group_id=self.group.id, driver_id=driver.id)

        self.assertEqual(result.id, self.group.id)
        self.assertEqual(result.driver_id, driver.id)
