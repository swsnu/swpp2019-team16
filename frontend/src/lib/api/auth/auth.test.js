import client from '../client';
import * as authAPI from './auth';

jest.mock('../client');

describe('api/auth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully return params', async (done) => {
      jest.spyOn(client, 'post').mockImplementation((url, body) => {
        expect(url).toBe('/api/v1/auth/login');
        expect(body.email).toBe('user@gmail.com');
        expect(body.password).toBe('password');
        done();
      });

      authAPI.login({ email: 'user@gmail.com', password: 'password'});
    });
  });

  describe('register', () => {
    it('should successfully return params', async (done) => {
      jest.spyOn(client, 'post').mockImplementation((url, body) => {
        expect(url).toBe('/api/v1/auth/register');
        expect(body).toStrictEqual({
          email: 'user@gmail.com',
          password: 'password',
          vehicleInfo: {
            carType: 'Mercedes-Benz',
            plate: '54가 0639',
          },
        });
        done();
      });

      authAPI.register({
        email: 'user@gmail.com',
        password: 'password',
        vehicleInfo: {
          carType: 'Mercedes-Benz',
          plate: '54가 0639',
        },
      });
    })
  })
});
