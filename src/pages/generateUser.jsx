import React, { useEffect, useState } from 'react';
import { postIdCheck, postSignup } from "@/src/apis/userApi/user.js";
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

  const handleEditChange = () => {
    setIsEdit(!isEdit);
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
    if (!await duplicateIdCheck()) { // 중복 아이디 확인
      alert("중복된 id가 존재합니다.");
      return;
    }
    const data = {
      userId: formData.userId,
      password: formData.password,
      name: formData.name,
      role: formData.role,
    };
    try {
      const response = await postSignup(data);
      if (response.result === "success") {
        alert("계정 생성에 성공했습니다.");
        fetchUsers(); // 유저 목록 새로 고침
        setFormData({ userId: '', password: '', name: '', role: '' }); // 폼 데이터 초기화
      }
    } catch (error) {
      console.error('There was an error signing up:', error);
    }
  };

  const duplicateIdCheck = async () => {
    const data = { userId: formData.userId.trim() };
    const result = await postIdCheck(data);
    console.log("res", result)
    return result.available;
  };

  useEffect(() => {
    fetchUsers(); // 페이지 로드 시 유저 목록 가져오기
  }, []);

  useEffect(() => {
    console.log("유저 목록:", userList); // 유저 목록이 콘솔에 잘 찍히는지 확인
  }, [userList]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex min-h-screen w-full flex-col bg-slate-200">
        <SideNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 max-w-[1280px]">
          <Header />
          <div className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0">
            <Card className="grid gap-8 bg-slate-100 h-dvh grid-cols-2">
              <CardContent className="flex flex-col gap-8">
                  <h2 className="text-left text-red-600 font-bold text-2xl mt-6">{ isEdit ? ('유저 수정') : ('유저 생성')}</h2>
                  <div className="grid gap-4 w-[350px]">
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="name">이름</Label>
                      </div>
                      <Input
                        id="name"
                        type="text"
                        placeholder="name"
                        required
                        value={formData.name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="userId">아이디</Label>
                      <div className='focus-within:ring-black rounded-lg focus-within:ring-2'>
                        <div className='flex items-center w-[350px] space-x-0.5 bg-white gap-6 rounded-md border m-0.5'>
                          <input
                            id="userId"
                            type="text"
                            placeholder="id"
                            value={formData.userId}
                            onChange={handleIdChange}
                            required
                            className="w-2/3 border-0 focus:outline-none py-2 px-3 rounded-md"
                          />
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
                            className='w-20 h-8 bg-slate-100 rounded-sm border text-sm'
                          >
                            중복 확인
                          </button>
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
                        required
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
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary">
                    { isEdit ? ('수정') : ('생성')}
                    </Button>
                  </div>
              </CardContent>
              <div className='flex flex-col gap-4 mr-8 mt-6'>
                <h2 className="text-left text-red-600 font-bold text-2xl">유저 목록</h2>
                <Search
                  opt1="name"
                  opt2="userId"
                  opt3="role"
                  select1="이름"
                  select2="아이디"
                  select3="권한"
                />
                <Card className="grid grid-cols-2 row-start-2 col-start-2 h-2/3 px-4 py-4 gap-4 overflow-y-scroll snap-y">
                  {userList.map((user, index) => (
                    <Card key={index} className="h-fit scroll-snap-item pt-6">
                      <CardContent className="gap-4">
                        <p>{user.id}. </p>
                        <p>이름: {user.name}</p>
                        <p>아이디: {user.userId}</p>
                        <p>권한: {user.role}</p>
                        <div className='flex flex-row gap-6 justify-center mt-4'>
                          <button className='bg-slate-500 text-white px-1 py-2 rounded hover:bg-slate-700' onClick={handleEditChange}>수정</button>
                          <DeleteModal user={user} fetchUsers={fetchUsers} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}
