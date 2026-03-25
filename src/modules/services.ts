export const BASE_URL = 'https://campusconnect-backend-tve1.onrender.com';


import axios from 'axios';


export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});