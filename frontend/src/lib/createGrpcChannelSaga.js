import produce from 'immer';
import { eventChannel } from 'redux-saga';
import { takeLatest, call, take, put } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import createGrpcStream from './grpc/client';

function createGrpcChannel() {
  return eventChannel(emit => {
    const stream = createGrpcStream();

    stream.on('data', message => {
      emit(JSON.parse(message.getData()));
    });
    stream.on('status', status => {
      console.log(status);
    });
    return () => {
      stream.cancel();
    };
  });
}

function* initGrpcChannel() {
  const channel = yield call(createGrpcChannel);

  while (true) {
    const result = yield take(channel);
    yield put({
      type: result._type_name,
      payload: produce(result, draft => {
        delete draft._type_name;
      }),
    });
  }
}

const INITIALIZE_GRPC_CONNECTION = 'grpc/INITIALIZE_GRPC_CONNECTION';

export const initGrpcConnection = createAction(INITIALIZE_GRPC_CONNECTION);

export function* grpcSaga() {
  yield takeLatest(INITIALIZE_GRPC_CONNECTION, initGrpcChannel);
}
