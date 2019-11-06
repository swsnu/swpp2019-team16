import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth from './auth';
import carpoolRequest from './carpoolRequest';
import group from './group';
import loading from './loading';
import user from './user';
import { grpcSaga } from '../lib/createGrpcChannelSaga';

const rootReducer = combineReducers({
  auth,
  carpoolRequest,
  group,
  loading,
  user,
});

export function* rootSaga() {
  yield all([grpcSaga()]);
}

export default rootReducer;
