const { StreamServiceClient } = require('../../proto/message_grpc_web_pb');
const { Syn } = require('../../proto/message_pb');

export function createGrpcStream({ id }) {
  // TODO: extract endpoint to config
  const streamService = new StreamServiceClient(
    'http://localhost:8080',
    null,
    null,
  );
  return streamService.streamMessage(new Syn([id]), {});
}
