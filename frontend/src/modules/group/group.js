import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as groupAPI from '../../lib/api/group/group';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';

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

export const GROUP_CREATED = 'group/GROUP_CREATED';
export const GROUP_UPDATED = 'group/GROUP_UPDATED';
export const UNLOAD_GROUP = 'group/UNLOAD_GROUP';
export const GROUP_COST_UPDATED = 'group/GROUP_COST_UPDATED';
export const INIT_COST_CONFIRMED = 'group/INIT_COST_CONFIRMED';

export const groupCreated = createAction(
  GROUP_CREATED,
  ({ groupId, from, to }) => ({
    groupId,
    from,
    to,
  }),
);

export const groupCostUpdated = createAction(
  GROUP_COST_UPDATED,
  ({ groupId, riderCost, cost }) => ({
    groupId,
    riderCost,
    cost,
  }),
);

export const groupUpdated = createAction(
  GROUP_UPDATED,
  ({ groupId, driver, riders, fromLocation, toLocation }) => ({
    groupId,
    driver,
    riders,
    from: fromLocation,
    to: toLocation,
  }),
);

export const unloadGroup = createAction(UNLOAD_GROUP);

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
export const initCostConfirmed = createAction(INIT_COST_CONFIRMED);

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
  costConfirmed: false,
};

const group = handleActions(
  {
    [GROUP_CREATED]: (state, { payload: group }) => ({
      ...state,
      group,
    }),

    [GROUP_UPDATED]: (state, { payload: group }) => ({
      ...state,
      group,
    }),

    [UNLOAD_GROUP]: state => ({
      ...state,
      group: null,
    }),

    [GROUP_COST_UPDATED]: (state, { payload: group }) => ({
      ...state,
      group: {
        ...state.group,
        ...group,
      },
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
      group: {
        ...state.group,
        ...group,
      },
      error: null,
      costConfirmed: true,
    }),

    [CONFIRM_COST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
    [INIT_COST_CONFIRMED]: state => ({
      ...state,
      costConfirmed: initialState.costConfirmed,
    }),
  },
  initialState,
);

export default group;
