import client from '../client';
import * as userAPI from './user';

jest.mock('../client');

describe('api/user', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should successfully get user info', async done => {
      jest.spyOn(client, 'get').mockImplementation(url => {
        expect(url).toBe('/api/v1/user/1');
        done();
      });

      userAPI.get({ id: 1 });
    });
  });

  describe('updatePoint', () => {
    it('should successfully update point', async done => {
      jest.spyOn(client, 'put').mockImplementation(url => {
        expect(url).toBe('/api/v1/user/1');
        done();
      });

      userAPI.updatePoint({ userId: 1, point: 1000 });
    });
  });
});
