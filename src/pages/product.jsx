import useSocket from '../hooks/useSocket';
import React, { useState, useEffect } from "react"

import { Card, CardTitle, CardHeader } from "@/src/components/ui/card"

import ProductChartCard from "@components/chart/productChart/productChartCard"
import { SideNav } from "../components/sideNav"
import Header from "../components/header";

export function Product() {
  const { sensorData, socket } = useSocket('production');

  // console.log("pro", sensorData)
  const [totalCnt, setTotalCnt] = useState()
  const [totalFailCnt, setTotalFailCnt] = useState()
  const [cnt, setCnt] = useState()
  const [failCnt, setFailCnt] = useState()
  const [failWhen, setFailWhen] = useState(null)

  useEffect(() => {
    setTotalCnt(sensorData.totalPassCount)
    setTotalFailCnt(sensorData.totalFailCount)
    setCnt(sensorData.passCount)
    setFailCnt(sensorData.failCount)
  }, [sensorData]);
  
  useEffect(() => {
    // 타임스탬프를 기록하는 함수
    const logTimestamp = () => {
      
      setFailWhen(new Date());
    };
    // `data.count`가 변경될 때마다 타임스탬프를 찍음
    logTimestamp();
  }, []);

  const formatTime = (date) => {
    if(date !== null ){
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return '00:00:00';
    }
  };
  

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-slate-200">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14  max-w-[1280px]">
        <Header/>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="p-6 bg-slate-100">
            <div className="grid grid-cols-8 grid-rows-5 gap-5 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8">
              <Card className="p-5 col-span-2 h-[150px]">
                <div className='flex flex-row gap-3'>
                  <div className='bg-rose-400 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>양품 :</p><p className='text-2xl font-bold mt-3'>{cnt}</p>
                    
                  </div>
                </div>
                <div className='mt-4'>
                  <p className='text-slate-400'>정상</p>
                </div>
              </Card>
              <Card className="p-5 col-span-2 h-[150px]">
                <div className='flex flex-row gap-3'>
                  <div className='bg-fuchsia-500 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>총 양품 갯수 :</p><p className='text-2xl font-bold mt-3'>{totalCnt}</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <p className='text-slate-400'>정상</p>
                </div>
              </Card>
              <Card className="p-5 col-span-2 h-[150px]">
                <div className='flex flex-row gap-3'>
                  <div className='bg-rose-400 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>불량 :</p><p className='text-2xl font-bold mt-3'>{failCnt}</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <p className='text-slate-400'>발생 시간 : {formatTime(failWhen)}</p>
                </div>
              </Card>
              <Card className="p-5 col-span-2 h-[150px]">
              <div className='flex flex-row gap-3'>
                <div className='bg-pink-400 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>총 불량 갯수 :</p><p className='text-2xl font-bold mt-3'>{totalFailCnt}</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <p className='text-slate-400'>정상</p>
                </div>
              </Card>
              <Card className="col-span-5 row-span-4">
                <CardHeader>
                  <h3 className='font-bold text-xl'>총 생산량</h3>
                </CardHeader>

                <ProductChartCard
                  data={sensorData}
                  dataKey="totalPassCount"
                />
              </Card>
              <Card className="col-span-3 row-span-2">
                <CardHeader>
                  <h3 className='font-bold text-lg'>총 불량</h3>
                </CardHeader>
                <ProductChartCard className="auto-cols-max"
                  data={sensorData}
                  dataKey="totalFailCount"
                />
              </Card>
              <Card className="col-span-3 row-span-2">
                <CardHeader>
                  <h3 className='font-bold text-lg'>현 공정 불량</h3>
                </CardHeader>
                <ProductChartCard className="auto-cols-max"
                  data={sensorData}
                  dataKey="failCount"
                />
              </Card>
            </div>

          </Card>
        </main>
      </div>
    </div>
  )
}

// className="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"