import axios from 'axios';;

axios.defaults.adapter = require('axios/lib/adapters/http');

export const apiClient = axios.create({
  baseURL: '//localhost:8000/api', //import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  formSerializer: {
    dots: false,
  },
});