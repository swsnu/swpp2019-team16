import grpc
import json

import shortuuid
from interface import implements

from backend.common.messaging.message_handler import MessageHandler

import backend.proto.message_pb2 as pb
import backend.proto.message_pb2_grpc as pb_grpc


class GroupCreatedEventHandler(implements(MessageHandler)):

    def __init__(self):
        channel = grpc.insecure_channel('localhost' + ':' + str(9090))
        self.conn = pb_grpc.StreamServiceStub(channel)

    def handle(self, message):
        print('group', message)
        self.conn.SendMessage(pb.Message(
            id=shortuuid.uuid(),
            type=message.type_name,
            data=json.dumps(vars(message)),
        ))
