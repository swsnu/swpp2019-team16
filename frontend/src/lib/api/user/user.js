import client from '../client';

export function get({ id }) {
  return client.get(`/api/v1/user/${id}`);
}

export function updatePoint({ id, point }){
  return client.put(`/api/v1/user/${id}`, { point });
}