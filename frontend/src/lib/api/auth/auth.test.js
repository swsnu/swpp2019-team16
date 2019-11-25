import client from '../client';
import * as authAPI from './auth';

jest.mock('../client');

describe('api/auth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully return params', async done => {
      jest.spyOn(client, 'post').mockImplementation((url, body) => {
        expect(url).toBe('/api/v1/auth/login');
        expect(body.email).toBe('user@gmail.com');
        expect(body.password).toBe('password');
        done();
      });

      authAPI.login({ email: 'user@gmail.com', password: 'password' });
    });
  });

  describe('register', () => {
    it('should successfully return params', async done => {
      jest.spyOn(client, 'post').mockImplementation((url, body) => {
        expect(url).toBe('/api/v1/user/register');
        expect(body).toStrictEqual({
          userType: 'rider',
          email: 'user@gmail.com',
          password: 'password',
          carType: 'Mercedes-Benz',
          plateNo: '54가 0639',
        });
        done();
      });

      authAPI.register({
        userType: 'rider',
        email: 'user@gmail.com',
        password: 'password',
        carType: 'Mercedes-Benz',
        plateNo: '54가 0639',
      });
    });
  });
});
