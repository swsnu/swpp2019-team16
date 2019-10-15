import SagaTester from 'redux-saga-tester';
import * as userAPI from '../../lib/api/user/user';
import user, { userSaga, initialState, tempSetUser, check, logout} from './user';

jest.mock('../../lib/api/user/user');

describe('user', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('action', () => {
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
        const action = check();
        expect(action.type).toStrictEqual('user/CHECK');
        expect(action.payload).toStrictEqual(undefined);
      });
    });
  });

  describe('reducer', () => {
    
    describe('TEMP_SET_USER', () => {
      it('should successfully update states', async () => {
        expect(user({ user: null},
          { type: 'user/TEMP_SET_USER', payload: {id:'TEST_USER'}}))
          .toStrictEqual({
            user: {id:'TEST_USER'}
          });
      });
    });
    

    describe('CHECK_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(user({user: {id: 'TEST_USER'}},
          { type: 'user/CHECK_SUCCESS', payload: {id:'TEST_USER'}}))
          .toStrictEqual({
            user: {id:'TEST_USER'},
            checkError: null
          });
      });
    });

    describe('CHECK_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(user({user: null},
          { type: 'user/CHECK_FAILURE', payload: {error:'TEST_ERROR'}}))
          .toStrictEqual({
            user: null,
            checkError: {error:'TEST_ERROR'}
          });
      });
    });
    
    describe('LOGOUT_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(user({user: {id:"TEST_USER"}},
          { type: 'user/LOGOUT_SUCCESS', payload: {} }))
          .toStrictEqual({
            user: null,
            logoutError: null
          });
      });
    });

    describe('LOGOUT_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(user({},
          { type: 'user/LOGOUT_FAILURE', payload: {error:'TEST_ERROR'}}))
          .toStrictEqual({
            logoutError: {error:'TEST_ERROR'}
          });
      });
    });
  });
    
  describe('saga', () => {
    describe('checkSaga', () => {
      it('should throw error when server respond with error', async () => {
        jest.spyOn(userAPI, 'get')
          .mockImplementation(() => {
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
  });
});
