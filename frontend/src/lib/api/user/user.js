import client from '../client';

export function get({ id }) {
  return client.get(`/api/v1/user/${id}`);
}

export function updatePoint({ userId, point }) {
  return client.put(`/api/v1/user/${userId}`, { point });
}

export function riderOnTaxi({ riderId }) {
  return client.put(`/api/v1/user/taxi/rider/${riderId}`);
}

export function driverGoTaxi({ driverId }) {
  return client.put(`/api/v1/user/taxi/driver/${driverId}`);
}
