from django.test import TestCase

from backend.group_service.group.app.group_application_service \
    import GroupApplicationService


class GroupApplicationServiceTestCase(TestCase):

    def setUp(self):
        self.group_application_service = GroupApplicationService()

    def test_create_group(self):
        RIDER_ID_LIST = [1, 2, 3, 4]
        FROM_LOCATION = 'SNU Station'
        TO_LOCATION = '301 Building'

        result = self.group_application_service.createGroup(
            rider_id_list=RIDER_ID_LIST, from_location=from_location, to_location=TO_LOCATION)

        self.assertEqual(result.rider_id_list, RIDER_ID_LIST)
        self.assertEqual(result.from_location, FROM_LOCATION)
        self.assertEqual(result.to_location, TO_LOCATION)

    def test_update_group(self):
        DRIVER_ID = '1'

        result = self.group_application_service.updateGroup(
            driver_id=DRIVER_ID)

        self.assertEqual(result.driver_id, DRIVER_ID)
