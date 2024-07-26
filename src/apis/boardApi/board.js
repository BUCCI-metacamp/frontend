import axios from 'axios';


// axios 기본 URL 설정
const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: false, // 세션 쿠키를 포함시키기 위해 설정
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createPost = (postData) => {
  return apiClient.post('/board/reports', postData);
};

export const getPosts = () => {
  return apiClient.get('/board/reports');
};

export const updatePost = (id, postData) => {
  return apiClient.put(`/board/reports/${id}`, postData);
};

export const deletePost = (id, password) => {
  return apiClient.delete(`/board/reports/${id}`, {
    data: { password }
  });
};
