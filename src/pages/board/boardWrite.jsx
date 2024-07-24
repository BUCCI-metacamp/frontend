import Header from '@/src/components/header'
import { SideNav } from '@/src/components/sideNav'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import React, { Component } from 'react'




export default class BoardWrite extends Component {
  render() {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <SideNav/>
        <div className="flex flex-col sm:py-4 sm:pl-14 mx-12 max-w-[1280px]">
          <Header/>
          <h2 className='text-2xl text-red-400 font-bold mt-8'>일지 작성</h2>
          <Card className="mt-6">
            <CardHeader>
              <p className='text-base font-bold'>제목</p>
              <CardDescription>오늘의 일지</CardDescription>
              <Input/>
            </CardHeader>
          </Card>
          <Card className="mt-3">
            <CardHeader>
              <p className='text-base font-bold'>내용</p>
              <CardDescription>생산량, 재고, 특이사항 등</CardDescription>
              <Textarea className="h-56"></Textarea>
            </CardHeader>
          </Card>
          <div className='flex flex-row justify-end py-6 gap-8'>
            <Button variant="outline">
              <a href='./productionLog'>취 소</a>
            </Button>
            <Button variant="destructive">
              <a href='./productionLog'>글쓰기</a>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
