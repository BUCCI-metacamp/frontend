import Header from '@/src/components/header'
import { SideNav } from '@/src/components/sideNav'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPost } from '@/src/apis/boardApi/board';

import { useNavigate } from "react-router-dom"
import { deletePost } from '@/src/apis/boardApi/board'



const BoardRead = ({ posts }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);


  
const navigate = useNavigate();

const handleCancelClick = (e) => {
  navigate(-1);
}

  const handleDeleteClick = async (e) => {
    try{
    const id = post.id;
    await deletePost(id);
    alert("삭제되었습니다.")
    navigate(`/board/productionLog`); 
    } catch(err){
    }
  }

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
    <div className="flex min-h-screen w-full flex-col bg-[#15103A]">
      <SideNav/>
      <div className="flex flex-col sm:py-4 sm:pl-14 mx-12 max-w-[1280px]">
        <Header/>
        <div className="items-start px-6 sm:py-0">
          <h2 className='text-2xl text-red-400 font-bold mt-8'>일지</h2>
          <Card className=' bg-inherit border-0 mt-8 text-white'>
            <div className="p-4 border-b-2">
              <p className="font-medium text-3xl">{post.title}</p>
              <p className="text-md italic mt-2">작성자: {post.author.name}</p>
            </div>
          {post.startTime && (
            <Card className="p-4 m-4 bg-[#262852] border-0" >
              <div className="grid grid-rows-2 grid-cols-3 gap-4">
                <div className="gap-4">
                  <p className="text-slate-500 font-semibold">시작 시간</p>
                  <p className="text-sm italic text-white">{post.startTime}</p>
                </div>
                <div>
                  <p className=" text-slate-500 font-semibold">가동 시간</p>
                  <p className="text-sm italic text-white">{post.uptime}</p>
                </div>
                <div>
                  <p className=" text-slate-500 font-semibold">최종 작업 시간</p>
                  <p className="text-sm italic text-white">{post.finalTime}</p>
                </div>
                <div>
                  <p className=" text-slate-500 font-semibold">양품</p>
                  <p className="text-sm italic text-white">{post.good || 0}</p>
                </div>
                <div>
                  <p className=" text-slate-500 font-semibold">불량</p>
                  <p className="text-sm italic text-white">{post.bad || 0}</p>
                </div>
                <div>
                  <p className=" text-slate-500 font-semibold">합계</p>
                  <p className="text-sm italic text-white">{post.good || 0 + post.bad || 0}</p>
                </div>
              </div>
            </Card>
          )}

            <div className="p-4 border-t-2">
              <p className="font-bold text-lg mb-2">내용</p>
              <Card className='h-max min-h-56 p-4 bg-slate-400 border-0'>{post.content}</Card>
            </div>
          </Card>
          <div className="flex flex-row justify-end py-6 gap-8">
            <Button variant="outline" onClick={handleCancelClick}>목록</Button>
            { localStorage.getItem('userRole') == 'admin' ? 
              <Button variant="destructive" onClick={handleDeleteClick}>삭제</Button> : <></>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardRead;