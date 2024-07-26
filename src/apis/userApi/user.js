import { axiosInstance } from './axiosInstance';

export const postSignup = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/signup', data);
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
  console.log("🚀 ~ postLogin ~ data:", data)
  try {
const response = await axiosInstance.get('/auth/duplicate-check', { params: data });
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
    const response = await axiosInstance.get('/users/allUser');
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};

// 유저 데이터 삭제 함수 force삭제 진행
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/deleteForce/${userId}`);
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
    const response = await axiosInstance.put(`/users/update/${userId}`, updatedData);
    console.log("🚀 ~ updateUser ~ response:", response)
    return response.data;
  } catch (error) {
    console.error('Error updating user', error);
    throw error;
  }
};
////////////////////////////////

export const postLogout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};
