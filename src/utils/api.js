import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://isp-rest-api.onrender.com',
  // withCredentials: true,
});

export const apiBase = axios.create({
  baseURL: 'https://isp-rest-api.onrender.com'
});