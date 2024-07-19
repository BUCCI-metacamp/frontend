import React, { Link } from 'react'
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
  }
]

export function ProductionLog() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNav/>
      <div className="flex flex-col sm:gap-8 sm:py-4 sm:pl-14 mt-20">
      {/* <div className="board-page"> */}
        <h2 className="text-center text-red-400 font-bold text-2xl">작업 일지</h2>
        <div className='flex justify-between px-12'>
          <Button variant="destructive">글쓰기</Button>
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
        <div className='px-10'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center font-bold text-lg bg-gray-300">게시글 번호</TableHead>
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
      </div>
    </div>
  )
}
