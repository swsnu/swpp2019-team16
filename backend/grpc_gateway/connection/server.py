import json
import pickle
import time
from concurrent import futures

import grpc

import backend.proto.message_pb2 as pb
import backend.proto.message_pb2_grpc as pb_grpc


class MessageStreamServer(pb_grpc.StreamServiceServicer):

    def __init__(self):
        self.__msg_id = 0
        self.__stop = False

    def StreamMessage(self, request, context):
        i = 0
        while True:
            time.sleep(2)
            print('sleep 2 sec before stream message...')
            yield pb.Message(id=i, type='hello', data=json.dumps({
                'message': 'hello world {}'.format(i)
            }))
            i += 1

    def HealthCheck(self, request, context):
        print('ping received: {}'.format(request.id))
        return pb.Pong(id=request.id)


    @property
    def stop(self):
        return self.__stop

    def close(self):
        self.__stop = True
