import {takeEvery, eventChannel} from 'redux-saga';

const { StreamServicePromiseClient } = require('../proto/message_grpc_web_pb');
const { Empty, Message } = require('../proto/message_pb');

function deserialize(binArray) {
  let str = "";
  for (let i = 0; i < binArray.length; i++) {
    str += String.fromCharCode(parseInt(binArray[i]));
  }
  return JSON.parse(str)
}

// const { StreamServicePromiseClient } = require('./proto/message_grpc_web_pb');
// const { Empty, Message } = require('./proto/message_pb');
//
// const streamService = new StreamServicePromiseClient('http://localhost:8080', null, null);
//
// const stream = streamService.streamMessage(new Empty(), {});
// stream.on('data', response => {
//   console.log('response.id', response.getId());
//   console.log('response.data',  deserialize(response.getData()) );
// });
//
// stream.on('status', status => {
//   console.log('status', status);
// });

function* createGrpcChannel() {

}

function* initGrpcChannel() {
  // TODO: extract endpoint
  const streamService = new StreamServicePromiseClient('http://localhost:8080', null, null);
  return eventChannel(emit => {

  })
}

/*

// mySaga.js
import {takeEvery, eventChannel} from 'redux-saga';
import {put, call, take} from 'redux-saga/effects';
import {INITIALIZE_WEB_SOCKETS_CHANNEL, WEBSOCKET_MESSAGE_RECEIVED} from '../actions';
function* createEventChannel(mySocket) {
  return eventChannel(emit => {
    mySocket.onmessage((message) => emit(message.data));
    return () => {
      mySocket.close();
    };
  });
}
function* initializeWebSocketsChannel() {
  const mySocket = new WebSocket("ws://www.xyz.com/socketServer", "protocol");
  const channel = yield call(createEventChannel, mySocket);
  while (true) {
    const {message} = yield take(channel);
    yield put({type: WEBSOCKET_MESSAGE_RECEIVED, message});
  }
}
export function* mySaga() {
  yield [
    takeEvery('INITIALIZE_WEB_SOCKETS_CHANNEL', initializeWebSocketsChannel)
  ];
}

 */
