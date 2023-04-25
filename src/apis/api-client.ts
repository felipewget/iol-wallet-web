import axios from 'axios';;

export const apiClient = axios.create({
  baseURL: '//iolproject.org/api', //import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  formSerializer: {
    dots: false,
  },
});