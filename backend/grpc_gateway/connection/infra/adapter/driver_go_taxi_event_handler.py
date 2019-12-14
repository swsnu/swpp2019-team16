import json

import shortuuid
from interface import implements

from backend.common.messaging.message_handler import MessageHandler
from backend.user_service.user.domain.rider import Rider
from backend.user_service.user.domain.driver import Driver

import backend.proto.message_pb2 as pb


def _extract_user_id_list_from(group_id):
    result = set()

    for rider in Rider.objects.all().filter(group_id=group_id):
        result.add(rider.user.id)

    driver = Driver.objects.get(group_id=group_id)
    result.add(driver.user.id)

    return result


class DriverGoTaxiEventHandler(implements(MessageHandler)):
    def __init__(self, conn):
        self.conn = conn

    def handle(self, message):
        target = _extract_user_id_list_from(message.group_id)

        print('DriverGoTaxiEventHandler.target', target)
        print('DriverGoTaxiEventHandler.message', message)

        self.conn.SendMessage(pb.Message(
            id=shortuuid.uuid(),
            target=list(target),
            type=message.type_name,
            data=json.dumps(vars(message))
        ))
