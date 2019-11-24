import client from '../client';
import * as carpoolAPI from './carpool';

jest.mock('../client');

describe('api/carpool', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should successfully get carpoolRequest info', async done => {
      jest.spyOn(client, 'get').mockImplementation(url => {
        expect(url).toBe('/api/v1/carpool/1');
        done();
      });

      carpoolAPI.get(1);
    });
  });

  describe('create', () => {
    it('should successfully create carpoolRequest', async done => {
      jest.spyOn(client, 'post').mockImplementation(url => {
        expect(url).toBe('/api/v1/carpool_request/');
        done();
      });

      carpoolAPI.create({});
    });
  });

  describe('delete', () => {
    it('should successfully delete carpool info', async done => {
      jest.spyOn(client, 'delete').mockImplementation(url => {
        expect(url).toBe('/api/v1/carpool/1');
        done();
      });

      carpoolAPI.del(1);
    });
  });
});
