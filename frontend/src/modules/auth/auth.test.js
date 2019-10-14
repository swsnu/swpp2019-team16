import SagaTester from 'redux-saga-tester';
import * as authAPI from '../../lib/api/auth/auth';
import auth, { authSaga, changeField, initalizeForm, initialState, login, register} from './auth';

jest.mock('../../lib/api/auth/auth');

describe('auth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('action', () => {
    describe('changeField', () => {
      it('should successfully create action', async () => {
        const action = changeField({ form: 'form', key: 'key', value: 'value' });
        expect(action.type).toStrictEqual('auth/CHANGE_FIELD');
        expect(action.payload).toStrictEqual({ form: 'form', key: 'key', value: 'value' });
      });
    });

    describe('initializeForm', () => {
      it('should successfully create action', async () => {
        const action = initalizeForm('form');
        expect(action.type).toStrictEqual('auth/INITIALIZE_FORM');
        expect(action.payload).toStrictEqual('form');
      });
    });

    describe('register', () => {
      it('should successfully create action', async () => {
        const action = register({
          email: 'zeroFruit@gmail.com',
          password: 'password',
          vehicleInfo: {
            carType: 'Mercedes-Benz',
            plate: '54가 0639',
          },
        });

        expect(action.type).toStrictEqual('auth/REGISTER');
        expect(action.payload).toStrictEqual({
          email: 'zeroFruit@gmail.com',
          password: 'password',
          vehicleInfo: {
            carType: 'Mercedes-Benz',
            plate: '54가 0639',
          },
        });
      });
    });

    describe('login', () => {
      it('should successfully create action', async () => {
        const action = login({ email: 'zeroFruit@gmail.com', password: 'password' });
        expect(action.type).toStrictEqual('auth/LOGIN');
        expect(action.payload).toStrictEqual({ email: 'zeroFruit@gmail.com', password: 'password' });
      });
    });
  });

  describe('reducer', () => {
    describe('CHANGE_FIELD', () => {
      it('should successfully update states', async () => {
        expect(auth({ login: { email: '', password: '' }},
          { type: 'auth/CHANGE_FIELD', payload: { form: 'login', key: 'email', value: 'zeroFruit@gmail.com' }}))
          .toStrictEqual({
            login: {
              email: 'zeroFruit@gmail.com',
              password: '',
            }
          });
      });
    });
    describe('INITIALIZE_FORM', () => {
      it('should successfully update states', async () => {
        expect(auth({}, { type: 'auth/INITIALIZE_FORM', payload: 'login' }))
          .toStrictEqual({ login: { password: '', email: '' }})
      });
    });

    describe('REGISTER_SUCCESS', () => {
      it('should successfully set authError null', async () => {
        expect(auth({},
          {
            type: 'auth/REGISTER_SUCCESS',
            payload: { accessToken: 'access_token' },
          }))
          .toStrictEqual({
            authError: null,
            auth: { accessToken: 'access_token' },
          });
      });
    });

    describe('REGISTER_FAILURE', () => {
      it('should set authError', async () => {
        expect(auth({},
          {
            type: 'auth/REGISTER_FAILURE',
            payload: { error: new Error('ERROR') },
          }))
          .toStrictEqual({
            authError: { error: new Error('ERROR') },
          });
      });
    });

    describe('LOGIN_SUCCESS', () => {
      it('should successfully update states', async () => {
        expect(auth({}, { type: 'auth/LOGIN_SUCCESS', payload: {} }))
          .toStrictEqual({ authError: null, auth: {} });
      });
    });

    describe('LOGIN_FAILURE', () => {
      it('should successfully update states', async () => {
        expect(auth({}, { type: 'auth/LOGIN_FAILURE', payload: new Error('ERROR') }))
          .toStrictEqual({ authError: new Error('ERROR') });
      });
    });
  });

  describe('saga', () => {
    describe('registerSaga', () => {
      it('should throw error when server respond with error', async () => {
        jest.spyOn(authAPI, 'register')
          .mockImplementation(() => {
            throw new Error('Internal Error');
          });

        const sagaTester = new SagaTester({
          initialState,
          reducers: auth,
        });

        sagaTester.start(authSaga);

        sagaTester.dispatch({
          type: 'auth/REGISTER',
          payload: {
            username: 'zeroFruit@gmail.com',
            password: 'password',
            vehicleInfo: {
              carType: 'Mercedes-Benz',
              plate: '54가 0639',
            },
          }
        });

        await sagaTester.waitFor('auth/REGISTER_FAILURE');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'auth/REGISTER_FAILURE',
          payload: new Error('Internal Error'),
          error: true,
        });
      });

      it('should successfully register user', async () => {
        jest.spyOn(authAPI, 'register')
          .mockImplementation(() => ({ data: {} }));

        const sagaTester = new SagaTester({
          initialState,
          reducers: auth,
        });

        sagaTester.start(authSaga);

        sagaTester.dispatch({
          type: 'auth/REGISTER',
          payload: {
            username: 'zeroFruit@gmail.com',
            password: 'password',
            vehicleInfo: {
              carType: 'Mercedes-Benz',
              plate: '54가 0639',
            },
          }
        });

        await sagaTester.waitFor('auth/REGISTER_SUCCESS');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'auth/REGISTER_SUCCESS',
          payload: {},
        });
      });
    });
    describe('loginSaga', () => {
      it('should throw error when server respond with error', async () => {
        jest.spyOn(authAPI, 'login')
          .mockImplementation(() => {
            throw new Error('Authorization Error');
          });

        const sagaTester = new SagaTester({
          initialState,
          reducers: auth,
        });

        sagaTester.start(authSaga);

        sagaTester.dispatch({
          type: 'auth/LOGIN',
          payload: {
            username: 'zeroFruit@gmail.com',
            password: 'password',
          }
        });

        await sagaTester.waitFor('auth/LOGIN_FAILURE');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'auth/LOGIN_FAILURE',
          payload: new Error('Authorization Error'),
          error: true,
        });
      });

      it('should successfully fetch data', async () => {
        jest.spyOn(authAPI, 'login').mockImplementation(() => ({ data: {} }));

        const sagaTester = new SagaTester({
          initialState,
          reducers: auth,
        });

        sagaTester.start(authSaga);

        sagaTester.dispatch({
          type: 'auth/LOGIN',
          payload: {
            email: 'zeroFruit@gmail.com',
            password: 'password',
          }
        });

        await sagaTester.waitFor('auth/LOGIN_SUCCESS');

        const result = sagaTester.getCalledActions();

        expect(result).toContainEqual({
          type: 'auth/LOGIN_SUCCESS',
          payload: {},
        })
      });
    });
  });
});
