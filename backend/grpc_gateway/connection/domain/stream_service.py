import json
from threading import Lock

import shortuuid

import backend.proto.message_pb2 as pb
import backend.proto.message_pb2_grpc as pb_grpc
from google.protobuf import empty_pb2

from backend.grpc_gateway.connection.domain.peer_set import PeerSet


class StreamService(pb_grpc.StreamServiceServicer):

    def __init__(self):
        self.__stop = False
        self.__peer_set = PeerSet()
        self.__message_list = []
        self.__mutex = Lock()

    def _record_peer(self, context):
        def _unregister_peer():
            self.__peer_set.disconnect(context.peer())

        context.add_callback(_unregister_peer)
        self.__peer_set.connect(context.peer())

    def StreamMessage(self, request_iterator, context):
        self._record_peer(context=context)

        latest_message_index = len(self.__message_list)

        while True:
            while len(self.__message_list) > latest_message_index:
                msg = self.__message_list[latest_message_index]
                latest_message_index += 1
                yield pb.Message(
                    id=msg.id,
                    type=msg.type,
                    data=msg.data,
                )

    def SendMessage(self, request, context):
        print('SendMessage', request)
        self.__message_list.append(request)
        return empty_pb2.Empty()

    def HealthCheck(self, request, context):
        print('ping received: {}'.format(request.id))
        return pb.Pong(id=request.id)

    @property
    def stop(self):
        return self.__stop

    def close(self):
        self.__stop = True
