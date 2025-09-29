import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://isp-rest-api.onrender.com',
  // baseURL: 'https://isp-rest-api.vercel.app',
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});