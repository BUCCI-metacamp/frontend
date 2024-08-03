import React, { useState, useEffect } from "react";
import { SideNav } from "@components/sideNav";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@components/ui/table";
import Header from "@/src/components/header";
import { Card, CardContent } from "@/src/components/ui/card";

import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "@/src/apis/boardApi/board";
import PaginationSearch from "@/src/components/paginationSearch";
import { useNavigate } from "react-router-dom";

export function ProductionLog() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchType, setSearchType] = useState('title');
  const [searchQuery, setSearchQuery] = useState("");
  const [loginUser, setLoginUser] = useState(""); // 로그인 체크 상태
  const navigate = useNavigate();
  const [maxRows, setMaxRows] = useState(10);


  const handleWrite = (e) => {
    navigate("/board/write");
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchType, searchQuery])

  const fetchPosts = async () => {
    try {
      const query = {
        page: currentPage,
        limit: limit,
      };
      query[searchType] = searchQuery;
      const response = await getPosts(query);
      setPosts(response.data.data);
      setTotalPages(Math.ceil(response.data.totalCount / limit));
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const paginate = async (page) => {
    setCurrentPage(page);
  }

  const handleSearch = async (searchType, searchQuery) => {
    setSearchType(searchType);
    setSearchQuery(searchQuery.trim());
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-slate-200">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 max-w-[1280px]">
        <Header />
        <main className="grid flex-1 items-start gap-4 px-6 sm:py-0 md:gap-8">
          <Card className=" h-dvh bg-slate-100">
            <div className="flex flex-col gap-8 mr-4 mt-6 md:mx-8 sm:mx-12 xs: mx-16">
              <h2 className="text-left text-red-600 font-bold text-2xl">
                작업 일지
              </h2>
              <div className="flex justify-between">
                <Button variant="destructive" onClick={handleWrite}>
                  글쓰기
                </Button>
                <PaginationSearch
                  opt1="title"
                  opt2="content"
                  opt3="userName"
                  select1="제목"
                  select2="내용"
                  select3="작성자"
                  sendSearch={handleSearch}
                />
              </div>
              <Card>
                <div className="h-100">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center font-bold text-lg bg-gray-300 w-[100px]">
                          게시글 번호
                        </TableHead>
                        <TableHead className="text-center font-bold text-lg bg-gray-300">
                          제목
                        </TableHead>
                        <TableHead className="text-center font-bold text-lg bg-gray-300">
                          작성자
                        </TableHead>
                        <TableHead className="text-center font-bold text-lg bg-gray-300">
                          작성 시간
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.slice(0,maxRows).map((post) => (
                        <TableRow key={post.id} className="hover:cursor-pointer" onClick={() => {navigate(`/board/read/${post.id}`)}}>
                          <TableCell className="text-center">
                            {post.id}
                          </TableCell>
                          <TableCell className="text-center max-w-52">
                            {post.title}
                          </TableCell>
                          <TableCell className="text-center">
                            {post.author.name}
                          </TableCell>
                          <TableCell className="text-center">
                            {new Date(post.createdAt).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
              <div className="inline-flex mt-2 flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 mx-1 bg-inherit
                      ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-black font-bold"
                        : "bg-gray-200 text-gray-700"
                      }`}
                    >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
