import client from '../client';

export function login({ email, password }) {
  return client.post('/api/v1/auth/login', { email, password });
}

export function register({ userType, email, password, carType, plateNo }) {
  return client.post('/api/v1/user/register', {
    userType,
    email,
    password,
    carType,
    plateNo,
  });
}
