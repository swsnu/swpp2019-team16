import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as carpoolAPI from '../../lib/api/carpool';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';

const [
  REQUEST_CARPOOL,
  REQUEST_CARPOOL_SUCCESS,
  REQUEST_CARPOOL_FAILURE,
] = createRequestActionTypes('carpoolRequest/REQUEST_CARPOOL');

const [
  CANCEL_CARPOOL,
  CANCEL_CARPOOL_SUCCESS,
  CANCEL_CARPOOL_FAILURE,
] = createRequestActionTypes('carpoolRequest/CANCEL_CARPOOL');

const [
  MY_CARPOOL,
  MY_CARPOOL_SUCCESS,
  MY_CARPOOL_FAILURE,
] = createRequestActionTypes('carpoolRequest/MY_CARPOOL');

export const requestCarpool = createAction(
  REQUEST_CARPOOL,
  ({ userId, from, to, minimumPassenger }) => ({
    userId,
    from,
    to,
    minimumPassenger,
  }),
);
export const cancelCarpool = createAction(
  CANCEL_CARPOOL,
  carpoolId => carpoolId,
);
export const myCarpool = createAction(MY_CARPOOL, carpoolId => carpoolId);

const requestCarpoolSaga = createRequestSaga(
  REQUEST_CARPOOL,
  carpoolAPI.create,
);
const cancelCarpoolSaga = createRequestSaga(CANCEL_CARPOOL, carpoolAPI.del);
const myCarpoolSaga = createRequestSaga(MY_CARPOOL, carpoolAPI.get);

export function* carpoolRequestSaga() {
  yield takeLatest(REQUEST_CARPOOL, requestCarpoolSaga);
  yield takeLatest(CANCEL_CARPOOL, cancelCarpoolSaga);
  yield takeLatest(MY_CARPOOL, myCarpoolSaga);
}

const initialState = {
  carpoolRequest: null,
  requestCarpoolError: null,
  cancelCarpoolError: null,
  myCarpoolError: null,
};

const carpoolRequest = handleActions(
  {
    [REQUEST_CARPOOL_SUCCESS]: (state, { payload: carpoolRequest }) => ({
      ...state,
      carpoolRequest: carpoolRequest,
      requestCarpoolError: null,
    }),

    [REQUEST_CARPOOL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      requestCarpoolError: error,
    }),

    [CANCEL_CARPOOL_SUCCESS]: state => ({
      ...state,
      carpoolRequest: null,
      cancelCarpoolError: null,
    }),

    [CANCEL_CARPOOL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      cancelCarpoolError: error,
    }),

    [MY_CARPOOL_SUCCESS]: (state, { payload: carpoolRequest }) => ({
      ...state,
      carpoolRequest: carpoolRequest,
      myCarpoolError: null,
    }),

    [MY_CARPOOL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myCarpoolError: error,
    }),
  },
  initialState,
);

export default carpoolRequest;
