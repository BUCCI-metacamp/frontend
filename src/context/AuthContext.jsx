import React, { createContext, useState, useContext, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userRole, setUserRole] = useState();
  const [userName, setUserName] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);

  const login = (info) => {
    
    console.log("12412414", info.role)
    setIsLoggedin(true);
    setUserRole(info.role);
    setUserName(info.name);
    console.log(userRole)
  };





  const logout = () => {
    setIsLoggedin(false);
    // setUserRole(null);
    // setUserName(null);
    setUserInfo(null); // 사용자 역할 설정

  };

  return (
    <AuthContext.Provider value={{ isLoggedin, setIsLoggedin, userName, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
