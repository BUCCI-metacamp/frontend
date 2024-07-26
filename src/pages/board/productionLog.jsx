import React, { Link, useState, useEffect } from 'react'
import { SideNav } from '@components/sideNav'
import { Button } from '../../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table"
import Header from '@/src/components/header'
import { Card, CardContent } from '@/src/components/ui/card'

import { createPost, getPosts, updatePost, deletePost} from '@/src/apis/boardApi/board'
import Search from '@/src/components/chart/search'

  export function ProductionLog() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // 모든 게시물을 저장하기 위한 상태
  // const [searchType, setSearchType] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [loginUser, setLoginUser] = useState(''); // 로그인 체크 상태

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setLoginUser(response.data.user.userId);
      setPosts(response.data.result);
      setAllPosts(response.data.result); // 모든 게시물을 저장
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  
// const posts = [
//   {
//     number: "1",
//     title: "React Hooks",
//     author: "John Doe",
//     date: "2022-01-01",
//   },
//   {
//     number: "2",
//     title: "React Hooks",
//     author: "John Doe",
//     date: "2022-01-01",
//   },
//   {
//     number: "3",
//     title: "React Hooks",
//     author: "John Doe",
//     date: "2022-01-01",
//   },
//   {
//     number: "4",
//     title: "React Hooks",
//     author: "John Doe",
//     date: "2022-01-01",
//   },
//   {
//     number: "5",
//     title: "React Hooks",
//     author: "John Doe",
//     date: "2022-01-01",
//   },
//   {
//     number: "6",
//     title: "React Hooks",
//     author: "John Doe",
//     date: "2022-01-01",
//   },
//   {
//     number: "7",
//     title: "React Hooks",
//     author: "John Doe",
//     date: "2022-01-01",
//   }
// ]


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-slate-200">
      <SideNav/>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 max-w-[1280px]">
        <Header/>
        <main className='grid flex-1 items-start gap-4 px-6 sm:py-0 md:gap-8'>
          <Card className=' h-dvh bg-slate-100'>
            <CardContent className="flex flex-col gap-8">
          <h2 className="text-left text-red-600 font-bold text-2xl mt-6">작업 일지</h2>
            <div className='flex justify-between'>
              <Button variant="destructive">
                <a href='./write'>글쓰기</a>
              </Button>
              <Search
                opt1="title"
                opt2="content"
                opt3="author"
                select1="제목"
                select2="내용"
                select3="작성자"
              />  
            </div>
            <Card>
              <div className='h-100'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center font-bold text-lg bg-gray-300 w-[100px]">게시글 번호</TableHead>
                    <TableHead className="text-center font-bold text-lg bg-gray-300">제목</TableHead>
                    <TableHead className="text-center font-bold text-lg bg-gray-300">작성자</TableHead>
                    <TableHead className="text-center font-bold text-lg bg-gray-300">작성 시간</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                  <TableRow>
                    <TableCell className="text-center">{post.number}</TableCell>
                    <TableCell className="text-center max-w-52">{post.title}</TableCell>
                    <TableCell className="text-center">{post.author}</TableCell>
                    <TableCell className="text-center">{post.date}</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </Card>

            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
