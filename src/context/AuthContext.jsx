import React, { createContext, useState, useContext, useEffect } from 'react';
// import { postLoginCheck } from '../apis/userApi/user';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(null); // 사용자 역할 상태 추가
  const [loginChecked, setLoginChecked] = useState(false);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const result = await postLoginCheck();

  //       setIsLogin(result.success);
  //       setUserRole(result.user.role); // 사용자 역할 설정
  //     } catch (error) {
  //       console.error('Login check failed:', error);
  //     } finally {
  //       setLoginChecked(true);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, userRole, loginChecked }}>
      {children}
    </AuthContext.Provider>
  );
};
