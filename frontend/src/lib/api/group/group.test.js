import client from '../client';
import * as groupAPI from './group';
import group from 'modules/group/group';

jest.mock('../client');

describe('api/group', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createGroup', () => {
    it('should successfully create group', async done => {
      jest.spyOn(client, 'post').mockImplementation(url => {
        expect(url).toBe('/api/v1/group');
        done();
      });

      groupAPI.createGroup({});
    });
  });

  describe('acceptGroup', () => {
    it('should successfully put driver info in group', async done => {
      jest.spyOn(client, 'put').mockImplementation(url => {
        expect(url).toBe('/api/v1/group/1');
        done();
      });

      groupAPI.acceptGroup({ groupId: 1, driverId: 1 });
    });
  });

  describe('onTaxi', () => {
    it('should successfully put onTaxi info', async done => {
      jest.spyOn(client, 'put').mockImplementation(url => {
        expect(url).toBe('/api/v1/group/taxi/riders');
        done();
      });

      groupAPI.onTaxi(1);
    });
  });

  describe('departure', () => {
    it('should successfully put departure info', async done => {
      jest.spyOn(client, 'put').mockImplementation(url => {
        expect(url).toBe('/api/v1/group/taxi/departure');
        done();
      });

      groupAPI.departure({ groupId: 1, departureTime: 1 });
    });
  });

  describe('fetchMyGroup', () => {
    it('should succesfully get my group', async done => {
      jest.spyOn(client, 'get').mockImplementation(url => {
        expect(url).toBe('/api/v1/group/1');
        done();
      });

      groupAPI.fetchMyGroup(1);
    });
  });

  describe('notifyDriverLocation', () => {
    it('should successfully put driver location info', async done => {
      jest.spyOn(client, 'put').mockImplementation(url => {
        expect(url).toBe('/api/v1/group/taxi/location');
        done();
      });

      groupAPI.notifyDriverLocation({
        driverId: 1,
        groupId: 1,
        locationInfo: 1,
      });
    });
  });

  describe('confirmCost', () => {
    it('should successfully put cost info', async done => {
      jest.spyOn(client, 'put').mockImplementation(url => {
        expect(url).toBe('/api/v1/group/cost');
        done();
      });

      groupAPI.confirmCost({ groupId: 1, totalCost: 1 });
    });
  });
});
