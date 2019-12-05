from unittest.mock import patch

from django.test import TestCase

from backend.group_service.group.app.group_application_service \
    import GroupApplicationService

from backend.group_service.group.domain.group import Group
from backend.user_service.user.domain.rider import Rider
from backend.user_service.user.domain.driver import Driver
from backend.user_service.user.domain.user import User
from backend.common.messaging.infra.redis.redis_message_publisher import RedisMessagePublisher


class GroupApplicationServiceTestCase(TestCase):

    # TODO: set different user!
    def setUp(self):
        self.FROM_LOCATION = 'SNU Station'
        self.TO_LOCATION = '301 Building'

        self.group_application_service = GroupApplicationService()
        self.group = Group(
            from_location=self.FROM_LOCATION,
            to_location=self.TO_LOCATION
        )
        self.group.save()
        EMAIL = 'test@gmail.com'
        PASSWORD = 1234

        user = User(email=EMAIL, password=PASSWORD)
        user.save()

        self.rider1 = Rider(user=user, group=self.group)
        self.rider2 = Rider(user=user, group=self.group)
        self.rider3 = Rider(user=user, group=self.group)
        self.rider4 = Rider(user=user, group=self.group)

        self.rider1.save()
        self.rider2.save()
        self.rider3.save()
        self.rider4.save()

    def test_create_group(self):
        RIDER_ID_LIST = [1, 2, 3, 4]
        FROM_LOCATION = 'SNU Station'
        TO_LOCATION = '301 Building'

        result = self.group_application_service.create_group(
            rider_id_list=RIDER_ID_LIST,
            from_location=FROM_LOCATION,
            to_location=TO_LOCATION)

        self.assertEqual(result['from_location'], FROM_LOCATION)
        self.assertEqual(result['to_location'], TO_LOCATION)

    @patch.object(RedisMessagePublisher, 'publish_message')
    def test_update_group(self, publish_message_fn):
        EMAIL = 'driver@gmail.com'
        PASSWORD = 1234

        user = User(email=EMAIL, password=PASSWORD)
        user.save()
        driver = Driver(user=user)
        driver.save()

        result = self.group_application_service.update_group(
            group_id=self.group.id,
            driver_id=driver.id
        )

        self.assertEqual(result['id'], self.group.id)
        self.assertEqual(result['driver']['id'], driver.id)

        args, kwargs = publish_message_fn.call_args
        self.assertEqual(args[0].group_id, self.group.id)
        self.assertEqual(args[0].driver_id, driver.id)
        self.assertEqual(
            args[0].rider_id_list,
            [self.rider1.id, self.rider2.id, self.rider3.id, self.rider4.id]
        )
        self.assertEqual(args[0].from_location, self.FROM_LOCATION)
        self.assertEqual(args[0].to_location, self.TO_LOCATION)
