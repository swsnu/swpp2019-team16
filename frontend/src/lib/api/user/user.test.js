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
});
