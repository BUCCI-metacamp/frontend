import React, { Component, useState } from 'react'
import { Link } from "react-router-dom"
import { postIdCheck } from "@/src/apis/userApi/user.js"

import axios from 'axios'

import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@components/ui/select"

import { SideNav } from '@/src/components/sideNav'
import { Card, CardContent } from '../components/ui/card'
import Header from '@/src/components/header'

export function GenerateUser() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: ''
  });
  
  const handleChange = (e) => {
    const newFormData = e.target.value;
    setFormData(newFormData)
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/signup', formData);
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('There was an error signing up:', error);
    }
  };

  const duplicateIdCheck = async () => {
    const data = {
        userID: document.getElementById('email').value.trim()
    }
    const result = await postIdCheck(data);
    console.log("🚀 ~ duplicateIDCheck ~ result:", result)
  }
  
    return (
      <form onAbort={handleSubmit}>
      <div className="flex min-h-screen w-full flex-col bg-slate-200">
        <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 max-w-[1280px]">
        <Header/>
        <div className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0">
        <Card className="grid gap-8 bg-slate-100 h-dvh grid-cols-2">
          <CardContent className="flex flex-col gap-8">
          <h2 className="text-left text-red-600 font-bold text-2xl mt-6">유저 생성</h2>
          <div className="grid gap-4 w-[350px] ">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">이름</Label>
              </div>
              <Input 
              id="username" 
              type="username" 
              required 
              value={formData.username}
              onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ID">아이디</Label>
              <div className='focus-within:ring-black rounded-lg focus-within:ring-2'>
                <div className='flex items-center w-[350px] space-x-0.5 bg-white gap-6 rounded-md border m-0.5'>
                  <input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-2/3 border-0 focus:outline-none py-2 px-3 rounded-md"
                  />
                    <button onClick={duplicateIdCheck} className='w-20 h-8 bg-slate-100 rounded-sm border text-sm'>중복 확인</button>
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
              required 
              value={formData.password}
              onChange={handleChange}
              />
            </div>
            <div className="grid gap-2 mb-10">
              <div className="flex items-center ">
                <Label htmlFor="permission">권한</Label>
              </div>
              <div>
                <Select value={formData.role} onValueChange={handleRoleChange} className="w-[350px]">
                  <SelectTrigger>
                    <SelectValue placeholder="권한" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="shyachyo">Shyachyo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary" onClick={handleSubmit}>
              생성
            </Button>
          </div>
          </CardContent>
          <div className='flex flex-col gap-8'>
          <h2 className="text-left text-red-600 font-bold text-2xl mt-6">유저 목록</h2>
          <Card className="grid grid-cols-2 row-start-2 col-start-2 h-2/3 mr-8 px-4 py-4 gap-4">
            <Card className="h-[80px]">
              <CardContent>
                <p>유저1</p>
              </CardContent>
            </Card>
          </Card>
          </div>
          </Card>
        </div>

      </div>
    </div>
    </form>
    )
  }

