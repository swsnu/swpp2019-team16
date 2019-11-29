/**
 * @fileoverview gRPC-Web generated client stub for
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
const grpc = {};
grpc.web = require('grpc-web');

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
const proto = require('./message_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.StreamServiceClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.StreamServicePromiseClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Ping,
 *   !proto.Pong>}
 */
const methodDescriptor_StreamService_HealthCheck = new grpc.web.MethodDescriptor(
  '/StreamService/HealthCheck',
  grpc.web.MethodType.UNARY,
  proto.Ping,
  proto.Pong,
  /** @param {!proto.Ping} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.Pong.deserializeBinary,
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Ping,
 *   !proto.Pong>}
 */
const methodInfo_StreamService_HealthCheck = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Pong,
  /** @param {!proto.Ping} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.Pong.deserializeBinary,
);

/**
 * @param {!proto.Ping} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Pong)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Pong>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StreamServiceClient.prototype.healthCheck = function(
  request,
  metadata,
  callback,
) {
  return this.client_.rpcCall(
    this.hostname_ + '/StreamService/HealthCheck',
    request,
    metadata || {},
    methodDescriptor_StreamService_HealthCheck,
    callback,
  );
};

/**
 * @param {!proto.Ping} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Pong>}
 *     A native promise that resolves to the response
 */
proto.StreamServicePromiseClient.prototype.healthCheck = function(
  request,
  metadata,
) {
  return this.client_.unaryCall(
    this.hostname_ + '/StreamService/HealthCheck',
    request,
    metadata || {},
    methodDescriptor_StreamService_HealthCheck,
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Message,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_StreamService_SendMessage = new grpc.web.MethodDescriptor(
  '/StreamService/SendMessage',
  grpc.web.MethodType.UNARY,
  proto.Message,
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.Message} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary,
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Message,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_StreamService_SendMessage = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.Message} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary,
);

/**
 * @param {!proto.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StreamServiceClient.prototype.sendMessage = function(
  request,
  metadata,
  callback,
) {
  return this.client_.rpcCall(
    this.hostname_ + '/StreamService/SendMessage',
    request,
    metadata || {},
    methodDescriptor_StreamService_SendMessage,
    callback,
  );
};

/**
 * @param {!proto.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.StreamServicePromiseClient.prototype.sendMessage = function(
  request,
  metadata,
) {
  return this.client_.unaryCall(
    this.hostname_ + '/StreamService/SendMessage',
    request,
    metadata || {},
    methodDescriptor_StreamService_SendMessage,
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Syn,
 *   !proto.Message>}
 */
const methodDescriptor_StreamService_StreamMessage = new grpc.web.MethodDescriptor(
  '/StreamService/StreamMessage',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.Syn,
  proto.Message,
  /** @param {!proto.Syn} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.Message.deserializeBinary,
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Syn,
 *   !proto.Message>}
 */
const methodInfo_StreamService_StreamMessage = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Message,
  /** @param {!proto.Syn} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.Message.deserializeBinary,
);

/**
 * @param {!proto.Syn} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.Message>}
 *     The XHR Node Readable Stream
 */
proto.StreamServiceClient.prototype.streamMessage = function(
  request,
  metadata,
) {
  return this.client_.serverStreaming(
    this.hostname_ + '/StreamService/StreamMessage',
    request,
    metadata || {},
    methodDescriptor_StreamService_StreamMessage,
  );
};

/**
 * @param {!proto.Syn} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.Message>}
 *     The XHR Node Readable Stream
 */
proto.StreamServicePromiseClient.prototype.streamMessage = function(
  request,
  metadata,
) {
  return this.client_.serverStreaming(
    this.hostname_ + '/StreamService/StreamMessage',
    request,
    metadata || {},
    methodDescriptor_StreamService_StreamMessage,
  );
};

module.exports = proto;
