# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
import grpc

from google.protobuf import empty_pb2 as google_dot_protobuf_dot_empty__pb2
import backend.proto.message_pb2 as message__pb2


class StreamServiceStub(object):
  # missing associated documentation comment in .proto file
  pass

  def __init__(self, channel):
    """Constructor.

    Args:
      channel: A grpc.Channel.
    """
    self.HealthCheck = channel.unary_unary(
        '/StreamService/HealthCheck',
        request_serializer=message__pb2.Ping.SerializeToString,
        response_deserializer=message__pb2.Pong.FromString,
        )
    self.StreamMessage = channel.unary_stream(
        '/StreamService/StreamMessage',
        request_serializer=google_dot_protobuf_dot_empty__pb2.Empty.SerializeToString,
        response_deserializer=message__pb2.Message.FromString,
        )


class StreamServiceServicer(object):
  # missing associated documentation comment in .proto file
  pass

  def HealthCheck(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')

  def StreamMessage(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')


def add_StreamServiceServicer_to_server(servicer, server):
  rpc_method_handlers = {
      'HealthCheck': grpc.unary_unary_rpc_method_handler(
          servicer.HealthCheck,
          request_deserializer=message__pb2.Ping.FromString,
          response_serializer=message__pb2.Pong.SerializeToString,
      ),
      'StreamMessage': grpc.unary_stream_rpc_method_handler(
          servicer.StreamMessage,
          request_deserializer=google_dot_protobuf_dot_empty__pb2.Empty.FromString,
          response_serializer=message__pb2.Message.SerializeToString,
      ),
  }
  generic_handler = grpc.method_handlers_generic_handler(
      'StreamService', rpc_method_handlers)
  server.add_generic_rpc_handlers((generic_handler,))
