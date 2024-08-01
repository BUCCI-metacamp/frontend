import Header from '@/src/components/header'
import { SideNav } from '@/src/components/sideNav'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';



const BoardWrite = ({ isEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      fetchPost(id);
    }
  }, [isEdit, id]);

  const fetchPost = async (postId) => {
    try {
      const response = await getPosts();
      const post = response.data.result.find((p) => p.id == postId);
      setTitle(post.title);
      setContent(post.content);
      setPassword(post.password || ''); // 기존 비밀번호를 설정합니다.
      setIsPrivate(post.isPrivate);
    } catch (error) {
      console.error('Error fetching post', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password && !isEdit) {
      Swal.fire('Error', '비밀번호를 입력해야 합니다.', 'error');
      return;
    }

    const formData = {
      title,
      content,
      password,
      isPrivate,
    };

    try {
      if (isEdit) {
        await updatePost(id, formData);
        Swal.fire('수정 완료', '게시물이 수정되었습니다.', 'success');
      } else {
        await createPost(formData);
        Swal.fire('등록 완료', '게시물이 등록되었습니다.', 'success');
      }
      navigate('/board');
    } catch (error) {
      console.error('Error creating/updating post', error);
      Swal.fire('Error', '게시물 등록/수정 중 오류가 발생했습니다.', 'error');
    }
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-slate-200">
      <SideNav/>
      <div className="flex flex-col sm:py-4 sm:pl-14 mx-12 max-w-[1280px]">
        <Header/>
        <h2 className='text-2xl text-red-400 font-bold mt-8'>일지 작성</h2>
        <Card className="mt-6 bg-slate-100">
          <CardHeader>
            <p className='text-base font-bold'>제목</p>
            <CardDescription>오늘의 일지</CardDescription>
            <Input maxLength='100' onChange={(e) => setTitle(e.target.value)}/>
          </CardHeader>
        </Card>
        <Card className="mt-3 bg-slate-100">
          <CardHeader>
            <p className='text-base font-bold'>내용</p>
            <CardDescription>생산량, 재고, 특이사항 등</CardDescription>
            <Textarea className="h-56" onChange={(e) => setContent(e.target.value)}></Textarea>
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

export default BoardWrite;