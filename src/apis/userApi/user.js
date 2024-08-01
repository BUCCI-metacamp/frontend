import { axiosInstance } from './axiosInstance';

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

export const postSignup = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/signup', data);
    console.log("siup", response)
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const postLogin = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};

export const postIdCheck = async (data) => {
  try {
    const response = await axiosInstance.get('/auth/duplicate-check', { params: data });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};

export const postEmailCheck = async (data) => {
  console.log("🚀 ~ postLogin ~ data:", data)
  try {
    const response = await axiosInstance.post('/auth/emailCheck', data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};

// export const postLoginCheck = async () => {
//   try {
//     const response = await axiosInstance.get('/auth/loginCheck');
//     return response.data;
//   } catch (error) {
//     console.error('Error during login:', error.response?.data || error.message);
//     throw error;
//   }
// };

////관리자 권한
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/admin/users');
    // console.log("userdata", response.data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};

// 유저 데이터 삭제 함수 force삭제 진행
export const deleteUser = async (id) => {
  try {
    console.log(id)
    const response = await axiosInstance.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user', error);
    throw error;
  }
};

// 유저 데이터 수정 함수 
export const updateUser = async (userId, updatedData) => {
  console.log("🚀 ~ updateUser ~ updatedData:", updatedData)
  console.log("🚀 ~ updateUser ~ userId:", userId)
  try {
    const response = await axiosInstance.put(`/admin/users/${id}/role`, updatedData);
    console.log("🚀 ~ updateUser ~ response:", response)
    return response.data;
  } catch (error) {
    console.error('Error updating user', error);
    throw error;
  }
};


export const postLogout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};
