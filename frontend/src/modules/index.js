import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import carpoolRequest, { carpoolRequestSaga } from './carpoolRequest';
import group from './group';
import loading from './loading';
import user from './user';

const rootReducer = combineReducers({
  auth,
  carpoolRequest,
  group,
  loading,
  user,
});

export function* rootSaga() {
  yield all([carpoolRequestSaga(), authSaga()]);
}

export default rootReducer;
