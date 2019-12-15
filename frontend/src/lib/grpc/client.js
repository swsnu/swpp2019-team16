import axios from 'axios';

const { StreamServiceClient } = require('../../proto/message_grpc_web_pb');
const { Syn } = require('../../proto/message_pb');

function grpcEndpoint(env) {
  switch (env) {
    case 'production':
      console.log(
        'grpcEndpoint in production',
        process.env.REACT_APP_ENVOY_ENDPOINT,
      );
      return process.env.REACT_APP_ENVOY_ENDPOINT;
    default:
      return 'http://localhost:8080';
  }
}

export function createGrpcStream({ id }) {
  const streamService = new StreamServiceClient(
    grpcEndpoint(process.env.REACT_APP_NODE_ENV),
    null,
    null,
  );
  return streamService.streamMessage(new Syn([id]), {});
}
