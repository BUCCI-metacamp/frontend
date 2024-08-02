import axios from 'axios';

const API_URL = 'http://158.247.241.162:3000';
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false, // 세션 쿠키를 포함시키기 위해 설정
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);