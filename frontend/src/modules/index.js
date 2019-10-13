import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';

const rootReducer = combineReducers({
  loading,
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
