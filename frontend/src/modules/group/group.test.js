import SagaTester from 'redux-saga-tester';
import group, {
  groupSaga,
  initialState,
  createGroup,
  acceptGroup,
  onTaxi,
  departure,
  fetchMyGroup,
  notifyDriverLocation,
  confirmCost,
} from './group';

jest.mock('../../lib/api/group');

describe('group', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('action', () => {
    describe('ACCEPT_GROUP', () => {
      it('should successfully create action', async () => {
        const action = acceptGroup({
          groupId: '1',
          driverId: '1',
        });
        expect(action.type).toStrictEqual('group/ACCEPT_GROUP');
        expect(action.payload).toStrictEqual({
          groupId: '1',
          driverId: '1',
        });
      });
    });

    describe('ON_TAXI', () => {
      it('should successfully create action', async () => {
        const action = onTaxi({
          riderId: '1',
        });
        expect(action.type).toStrictEqual('group/ON_TAXI');
        expect(action.payload).toStrictEqual({
          riderId: '1',
        });
      });
    });

    describe('DEPARTURE', () => {
      it('should successfully create action', async () => {
        const action = departure({
          groupId: '1',
          departureTime: '0920',
        });
        expect(action.type).toStrictEqual('group/DEPARTURE');
        expect(action.payload).toStrictEqual({
          groupId: '1',
          departureTime: '0920',
        });
      });
    });

    describe('FETCH_MY_GROUP', () => {
      it('should successfully create action', async () => {
        const action = fetchMyGroup({
          groupId: '1',
        });
        expect(action.type).toStrictEqual('group/FETCH_MY_GROUP');
        expect(action.payload).toStrictEqual({
          groupId: '1',
        });
      });
    });

    describe('NOTIFY_DRIVER_LOCATION', () => {
      it('should successfully create action', async () => {
        const action = notifyDriverLocation({
          driverId: '1',
          groupId: '1',
          locationInfo: 'googleMap',
        });
        expect(action.type).toStrictEqual('group/NOTIFY_DRIVER_LOCATION');
        expect(action.payload).toStrictEqual({
          driverId: '1',
          groupId: '1',
          locationInfo: 'googleMap',
        });
      });
    });

    describe('CONFIRM_COST', () => {
      it('should successfully create action', async () => {
        const action = confirmCost({
          groupId: '1',
          totalCost: '5000',
        });
        expect(action.type).toStrictEqual('group/CONFIRM_COST');
        expect(action.payload).toStrictEqual({
          groupId: '1',
          totalCost: '5000',
        });
      });
    });
  });

  describe('reducer', () => {
    describe('ACCEPT_GROUP_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            {
              group: null,
              error: null,
            },
            {
              type: 'group/ACCEPT_GROUP_SUCCESS',
              payload: { id: 'TEST_REQUEST' },
            },
          ),
        ).toStrictEqual({
          group: { id: 'TEST_REQUEST' },
          error: null,
        });
      });
    });

    describe('ACCEPT_GROUP_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            { group: null },
            {
              type: 'group/ACCEPT_GROUP_FAILURE',
              payload: { error: 'TEST_ERROR' },
            },
          ),
        ).toStrictEqual({
          group: null,
          error: { error: 'TEST_ERROR' },
        });
      });
    });

    describe('ON_TAXI_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            {
              group: null,
              error: null,
            },
            {
              type: 'group/ON_TAXI_SUCCESS',
              payload: { id: 'TEST_REQUEST' },
            },
          ),
        ).toStrictEqual({
          group: { id: 'TEST_REQUEST' },
          error: null,
        });
      });
    });

    describe('ON_TAXI_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            { group: null },
            {
              type: 'group/ON_TAXI_FAILURE',
              payload: { error: 'TEST_ERROR' },
            },
          ),
        ).toStrictEqual({
          group: null,
          error: { error: 'TEST_ERROR' },
        });
      });
    });

    describe('DEPARTURE_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            {
              group: null,
              error: null,
            },
            {
              type: 'group/DEPARTURE_SUCCESS',
              payload: { id: 'TEST_REQUEST' },
            },
          ),
        ).toStrictEqual({
          group: { id: 'TEST_REQUEST' },
          error: null,
        });
      });
    });

    describe('DEPARTURE_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            { group: null },
            {
              type: 'group/DEPARTURE_FAILURE',
              payload: { error: 'TEST_ERROR' },
            },
          ),
        ).toStrictEqual({
          group: null,
          error: { error: 'TEST_ERROR' },
        });
      });
    });

    describe('FETCH_MY_GROUP_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            {
              group: null,
              error: null,
            },
            {
              type: 'group/FETCH_MY_GROUP_SUCCESS',
              payload: { id: 'TEST_REQUEST' },
            },
          ),
        ).toStrictEqual({
          group: { id: 'TEST_REQUEST' },
          error: null,
        });
      });
    });

    describe('FETCH_MY_GROUP_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            { group: null },
            {
              type: 'group/FETCH_MY_GROUP_FAILURE',
              payload: { error: 'TEST_ERROR' },
            },
          ),
        ).toStrictEqual({
          group: null,
          error: { error: 'TEST_ERROR' },
        });
      });
    });

    describe('NOTIFY_DRIVER_LOCATION_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            {
              group: null,
              error: null,
            },
            {
              type: 'group/NOTIFY_DRIVER_LOCATION_SUCCESS',
              payload: { id: 'TEST_REQUEST' },
            },
          ),
        ).toStrictEqual({
          group: { id: 'TEST_REQUEST' },
          error: null,
        });
      });
    });

    describe('NOTIFY_DRIVER_LOCATION_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            { group: null },
            {
              type: 'group/NOTIFY_DRIVER_LOCATION_FAILURE',
              payload: { error: 'TEST_ERROR' },
            },
          ),
        ).toStrictEqual({
          group: null,
          error: { error: 'TEST_ERROR' },
        });
      });
    });

    describe('CONFIRM_COST_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            {
              group: null,
              error: null,
            },
            {
              type: 'group/CONFIRM_COST_SUCCESS',
              payload: { id: 'TEST_REQUEST' },
            },
          ),
        ).toStrictEqual({
          group: { id: 'TEST_REQUEST' },
          error: null,
        });
      });
    });

    describe('CONFIRM_COST_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          group(
            { group: null },
            {
              type: 'group/CONFIRM_COST_FAILURE',
              payload: { error: 'TEST_ERROR' },
            },
          ),
        ).toStrictEqual({
          group: null,
          error: { error: 'TEST_ERROR' },
        });
      });
    });
  });

  describe('saga', () => {
    describe('acceptGroupSaga', () => {
      it('acceptGroupSaga success', async () => {
        const sagaTester = new SagaTester({
          initialState,
          reducers: group,
        });

        sagaTester.start(groupSaga);

        sagaTester.dispatch({
          type: 'group/ACCEPT_GROUP',
          payload: {
            groupId: '1',
            driverId: '1',
          },
        });

        await sagaTester.waitFor('group/ACCEPT_GROUP');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'group/ACCEPT_GROUP',
          payload: {
            groupId: '1',
            driverId: '1',
          },
        });
      });
    });

    describe('onTaxiSaga', () => {
      it('onTaxiSaga success', async () => {
        const sagaTester = new SagaTester({
          initialState,
          reducers: group,
        });

        sagaTester.start(groupSaga);

        sagaTester.dispatch({
          type: 'group/ON_TAXI',
          payload: {
            riderId: '1',
          },
        });

        await sagaTester.waitFor('group/ON_TAXI');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'group/ON_TAXI',
          payload: {
            riderId: '1',
          },
        });
      });
    });

    describe('departureSaga', () => {
      it('departureSaga success', async () => {
        const sagaTester = new SagaTester({
          initialState,
          reducers: group,
        });

        sagaTester.start(groupSaga);

        sagaTester.dispatch({
          type: 'group/DEPARTURE',
          payload: {
            groupId: '1',
            departureTime: '0920',
          },
        });

        await sagaTester.waitFor('group/DEPARTURE');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'group/DEPARTURE',
          payload: {
            groupId: '1',
            departureTime: '0920',
          },
        });
      });
    });

    describe('fetchMyGroupSaga', () => {
      it('fetchMyGroupSaga success', async () => {
        const sagaTester = new SagaTester({
          initialState,
          reducers: group,
        });

        sagaTester.start(groupSaga);

        sagaTester.dispatch({
          type: 'group/FETCH_MY_GROUP',
          payload: {
            groupId: '1',
          },
        });

        await sagaTester.waitFor('group/FETCH_MY_GROUP');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'group/FETCH_MY_GROUP',
          payload: {
            groupId: '1',
          },
        });
      });
    });

    describe('notifyDriverLocationSaga', () => {
      it('notifyDriverLocationSaga success', async () => {
        const sagaTester = new SagaTester({
          initialState,
          reducers: group,
        });

        sagaTester.start(groupSaga);

        sagaTester.dispatch({
          type: 'group/NOTIFY_DRIVER_LOCATION',
          payload: {
            driverId: '1',
            groupId: '1',
            locationInfo: 'googleMap',
          },
        });

        await sagaTester.waitFor('group/NOTIFY_DRIVER_LOCATION');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'group/NOTIFY_DRIVER_LOCATION',
          payload: {
            driverId: '1',
            groupId: '1',
            locationInfo: 'googleMap',
          },
        });
      });
    });

    describe('confirmCostSaga', () => {
      it('confirmCostSaga success', async () => {
        const sagaTester = new SagaTester({
          initialState,
          reducers: group,
        });

        sagaTester.start(groupSaga);

        sagaTester.dispatch({
          type: 'group/CONFIRM_COST',
          payload: {
            groupId: '1',
            totalCost: '5000',
          },
        });

        await sagaTester.waitFor('group/CONFIRM_COST');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'group/CONFIRM_COST',
          payload: {
            groupId: '1',
            totalCost: '5000',
          },
        });
      });
    });
  });
});
