import axios from 'axios';

function createClient(env) {
  console.log('env', env);
  switch (env) {
    case 'production':
      console.log('API in production', process.env.REACT_APP_API_ENDPOINT);
      return axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT });
    default:
      return axios.create();
  }
}

const client = createClient(process.env.NODE_ENV);
export default client;
