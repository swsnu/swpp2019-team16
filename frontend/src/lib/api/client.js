import axios from 'axios';

function createClient(env) {
  switch (env) {
    case 'production':
      return axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT });
    default:
      return axios.create();
  }
}

const client = createClient(process.env.REACT_APP_NODE_ENV);
export default client;
