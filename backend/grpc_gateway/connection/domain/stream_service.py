from threading import Lock
import backend.proto.message_pb2 as pb
import backend.proto.message_pb2_grpc as pb_grpc
from google.protobuf import empty_pb2

from backend.grpc_gateway.connection.domain.peer_set import PeerSet


class StreamService(pb_grpc.StreamServiceServicer):

    def __init__(self):
        self.__stop = False
        self.__peer_set = PeerSet()

        # We can later use file db to keep message much durable
        self.__message_list = []
        self.__mutex = Lock()

    def StreamMessage(self, request, context):
        self.__record_peer(context=context, conn_id=request.id)

        latest_message_index = len(self.__message_list)

        while True:
            while len(self.__message_list) > latest_message_index:
                msg = self.__message_list[latest_message_index]
                latest_message_index += 1

                # if the message is not for this connection, continue
                print('message.target', msg.target)
                if request.id not in msg.target:
                    print('not my message {}'.format(request.id))
                    continue

                yield pb.Message(
                    id=msg.id,
                    type=msg.type,
                    data=msg.data,
                )
                print('After stream message', len(self.__message_list), latest_message_index)

    def SendMessage(self, request, context):
        self.__message_list.append(request)
        return empty_pb2.Empty()

    def __record_peer(self, context, conn_id):
        def _unregister_peer():
            self.__peer_set.disconnect(conn_id=conn_id, peer=context.peer())

        context.add_callback(_unregister_peer)
        self.__peer_set.connect(conn_id=conn_id, peer=context.peer())

    @property
    def stop(self):
        return self.__stop

    def close(self):
        self.__stop = True
