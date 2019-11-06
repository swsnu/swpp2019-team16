from django.test import TestCase

from backend.group_service.group.app.group_application_service \
    import GroupApplicationService


class GroupApplicationServiceTestCase(TestCase):

    def setUp(self):
        self.group_application_service = GroupApplicationService()

    def test_create_group(self):
        RIDERS = ['1', '2', '3', '4']
        FROM_LOCATION = 'SNU Station'
        TO_LOCATION = '301 Building'

        result = self.group_application_service.createGroup(
            riders=RIDERS, from_location=from_location, to_location=TO_LOCATION)

        self.assertEqual(result.riders, RIDERS)
        self.assertEqual(result.from_location, FROM_LOCATION)
        self.assertEqual(result.to_location, TO_LOCATION)

    def test_update_group(self):
        DRIVER = 'driver'

        result = self.group_application_service.updateGroup(
            driver=DRIVER)

        self.assertEqual(result.driver, DRIVER)
