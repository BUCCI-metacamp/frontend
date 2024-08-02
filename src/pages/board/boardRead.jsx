import Header from '@/src/components/header'
import { SideNav } from '@/src/components/sideNav'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import React, { Component, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPost } from '@/src/apis/boardApi/board';

const BoardRead = ({ posts }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  const fetchPost = async (id) => {
    const response = await getPost(id);
    setPost(response.data);
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-slate-200">
      <SideNav/>
      <div className="flex flex-col sm:py-4 sm:pl-14 mx-12 max-w-[1280px]">
        <Header/>
        <h2 className='text-2xl text-red-400 font-bold mt-8'>일지</h2>
        <Card className="mt-6 bg-slate-100">
          <CardHeader>
            <p className='text-base font-bold'>제목</p>
            <CardDescription>{post.title}</CardDescription>
          </CardHeader>
        </Card>
        {post.startTime && (<Card className="mt-3 bg-slate-100">
          <CardHeader>
            <p className='text-base font-bold'>시작 시간</p>
            <CardDescription>{post.startTime}</CardDescription>
          </CardHeader>
          <CardHeader>
            <p className='text-base font-bold'>가동 시간</p>
            <CardDescription>{post.uptime}</CardDescription>
          </CardHeader>
          <CardHeader>
            <p className='text-base font-bold'>최종 작업 시간</p>
            <CardDescription>{post.finalTime}</CardDescription>
          </CardHeader>
          <CardHeader>
            <p className='text-base font-bold'>양품</p>
            <CardDescription>{post.good || 0}</CardDescription>
          </CardHeader>
          <CardHeader>
            <p className='text-base font-bold'>불량</p>
            <CardDescription>{post.bad || 0}</CardDescription>
          </CardHeader>
          <CardHeader>
            <p className='text-base font-bold'>합계</p>
            <CardDescription>{post.good || 0 + post.bad || 0}</CardDescription>
          </CardHeader>
        </Card>)}
        <Card className="mt-3 bg-slate-100">
          <CardHeader>
            <p className='text-base font-bold'>내용</p>
            <CardDescription>{post.content}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
export default BoardRead;