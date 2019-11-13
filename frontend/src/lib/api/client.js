import axios from 'axios';

const client = axios.create({
  url: 'localhost:8000',
});

export default client;
