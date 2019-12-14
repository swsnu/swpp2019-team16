from django.contrib.auth import get_user_model
from django.test import TestCase

from backend.grpc_gateway.connection.infra.adapter.group_created_event_handler \
    import GroupCreatedEventHandler,\
    _extract_user_id_list_from, _get_all_driver_user_id_list
from backend.common.event.group_created_event import GroupCreatedEvent
from backend.user_service.user.domain.rider import Rider
from backend.user_service.user.domain.driver import Driver
from backend.group_service.group.domain.group import Group


class MockConnection:

    def __init__(self, assert_func):
        self.assert_func = assert_func

    def SendMessage(self, message):
        self.assert_func(message)


class GroupCreatedEventHandlerTestCase(TestCase):

    def setUp(self):
        self.user1 = get_user_model().objects.create_user(
            email='zeroFruit@gmail.com',
            password='password',
            user_type='rider',
        )
        self.user2 = get_user_model().objects.create_user(
            email='dkim94@gmail.com',
            password='password',
            user_type='rider',
        )
        self.user3 = get_user_model().objects.create_user(
            email='sms@gmail.com',
            password='password',
            user_type='driver',
        )
        self.group = Group()
        self.group.save()

        self.rider1 = Rider.objects.create(user=self.user1, group=self.group)
        self.rider2 = Rider.objects.create(user=self.user2, group=self.group)
        self.driver = Driver.objects.create(user=self.user3, group=self.group)

    def test_extract_user_id_list_from(self):
        result = _extract_user_id_list_from([self.rider1.id, self.rider2.id])
        self.assertEqual(result, {self.user1.id, self.user2.id})

    def test_get_all_driver_user_id_list(self):
        result = _get_all_driver_user_id_list()
        self.assertEqual(result, {self.user3.id})

    def test_handle_when_send_event_then_set_correct_target(self):
        event = GroupCreatedEvent(
            group_id=self.group.id,
            rider_id_list=[self.rider1.id, self.rider2.id],
            from_location='SNU station',
            to_location='301 building',
        )

        def assert_func(message):
            self.assertEqual(len(message.target), 3)
            self.assertEqual(message.type, 'event.group_created')

        conn = MockConnection(assert_func=assert_func)
        grpc_created_event_handler = GroupCreatedEventHandler(
            conn=conn
        )
        grpc_created_event_handler.handle(event)
