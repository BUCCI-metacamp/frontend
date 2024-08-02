import React, { useEffect, useState } from 'react';
import { postIdCheck, postSignup, updateUser } from "@/src/apis/userApi/user.js";
import useUsers from '../hooks/useUsers'; // 커스텀 훅의 실제 경로에 맞게 수정

import DeleteModal from "@components/deleteModal";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@components/ui/select";

import { SideNav } from '@/src/components/sideNav';
import { Card, CardContent } from '../components/ui/card';
import Header from '@/src/components/header';
import Search from '@/src/components/search';

export function GenerateUser() {
  const { userList, fetchUsers } = useUsers();
  const [ isEdit, setIsEdit ] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: '',
    role: ''
  });

  const cancelEditChange = (e) => {
    setIsEdit(false);
    setFormData({ userId: '', password: '', name: '', role: '' });
    document.getElementById('userId').disabled = false;
  }

  const handleEditChange = (user) => {
    setIsEdit(true);
    setFormData({
      userId: user.userId,
      password: "",
      name: user.name,
      role: user.role
    });
    document.getElementById('userId').disabled = true;
    alert("수정하세요")
  }

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value
    });
  };

  const handleIdChange = (e) => {
    setFormData({
      ...formData,
      userId: e.target.value
    });
  };

  const handlePwChange = (e) => {
    setFormData({
      ...formData,
      password: e.target.value
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userId: formData.userId,
      password: formData.password,
      name: formData.name,
      role: formData.role,
    };
    if(!isEdit){
      try {
        if(!validate()){
          return;
        }
        if (!await duplicateIdCheck()) { // 중복 아이디 확인
          alert("중복된 id가 존재합니다.");
          return;
        }
        const response = await postSignup(data);
        if (response.result === "success") {
          alert("계정 생성에 성공했습니다.");
          fetchUsers(); // 유저 목록 새로 고침
          setFormData({ userId: '', password: '', name: '', role: '' }); // 폼 데이터 초기화
        }
      } catch (error) {
        console.error('There was an error signing up:', error);
      }
    } else {
      try{
        const user = userList.find((user) => user.userId == data.userId)
        const response = await updateUser(user.id, {name:data.name, role:data.role, password:data.password});
        if (response.updatedCount === 1 ){
          alert("유저 정보 수정에 성공했습니다.");
          fetchUsers(); // 유저 목록 새로 고침
          setFormData({ userId: '', password: '', name: '', role: '' }); // 폼 데이터 초기화
          setIsEdit(false); // 수정 모드 해제
          document.getElementById('userId').disabled = false;
        }
      } catch (error){
        console.error('Error updating user', error);
      }
    }
  };

  const duplicateIdCheck = async () => {
    const data = { userId: formData.userId.trim() };
    const result = await postIdCheck(data);
    console.log("res", result)
    if( result == true ){
      return result;
    }
  };

  useEffect(() => {
    fetchUsers(); // 페이지 로드 시 유저 목록 가져오기
  }, []);

  useEffect(() => {
    console.log("유저 목록:", userList); // 유저 목록이 콘솔에 잘 찍히는지 확인
  }, [userList]);

  const validate = () => {
    const { userId, password, name, role } = formData;
    if (!userId || userId.trim() === "") {
      alert("아이디를 입력하세요");
      return false;
    }
    if (!password || password.trim() === "") {
      alert("비밀번호를 입력하세요");
      return false;
    }
    if (!name || name.trim() === "") {
      alert("이름을 입력하세요");
      return false;
    }
    if (!role || role.trim() === "") {
      alert("권한을 선택하세요");
      return false;
    }
    return true;
  }

  return (

      <div className="flex min-h-screen w-full flex-col bg-slate-200">
        <SideNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 max-w-[1280px]">
          <Header />
          <div className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0">
          <form onSubmit={handleSubmit}>
            <Card className="grid bg-slate-100 h-dvh grid-cols-2 h-fit grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            
              <div className='flex flex-col gap-4 mr-4 mt-6 md:mx-8 sm:mx-12 xs: mx-16'>
                  <h2 className="text-left text-red-600 font-bold text-2xl">{ isEdit ? ('유저 수정') : ('유저 생성')}</h2>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="name">이름</Label>
                      </div>
                      <Input
                        id="name"
                        type="text"
                        placeholder="name"
                        value={formData.name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="userId">아이디</Label>
                      <div className='focus-within:ring-black rounded-lg focus-within:ring-2'>
                        <div className='flex items-center space-x-0.5 bg-white gap-6 rounded-md border m-0.5 relative'>
                          <input
                            maxLength='8'
                            id="userId"
                            type="text"
                            placeholder="id"
                            value={formData.userId}
                            onChange={handleIdChange}
                            className="w-2/3 border-0 focus:outline-none py-2 px-3 rounded-md"
                          />
                          {isEdit ? ( <></> ) : ( 
                          <button
                            type="button"
                            onClick={async () => {
                              const isUnique = await duplicateIdCheck();
                              if (isUnique) {
                                alert("아이디 사용 가능");
                              } else {
                                alert("아이디 중복");
                              }
                            }}
                            className='w-20 h-8 bg-slate-100 rounded-sm border text-sm absolute right-1'
                          >
                            중복 확인
                          </button>) }

                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">비밀번호</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handlePwChange}
                      />
                    </div>
                    <div className="grid gap-2 mb-10">
                      <div className="flex items-center">
                        <Label htmlFor="role">권한</Label>
                      </div>
                      <div>
                        <Select value={formData.role} onValueChange={handleRoleChange} className="w-[350px]">
                          <SelectTrigger>
                            <SelectValue placeholder="권한" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="admin">admin</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    { isEdit ? 
                      (
                        <div className='gap-4 flex flex-row justify-between'>
                          <Button type="button" className="w-full bg-primary w-[100px]">
                            수정
                          </Button>
                          <Button type="button" variant="destructive" className="w-[100px]" onClick={cancelEditChange}>취소</Button>
                        </div>
                      ) : (
                        <Button type="submit" className="w-full bg-primary">
                          생성
                        </Button>
                      )
                    }

                  </div>
              </div>
              <div className='flex flex-col gap-4 mt-6 md:mx-8 sm: mx-12'>
                <h2 className="text-left text-red-600 font-bold text-2xl">유저 목록</h2>
                <Search
                  opt1="name"
                  opt2="userId"
                  opt3="role"
                  select1="이름"
                  select2="아이디"
                  select3="권한"
                />
                <Card className="grid row-start-2 col-start-2 h-2/3 px-4 py-4 gap-4 overflow-y-scroll snap-y h-1/2 bg-slate-100 border-0">
                  {userList.map((user, index) => (
                    <Card key={index} className="h-full scroll-snap-item pt-6 hover:bg-slate-100 border shadow-md">
                      <CardContent className="gap-4 flex flex-row items-center justify-between">
                        <div className='flex flex-col gap-2'>
                          <p>이름: {user.name}</p>
                          <p>ID: {user.userId}</p>
                          <p>권한: {user.role}</p>
                        </div>
                        <div className='flex flex-row gap-6  mt-4'>
                        <button type="button" className='bg-slate-500 text-white px-1 py-2 rounded hover:bg-slate-700' onClick={() => handleEditChange(user)}>수정</button>
                        <DeleteModal user={user} fetchUsers={fetchUsers} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </Card>
              </div>
              
            </Card>
            </form>
          </div>
        </div>
      </div>

  );
}
