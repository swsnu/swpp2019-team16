import SagaTester from 'redux-saga-tester';
import * as carpoolAPI from '../../lib/api/carpool';
import carpoolRequest, {
  carpoolRequestSaga,
  initialState,
  requestCarpool,
  cancelCarpool,
  myCarpool,
} from './carpoolRequest';

jest.mock('../../lib/api/carpool');

describe('carpool', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('action', () => {
    describe('REQUEST_CARPOOL', () => {
      it('should successfully create action', async () => {
        const action = requestCarpool({
          userId: '1',
          from: 'from',
          to: 'to',
          minimumPassenger: '3',
        });
        expect(action.type).toStrictEqual('carpoolRequest/REQUEST_CARPOOL');
        expect(action.payload).toStrictEqual({
          userId: '1',
          from: 'from',
          to: 'to',
          minimumPassenger: '3',
        });
      });
    });

    describe('CANCEL_CARPOOL', () => {
      it('should successfully create action', async () => {
        const action = cancelCarpool(1);
        expect(action.type).toStrictEqual('carpoolRequest/CANCEL_CARPOOL');
        expect(action.payload).toStrictEqual(1);
      });
    });

    describe('MY_CARPOOL', () => {
      it('should successfully create action', async () => {
        const action = myCarpool(1);
        expect(action.type).toStrictEqual('carpoolRequest/MY_CARPOOL');
        expect(action.payload).toStrictEqual(1);
      });
    });
  });

  describe('reducer', () => {
    describe('REQUEST_CARPOOL_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          carpoolRequest(
            { carpoolRequest: null },
            {
              type: 'carpoolRequest/REQUEST_CARPOOL_SUCCESS',
              payload: { id: 'TEST_REQUEST' },
            },
          ),
        ).toStrictEqual({
          carpoolRequest: { id: 'TEST_REQUEST' },
          requestCarpoolError: null,
        });
      });
    });

    describe('REQUEST_CARPOOL_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          carpoolRequest(
            { carpoolRequest: null },
            {
              type: 'carpoolRequest/REQUEST_CARPOOL_FAILURE',
              payload: { error: 'TEST_ERROR' },
            },
          ),
        ).toStrictEqual({
          carpoolRequest: null,
          requestCarpoolError: { error: 'TEST_ERROR' },
        });
      });
    });

    describe('CANCEL_CARPOOL_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          carpoolRequest(
            { carpoolRequest: {} },
            { type: 'carpoolRequest/CANCEL_CARPOOL_SUCCESS' },
          ),
        ).toStrictEqual({
          carpoolRequest: null,
          cancelCarpoolError: null,
        });
      });
    });

    describe('CANCEL_CARPOOL_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          carpoolRequest(
            { carpoolRequest: {} },
            {
              type: 'carpoolRequest/CANCEL_CARPOOL_FAILURE',
              payload: { error: 'TEST_ERROR' },
            },
          ),
        ).toStrictEqual({
          carpoolRequest: {},
          cancelCarpoolError: { error: 'TEST_ERROR' },
        });
      });
    });

    describe('MY_CARPOOL_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          carpoolRequest(
            { carpoolRequest: {} },
            {
              type: 'carpoolRequest/MY_CARPOOL_SUCCESS',
              payload: { id: 'TEST_REQUEST' },
            },
          ),
        ).toStrictEqual({
          carpoolRequest: { id: 'TEST_REQUEST' },
          myCarpoolError: null,
        });
      });
    });

    describe('MY_CARPOOL_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          carpoolRequest(
            { carpoolRequest: {} },
            {
              type: 'carpoolRequest/MY_CARPOOL_FAILURE',
              payload: { error: 'TEST_ERROR' },
            },
          ),
        ).toStrictEqual({
          carpoolRequest: {},
          myCarpoolError: { error: 'TEST_ERROR' },
        });
      });
    });
  });

  describe('saga', () => {
    describe('requestCarpoolSaga', () => {
      it('requestCarpool success', async () => {
        const sagaTester = new SagaTester({
          initialState,
          reducers: carpoolRequest,
        });

        sagaTester.start(carpoolRequestSaga);

        sagaTester.dispatch({
          type: 'carpoolRequest/REQUEST_CARPOOL',
          payload: {},
        });

        await sagaTester.waitFor('carpoolRequest/REQUEST_CARPOOL');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'carpoolRequest/REQUEST_CARPOOL',
          payload: {},
        });
      });
    });
  });
});
