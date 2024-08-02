import Header from "@/src/components/header";
import { SideNav } from "@/src/components/sideNav";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createPost } from "@/src/apis/boardApi/board";
import { getProductData } from "../../apis/boardApi/board";

const BoardWrite = ({ isEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [productData, setProductData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancelClick = (e) => {
    navigate(-1);
  }

  const fetchData = async () => {
    const response = await getProductData();
    const eTime = new Date(response.data?.endTime || Date.now()).getTime();
    const sTime = new Date(response.data?.uptime || Date.now()).getTime();
    const differenceInMillis = (eTime - sTime) / 1000;

    const hours = Math.floor(differenceInMillis / (1000 * 60 * 60));
    const minutes = Math.floor(
      (differenceInMillis % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((differenceInMillis % (1000 * 60)) / 1000);
    const formattedTime = `${hours}시간 ${minutes}분 ${seconds}초`;
    setProductData({
      startTime: new Date(response.data?.uptime || Date.now()).toLocaleString(),
      uptime: formattedTime,
      finalTime: new Date(
        response.data?.endTime || Date.now()
      ).toLocaleString(),
      good: response.data?.good || 0,
      bad: response.data?.bad || 0,
      total: response.data?.good || 0 + response.data?.bad || 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: title,
      content: content,
      startTime: productData.startTime || null,
      uptime: productData.uptime || null,
      finalTime: productData.finalTime || null,
      good: productData.good || null,
      bad: productData.bad || null,
    };

    try {
      await createPost(formData);
      navigate("/board/productionLog");
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-slate-200">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 max-w-[1280px]">
        <Header />
        <div className="items-start sm:py-0 px-6">
          <h2 className="text-2xl text-red-400 font-bold mt-8">일지 작성</h2>
          <Card className="mt-6 bg-slate-100">
            <CardHeader>
              <p className="font-bold text-lg">제목</p>
              <CardDescription>전달 사항 등이 있다면 기록해주세요.</CardDescription>
              <Input maxLength="100" onChange={(e) => setTitle(e.target.value)} />
            </CardHeader>
          </Card>
          <Card className="mt-3 bg-slate-100">
            <CardHeader>
              <p className="text-lg font-bold ">생산 정보</p>
              <div className="grid grid-rows-2 grid-cols-3 gap-4">
                <div className="gap-4">
                  <p className="text-slate-500 font-semibold">시작 시간</p>
                  <p className="text-sm italic">{productData?.startTime || ''}</p>
                </div>
                <div>
                  <p className=" text-slate-500 font-semibold">가동 시간</p>
                  <p className="text-sm italic">{productData?.uptime || ''}</p>
                </div>
                <div>
                  <p className=" text-slate-500 font-semibold">최종 작업 시간</p>
                  <p className="text-sm italic">{productData?.finalTime || ''}</p>
                </div>
                <div>
                  <p className=" text-slate-500 font-semibold">양품</p>
                  <p className="text-sm italic">{productData?.good || ''}</p>
                </div>
                <div>
                  <p className=" text-slate-500 font-semibold">불량</p>
                  <p className="text-sm italic">{productData?.bad || 0}</p>
                </div>
                <div>
                  <p className=" text-slate-500 font-semibold">합계</p>
                  <p className="text-sm italic">{productData?.total || ''}</p>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="mt-3 bg-slate-100">
            <CardHeader>
              <p className="text-lg font-bold">내용</p>
              <CardDescription>생산량, 재고, 특이사항 등</CardDescription>
              <Textarea
                className="h-56 fix"
                onChange={(e) => setContent(e.target.value)}
              ></Textarea>
            </CardHeader>
          </Card>
          <div className="flex flex-row justify-end py-6 gap-8">
            <Button variant="outline" onClick={handleCancelClick}>취소</Button>
            <Button variant="destructive" onClick={handleSubmit}>
              글쓰기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardWrite;
