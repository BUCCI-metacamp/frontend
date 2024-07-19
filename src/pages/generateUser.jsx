import { SideNav } from '@/src/components/sideNav'
import React, { Component } from 'react'
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"

import { Link } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@components/ui/select"

export function GenerateUser() {
    return (
      <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <SideNav />
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">유저 생성</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ID">아이디</Label>
              <Input
                id="ID"
                type="ID"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2 mb-10">
              <div className="flex items-center">
                <Label htmlFor="permission">권한</Label>
              </div>
              <div>
                <Select >
                  <SelectTrigger className="w-[350px]">
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
              생성
            </Button>
          </div>
        </div>
      </div>
    </div>
    )
  }

