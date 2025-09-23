import axios from 'axios';

const api = axios.create({
  baseURL: 'https://isp-rest-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;