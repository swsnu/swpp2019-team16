import client from '../client';

export function createGroup({ groupId, riders, driver, from, to }) {
  return client.post(`/api/v1/group`, { groupId, riders, driver, from, to });
}

export function acceptGroup({ groupId, driverId }) {
  return client.put(`/api/v1/group/${groupId}`, { driverId });
}

export function onTaxi(riderId) {
  return client.put(`/api/v1/group/taxi/riders`, { riderId });
}

export function departure({ groupId, departureTime }) {
  return client.put(`/api/v1/group/taxi/departure`, { groupId, departureTime });
}

export function fetchMyGroup(groupId) {
  return client.get(`/api/v1/group/${groupId}`);
}

export function notifyDriverLocation({ driverId, groupId, locationInfo }) {
  return client.put(`/api/v1/group/taxi/location`, {
    driverId,
    groupId,
    locationInfo,
  });
}

export function confirmCost({ groupId, totalCost }) {
  return client.put(`/api/v1/group/${groupId}/cost`, { groupId, totalCost });
}
