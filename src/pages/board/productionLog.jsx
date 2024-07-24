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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@components/ui/select"
import { Input } from "@components/ui/input"
import Header from '@/src/components/header'
import { Card, CardContent } from '@/src/components/ui/card'

// import {} from ''


  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/reports')
  //     .then(response => {
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       console.error("There was an error fetching the posts!", error);
  //     });
  // }, []);

  // const handleSearch = () => {
  //   if (searchQuery.trim() === '') {
  //     setPosts(allPosts); // 검색어가 없으면 모든 게시물을 표시
  //   } else {
  //     const filteredPosts = allPosts.filter(post => {
  //       if (searchType === 'title') {
  //         return post.title.includes(searchQuery);
  //       } else if (searchType === 'content') {
  //         return post.content.includes(searchQuery);
  //       } else if (searchType === 'author') {
  //         return post.name.includes(searchQuery);
  //       }
  //       return false;
  //     });
  //     setPosts(filteredPosts);
  //   }
  // };


const posts = [
  {
    number: "1",
    title: "React Hooks",
    author: "John Doe",
    date: "2022-01-01",
  },
  {
    number: "2",
    title: "React Hooks",
    author: "John Doe",
    date: "2022-01-01",
  },
  {
    number: "3",
    title: "React Hooks",
    author: "John Doe",
    date: "2022-01-01",
  },
  {
    number: "4",
    title: "React Hooks",
    author: "John Doe",
    date: "2022-01-01",
  },
  {
    number: "5",
    title: "React Hooks",
    author: "John Doe",
    date: "2022-01-01",
  },
  {
    number: "6",
    title: "React Hooks",
    author: "John Doe",
    date: "2022-01-01",
  },
  {
    number: "7",
    title: "React Hooks",
    author: "John Doe",
    date: "2022-01-01",
  }
]

export function ProductionLog() {
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
              <div className="flex justify-center gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="제목" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="{}">제목</SelectItem>
                    <SelectItem value="작성자">작성자</SelectItem>
                    <SelectItem value="내용">내용</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
                <Input
                  type="text"
                  placeholder="검색어를 입력하세요"
                />
                <Button>검색</Button>
              </div>
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
                    <TableCell className="text-center">{post.title}</TableCell>
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
