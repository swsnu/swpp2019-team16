import { createAction, handleActions } from 'redux-actions';
import { takeLatest, put } from 'redux-saga/effects';
import * as userAPI from '../../lib/api/user';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const SOMEONE_ON_TAXI = 'user/SOMEONE_ON_TAXI';
const GO_TAXI = 'user/GO_TAXI';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes(
  'user/LOGOUT',
);
const [
  UPDATE_POINT,
  UPDATE_POINT_SUCCESS,
  UPDATE_POINT_FAILURE,
] = createRequestActionTypes('user/UPDATE_POINT');
const [RIDER_ON_TAXI, RIDER_ON_TAXI_SUCCESS, RIDER_ON_TAXI_FAILURE] = createRequestActionTypes(
  'user/RIDER_ON_TAXI',
);
const [DRIVER_GO_TAXI, DRIVER_GO_TAXI_SUCCESS, DRIVER_GO_TAXI_FAILURE] = createRequestActionTypes(
  'user/DRIVER_GO_TAXI',
);

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK, ({ id }) => ({ id }));
export const logout = createAction(LOGOUT);
export const updatePoint = createAction(UPDATE_POINT, ({ userId, point }) => ({
  userId,
  point,
}));

export const checkSaga = createRequestSaga(CHECK, userAPI.get);
export const riderOnTaxi = createAction(RIDER_ON_TAXI, ({ riderId }) => ({ riderId }));
export const goTaxi = createAction(DRIVER_GO_TAXI, ({ driverId }) => ({ driverId }));
export const someoneOnTaxi = createAction(SOMEONE_ON_TAXI, ({ riderId }) => ({ riderId }));
export const taxiGone = createAction(GO_TAXI);

const riderOnTaxiSaga = createRequestSaga(RIDER_ON_TAXI, userAPI.riderOnTaxi);
const driverGoTaxiSaga = createRequestSaga(DRIVER_GO_TAXI, userAPI.driverGoTaxi);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.error('localStorage is not working');
  }
}

export function* logoutSaga() {
  try {
    localStorage.removeItem('user');
    yield put({ type: LOGOUT_SUCCESS });
  } catch (e) {
    console.error(e);
    yield put({ type: LOGOUT_FAILURE });
  }
}

export const updatePointSaga = createRequestSaga(
  UPDATE_POINT,
  userAPI.updatePoint,
);
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(UPDATE_POINT, updatePointSaga);
  yield takeLatest(RIDER_ON_TAXI, riderOnTaxiSaga);
  yield takeLatest(DRIVER_GO_TAXI, driverGoTaxiSaga);
}

const initialState = {
  user: null,
  checkError: null,
  logoutError: null,
  updatePointError: null,
  onTaxiRidersList: [],
  driverGoTaxi: false,
  onTaxiError: null,
  goTaxiError: null,
};

const user = handleActions(
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
    [UPDATE_POINT_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      updatePointError: null,
    }),
    [UPDATE_POINT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      updatePointError: error,
    }),
    [RIDER_ON_TAXI_FAILURE]: (state, { payload: error }) => ({
      ...state,
      onTaxiError: error,
    }),
    [DRIVER_GO_TAXI_FAILURE]: (state, { payload: error }) => ({
      ...state,
      goTaxiError: error,
    }),
    [SOMEONE_ON_TAXI]: (state, { payload: riderId }) => ({
      ...state,
      onTaxiRidersList: [...state.onTaxiRidersList, riderId],
    }),
    [GO_TAXI]: state => ({
      ...state,
      driverGoTaxi: true,
    }),
  },
  initialState,
);

export default user;
