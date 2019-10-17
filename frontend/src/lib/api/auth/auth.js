import client from '../client';

export function login({ email, password }) {
  return client.post('/api/v1/auth/login', { email, password });
}

export function register({ email, password, vehicleInfo }) {
  return client.post('/api/v1/auth/register', { email, password, vehicleInfo });
}
