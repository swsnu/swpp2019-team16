from concurrent import futures

import grpc

import backend.proto.message_pb2_grpc as pb_grpc

from django.core.management import BaseCommand

from backend.grpc_gateway.connection.server import MessageStreamServer


class Command(BaseCommand):

    def handle(self, *args, **options):
        PORT = 9090
        grpc_server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
        pb_grpc.add_StreamServiceServicer_to_server(MessageStreamServer(), grpc_server)

        grpc_server.add_insecure_port('[::]:' + str(PORT))
        print('MessageStreamServer listen on {}'.format('[::]:' + str(PORT)))
        grpc_server.start()
        grpc_server.wait_for_termination()
