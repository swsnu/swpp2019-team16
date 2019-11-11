import json
import shortuuid

import backend.proto.message_pb2 as pb
import backend.proto.message_pb2_grpc as pb_grpc


class StreamService(pb_grpc.StreamServiceServicer):

    def __init__(self, message_queue):
        self.__msg_id = 0
        self.__stop = False
        self.__message_queue = message_queue

    def StreamMessage(self, request, context):
        while True:
            message = self.__message_queue.get()
            print('message', message)
            yield pb.Message(
                id=shortuuid.uuid(),
                type=message.type_name,
                data=json.dumps(vars(message)),
            )

    def HealthCheck(self, request, context):
        print('ping received: {}'.format(request.id))
        return pb.Pong(id=request.id)

    @property
    def stop(self):
        return self.__stop

    def close(self):
        self.__stop = True
