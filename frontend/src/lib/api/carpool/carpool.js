import client from '../client';

export function get(id) {
  return client.get(`/api/v1/carpool/${id}`);
}

export function create({ riderId, from, to, minimumPassenger }) {
  return client.post('/api/v1/carpool_request/', {
    rider_id: riderId,
    from_location: from,
    to_location: to,
    minimum_passenger: minimumPassenger,
  });
}

export const del = id => client.delete(`/api/v1/carpool/${id}`);
