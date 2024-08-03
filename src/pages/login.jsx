import { useState } from "react"
import { useAuth } from '../context/AuthContext'; // AuthContext를 import 합니다.


import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"

import bgImage from '@/src/assets/bg.png';

import { Link, useNavigate } from "react-router-dom"

import { postLogin } from "@/src/apis/userApi/user"


export function Login() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value 
    }));
  };

  const validateInputs = () => {
    if (userId === '' || password === '') {
      return false;
    }
    return true;
  }

  const submitClick = async (e) => {
    e.preventDefault(); // 기본 동작 방지

    if (!validateInputs()) {
      return;
    }

    const data = {
      userId: formData.userId,
      password: formData.password,
    };

    try {
      const result = await postLogin(data); 
      console.log("🚀 ~ submitClick ~ result:", result)
      if(result){
        console.log("result:", result)
        localStorage.setItem("token", result.token);
        const userInfo = {
          name: result.name,
          role: result.role
        }
        localStorage.setItem("userRole", userInfo.role)
        
        console.log(localStorage.getItem("userInfo", userInfo.role))
        console.log("login successful")
        navigate('./dashboard');

    }
    else{
        setIsLogin(false); // 로그인 실패 시 상태 업데이트
        alert("정보를 정확하게 입력해주세요")
        console.log("login failed")
        then(() => {
            navigate('/');
        });
    }
    
    } catch (error) {
    }
  }

  return (
    <form>
    <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">로그인</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="userId">아이디</Label>
              <Input
                id="userId"
                type="userId"
                placeholder="ID"
                required
                value={formData.userId}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
              </div>
              <Input 
              id="password" 
              type="password" 
              placeholder="password"
              required 
              value={formData.password} 
              onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full bg-primary" onClick={submitClick}>
              로그인
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={bgImage}
          alt="Image"
          width="1792"
          height="1024"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    </form>
  )
}