import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as groupAPI from '../../lib/api/group/group';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';

const [
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
] = createRequestActionTypes('group/CREATE_GROUP');

const [
  ACCEPT_GROUP,
  ACCEPT_GROUP_SUCCESS,
  ACCEPT_GROUP_FAILURE,
] = createRequestActionTypes('group/ACCEPT_GROUP');

const [ON_TAXI, ON_TAXI_SUCCESS, ON_TAXI_FAILURE] = createRequestActionTypes(
  'group/ON_TAXI',
);

const [
  DEPARTURE,
  DEPARTURE_SUCCESS,
  DEPARTURE_FAILURE,
] = createRequestActionTypes('group/DEPARTURE');

const [
  FETCH_MY_GROUP,
  FETCH_MY_GROUP_SUCCESS,
  FETCH_MY_GROUP_FAILURE,
] = createRequestActionTypes('group/FETCH_MY_GROUP');

const [
  NOTIFY_DRIVER_LOCATION,
  NOTIFY_DRIVER_LOCATION_SUCCESS,
  NOTIFY_DRIVER_LOCATION_FAILURE,
] = createRequestActionTypes('group/NOTIFY_DRIVER_LOCATION');

const [
  CONFIRM_COST,
  CONFIRM_COST_SUCCESS,
  CONFIRM_COST_FAILURE,
] = createRequestActionTypes('group/CONFIRM_COST');

export const createGroup = createAction(
  CREATE_GROUP,
  ({ groupId, riders, driver, from, to }) => ({
    groupId,
    riders,
    driver,
    from,
    to,
  }),
);
export const acceptGroup = createAction(
  ACCEPT_GROUP,
  ({ groupId, driverId }) => ({
    groupId,
    driverId,
  }),
);
export const onTaxi = createAction(ON_TAXI, riderId => riderId);
export const departure = createAction(
  DEPARTURE,
  ({ groupId, departureTime }) => ({
    groupId,
    departureTime,
  }),
);
export const fetchMyGroup = createAction(FETCH_MY_GROUP, groupId => groupId);
export const notifyDriverLocation = createAction(
  NOTIFY_DRIVER_LOCATION,
  ({ driverId, groupId, locationInfo }) => ({
    driverId,
    groupId,
    locationInfo,
  }),
);
export const confirmCost = createAction(
  CONFIRM_COST,
  ({ groupId, totalCost }) => ({
    groupId,
    totalCost,
  }),
);

export const createGroupSaga = createRequestSaga(
  CREATE_GROUP,
  groupAPI.createGroup,
);
export const acceptGroupSaga = createRequestSaga(
  ACCEPT_GROUP,
  groupAPI.acceptGroup,
);
export const onTaxiSaga = createRequestSaga(ON_TAXI, groupAPI.onTaxi);
export const departureSaga = createRequestSaga(DEPARTURE, groupAPI.departure);
export const fetchMyGroupSaga = createRequestSaga(
  FETCH_MY_GROUP,
  groupAPI.fetchMyGroup,
);
export const notifyDriverLocationSaga = createRequestSaga(
  NOTIFY_DRIVER_LOCATION,
  groupAPI.notifyDriverLocation,
);
export const confirmCostSaga = createRequestSaga(
  CONFIRM_COST,
  groupAPI.confirmCost,
);

export function* groupSaga() {
  yield takeLatest(CREATE_GROUP, createGroupSaga);
  yield takeLatest(ACCEPT_GROUP, acceptGroupSaga);
  yield takeLatest(ON_TAXI, onTaxiSaga);
  yield takeLatest(DEPARTURE, departureSaga);
  yield takeLatest(FETCH_MY_GROUP, fetchMyGroupSaga);
  yield takeLatest(NOTIFY_DRIVER_LOCATION, notifyDriverLocationSaga);
  yield takeLatest(CONFIRM_COST, confirmCostSaga);
}

const initialState = {
  group: null,
  error: null,
};

const group = handleActions(
  {
    [CREATE_GROUP_SUCCESS]: (state, { payload: group }) => ({
      ...state,
      group: group,
      error: null,
    }),

    [CREATE_GROUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),

    [ACCEPT_GROUP_SUCCESS]: (state, { payload: group }) => ({
      ...state,
      group: group,
    }),

    [ACCEPT_GROUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),

    [ON_TAXI_SUCCESS]: (state, { payload: group }) => ({
      ...state,
      group: group,
    }),

    [ON_TAXI_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),

    [DEPARTURE_SUCCESS]: (state, { payload: group }) => ({
      ...state,
      group: group,
    }),

    [DEPARTURE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),

    [FETCH_MY_GROUP_SUCCESS]: (state, { payload: group }) => ({
      ...state,
      group: group,
    }),

    [FETCH_MY_GROUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),

    [NOTIFY_DRIVER_LOCATION_SUCCESS]: (state, { payload: group }) => ({
      ...state,
      group: group,
    }),
    [NOTIFY_DRIVER_LOCATION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),

    [CONFIRM_COST_SUCCESS]: (state, { payload: group }) => ({
      ...state,
      group: group,
    }),

    [CONFIRM_COST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
  },
  initialState,
);

export default group;
