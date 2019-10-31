import client from '../client';

export function get(id) {
  return client.get(`/api/v1/carpool/${id}`);
}

export function create({ userId, from, to, minimumPassenger }) {
  return client.post('/api/v1/carpool', {
    userId: userId,
    from: from,
    to: to,
    minimumPassenger: minimumPassenger,
  });
}

export const del = id => client.delete(`/api/v1/carpool/${id}`);
