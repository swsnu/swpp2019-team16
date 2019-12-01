import json

import shortuuid
from interface import implements

from backend.common.messaging.message_handler import MessageHandler

import backend.proto.message_pb2 as pb
from backend.user_service.user.domain.rider import Rider
from backend.user_service.user.domain.driver import Driver


def _extract_user_id_list_from(rider_id_list):
    result = set()
    for rider_id in list(set(rider_id_list)):
        rider = Rider.objects.get(pk=rider_id)
        result.add(rider.user.id)
    return result


def _get_all_driver_user_id_list():
    result = set()
    for driver in Driver.objects.all():
        result.add(driver.user.id)
    return result


class GroupCreatedEventHandler(implements(MessageHandler)):

    def __init__(self, conn):
        self.conn = conn

    def handle(self, message):
        # extract user id set from rider_id_list
        # also add target with all driver's user id
        target = set()
        target = target.union(
            _extract_user_id_list_from(message.rider_id_list))
        target = target.union(
            _get_all_driver_user_id_list()
        )
        self.conn.SendMessage(pb.Message(
            id=shortuuid.uuid(),
            target=list(target),
            type=message.type_name,
            data=json.dumps(vars(message)),
        ))
