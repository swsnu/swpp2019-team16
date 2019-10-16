import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as userAPI from '../../lib/api/user/user';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';


const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes(
  'user/LOGOUT',
);

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, userAPI.get);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.error('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    localStorage.removeItem('user');
    yield put({ type: LOGOUT_SUCCESS });
  } catch (e) {
    console.error(e);
    yield put({ type: LOGOUT_FAILURE });
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null,
  logoutError: null,
};

const user =  handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT_SUCCESS]: state => ({
      ...state,
      user: null,
      logoutError: null,
    }),
    [LOGOUT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      logoutError: error,
    }),
  },
  initialState,
)

export default user;