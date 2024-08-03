import axios from 'axios';


// axios 기본 URL 설정
const apiClient = axios.create({
  baseURL: 'http://158.247.241.162:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
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

export const createPost = (postData) => {
  return apiClient.post('/reports', postData);
};

export const getPosts = (data) => {
  return apiClient.get('/reports', { params: data });
};

export const getPost = (data) => {
  return apiClient.get(`/reports/${data}`);
}

export const getProductData = (data) => {
  return apiClient.get(`/reports/product-data`)
}

export const updatePost = (id, postData) => {
  return apiClient.put(`/reports/${id}`, postData);
};

export const deletePost = (id) => {
  return apiClient.delete(`/reports/${id}`, {
  });
};
