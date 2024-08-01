import { useState, useEffect } from 'react';
import { getAllUsers } from '@/src/apis/userApi/user.js'; // 실제 파일 경로에 맞게 수정

const useUsers = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setUserList(response);
      console.log("유저 목록 불러오기 성공");
    } catch (error) {
      setError(error);
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { userList, fetchUsers, loading, error };
};

export default useUsers;
