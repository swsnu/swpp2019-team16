from concurrent import futures

import grpc
from django.conf import settings

import backend.proto.message_pb2_grpc as pb_grpc


class GrpcServer:
    def __init__(self, stream_service):
        self.__stream_service = stream_service

    def listen(self):
        grpc_server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
        pb_grpc.add_StreamServiceServicer_to_server(self.__stream_service, grpc_server)

        grpc_server.add_insecure_port('[::]:' + str(settings.GRPC_SERVER_PORT))
        print('MessageStreamServer listen on {}'.format('[::]:' + str(settings.GRPC_SERVER_PORT)))
        grpc_server.start()
        grpc_server.wait_for_termination()
