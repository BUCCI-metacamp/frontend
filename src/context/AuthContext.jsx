import React, { createContext, useState, useContext, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(null); // 사용자 역할 상태 추가
  const [loginChecked, setLoginChecked] = useState(false);


  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, userRole, loginChecked }}>
      {children}
    </AuthContext.Provider>
  );
};
