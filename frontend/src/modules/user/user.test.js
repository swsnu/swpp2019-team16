import SagaTester from 'redux-saga-tester';
import * as userAPI from '../../lib/api/user';
import user, {
  userSaga,
  initialState,
  tempSetUser,
  check,
  logout,
  updatePoint,
} from './user';

jest.mock('../../lib/api/user');

describe('user', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('action', () => {
    describe('UPDATE_POINT', () => {
      it('should successfully create action', async () => {
        const action = updatePoint({ userId: 1, point: 1000 });
        expect(action.type).toStrictEqual('user/UPDATE_POINT');
        expect(action.payload).toStrictEqual({ userId: 1, point: 1000 });
      });
    });

    describe('TEMP_SET_USER', () => {
      it('should successfully create action', async () => {
        const action = tempSetUser('TEST_USER');
        expect(action.type).toStrictEqual('user/TEMP_SET_USER');
        expect(action.payload).toStrictEqual('TEST_USER');
      });
    });

    describe('LOGOUT', () => {
      it('should successfully create action', async () => {
        const action = logout();
        expect(action.type).toStrictEqual('user/LOGOUT');
        expect(action.payload).toStrictEqual(undefined);
      });
    });

    describe('CHECK OUT', () => {
      it('should successfully create action', async () => {
        const action = check({ id: 1 });
        expect(action.type).toStrictEqual('user/CHECK');
        expect(action.payload).toStrictEqual({ id: 1 });
      });
    });
  });

  describe('reducer', () => {
    describe('TEMP_SET_USER', () => {
      it('should successfully update states', async () => {
        expect(
          user(
            { user: null },
            { type: 'user/TEMP_SET_USER', payload: { id: 'TEST_USER' } },
          ),
        ).toStrictEqual({
          user: { id: 'TEST_USER' },
        });
      });
    });
    describe('UPDATE_POINT_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          user(
            { user: { id: 'TEST_USER', point: 0 } },
            {
              type: 'user/UPDATE_POINT_SUCCESS',
              payload: { id: 'TEST_USER', point: 1234 },
            },
          ),
        ).toStrictEqual({
          pointUpdated: true,
          user: {
            id: 'TEST_USER',
            point: 1234,
            user: {
              id: 'TEST_USER',
              point: 1234,
            },
          },
          updatePointError: null,
        });
      });
    });

    describe('UPDATE_POINT_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          user(
            { user: { id: 'TEST_USER', point: 0 } },
            {
              type: 'user/UPDATE_POINT_FAILURE',
              payload: { error: 'TEST_ERROR' },
            },
          ),
        ).toStrictEqual({
          user: { id: 'TEST_USER', point: 0 },
          updatePointError: { error: 'TEST_ERROR' },
        });
      });
    });

    describe('CHECK_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          user(
            { user: { id: 'TEST_USER' } },
            { type: 'user/CHECK_SUCCESS', payload: { id: 'TEST_USER' } },
          ),
        ).toStrictEqual({
          user: { id: 'TEST_USER' },
          checkError: null,
        });
      });
    });

    describe('CHECK_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          user(
            { user: null },
            { type: 'user/CHECK_FAILURE', payload: { error: 'TEST_ERROR' } },
          ),
        ).toStrictEqual({
          user: null,
          checkError: { error: 'TEST_ERROR' },
        });
      });
    });

    describe('LOGOUT_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(
          user(
            { user: { id: 'TEST_USER' } },
            { type: 'user/LOGOUT_SUCCESS', payload: {} },
          ),
        ).toStrictEqual({
          user: null,
          logoutError: null,
        });
      });
    });

    describe('LOGOUT_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(
          user(
            {},
            { type: 'user/LOGOUT_FAILURE', payload: { error: 'TEST_ERROR' } },
          ),
        ).toStrictEqual({
          logoutError: { error: 'TEST_ERROR' },
        });
      });
    });
  });

  describe('saga', () => {
    describe('logoutSaga', () => {
      it('logout success', async () => {
        const sagaTester = new SagaTester({
          initialState,
          reducers: user,
        });

        sagaTester.start(userSaga);

        sagaTester.dispatch({
          type: 'user/LOGOUT',
          payload: {},
        });

        await sagaTester.waitFor('user/LOGOUT_SUCCESS');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({ type: 'user/LOGOUT_SUCCESS' });
      });

      it('logout failure', async () => {
        console.error = function() {};
        jest
          .spyOn(window.localStorage.__proto__, 'removeItem')
          .mockImplementation(() => {
            throw new ERROR();
          });

        const sagaTester = new SagaTester({
          initialState,
          reducers: user,
        });

        sagaTester.start(userSaga);

        sagaTester.dispatch({
          type: 'user/LOGOUT',
          payload: {},
        });

        await sagaTester.waitFor('user/LOGOUT_FAILURE');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'user/LOGOUT_FAILURE',
        });
      });
    });

    describe('updatePointSaga', () => {
      it('should throw error when server respond with error', async () => {
        jest.spyOn(userAPI, 'updatePoint').mockImplementation(() => {
          throw new Error('Internal Error');
        });

        const sagaTester = new SagaTester({
          initialState,
          reducers: user,
        });

        sagaTester.start(userSaga);

        sagaTester.dispatch({
          type: 'user/UPDATE_POINT',
          payload: { id: 1, point: 1000 },
        });

        await sagaTester.waitFor('user/UPDATE_POINT_FAILURE');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'user/UPDATE_POINT_FAILURE',
          payload: new Error('Internal Error'),
          error: true,
        });
      });
    });

    describe('checkSaga', () => {
      it('should throw error when server respond with error', async () => {
        jest.spyOn(userAPI, 'get').mockImplementation(() => {
          throw new Error('Internal Error');
        });

        const sagaTester = new SagaTester({
          initialState,
          reducers: user,
        });

        sagaTester.start(userSaga);

        sagaTester.dispatch({
          type: 'user/CHECK',
          payload: {},
        });

        await sagaTester.waitFor('user/CHECK_FAILURE');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'user/CHECK_FAILURE',
          payload: new Error('Internal Error'),
          error: true,
        });
      });
    });

    describe('checkFailureSaga', () => {
      it('localStorage is not working', async () => {
        jest
          .spyOn(window.localStorage.__proto__, 'removeItem')
          .mockImplementation(() => {
            throw new ERROR();
          });

        const sagaTester = new SagaTester({
          initialState,
          reducers: user,
        });

        sagaTester.start(userSaga);

        sagaTester.dispatch({
          type: 'user/CHECK_FAILURE',
          payload: {},
        });

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'user/CHECK_FAILURE',
          payload: {},
        });
      });
    });
  });
});
