import json

import grpc
import shortuuid

from interface import implements

import backend.proto.message_pb2 as pb
import backend.proto.message_pb2_grpc as pb_grpc

from backend.common.messaging.message_handler import MessageHandler


class PingCommandHandler(implements(MessageHandler)):

    def __init__(self):
        channel = grpc.insecure_channel('localhost' + ':' + str(9090))
        self.conn = pb_grpc.StreamServiceStub(channel)

    def handle(self, message):
        print('ping', message)
        self.conn.SendMessage(pb.Message(
            id=shortuuid.uuid(),
            type=message.type_name,
            data=json.dumps(vars(message)),
        ))
