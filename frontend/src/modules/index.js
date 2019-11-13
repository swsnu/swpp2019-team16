import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth from './auth';
import carpoolRequest, { carpoolRequestSaga } from './carpoolRequest';
import group from './group';
import loading from './loading';
import user from './user';
import { carpoolRequestSaga } from './carpoolRequest/index';

const rootReducer = combineReducers({
  auth,
  carpoolRequest,
  group,
  loading,
  user,
});

export function* rootSaga() {
  yield all([carpoolRequestSaga()]);
}

export default rootReducer;
