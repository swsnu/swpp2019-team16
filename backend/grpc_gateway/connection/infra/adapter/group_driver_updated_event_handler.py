import json

import shortuuid
from interface import implements

import backend.proto.message_pb2 as pb
from backend.common.messaging.message_handler import MessageHandler


# TODO: consider refactor this function
def _extract_user_id_list_from(rider_list):
    result = set()
    for rider in rider_list:
        result.add(rider['user']['id'])
    return result


class GroupDriverUpdatedEventHandler(implements(MessageHandler)):

    def __init__(self, conn):
        self.conn = conn

    def handle(self, message):
        # extract user id set from rider_id_list
        target = set()
        target = target.union(
            _extract_user_id_list_from(message.rider_list)
        )
        target.add(message.driver['user']['id'])
        self.conn.SendMessage(pb.Message(
            id=shortuuid.uuid(),
            target=list(target),
            type=message.type_name,
            data=json.dumps(vars(message))
        ))
