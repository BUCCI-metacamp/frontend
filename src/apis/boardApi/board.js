import axios from 'axios';


// axios 기본 URL 설정
const apiClient = axios.create({
  baseURL: 'http://158.247.241.162:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createPost = (postData) => {
  return apiClient.post('/reports', postData);
};

export const getPosts = () => {
  return apiClient.get('/reports');
};

export const updatePost = (id, postData) => {
  return apiClient.put(`/reports/${id}`, postData);
};

export const deletePost = (id, password) => {
  return apiClient.delete(`/reports/${id}`, {
    data: { password }
  });
};
