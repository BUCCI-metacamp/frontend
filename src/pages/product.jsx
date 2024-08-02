import useSocket from '../hooks/useSocket';
import React, { useState, useEffect } from "react"
import { Card, CardTitle, CardHeader } from "@/src/components/ui/card"
import ProductChartCard from "@components/chart/productChart/productChartCard"
import { SideNav } from "../components/sideNav"
import Header from "../components/header";

export function Product() {
  const { sensorData, socket } = useSocket('production');

  // 상태 선언
  const [totalCnt, setTotalCnt] = useState(0)
  const [totalFailCnt, setTotalFailCnt] = useState(0)
  const [cnt, setCnt] = useState(0)
  const [failCnt, setFailCnt] = useState(0)
  const [failLog, setFailLog] = useState()
  const [failWhen, setFailWhen] = useState(() => {
    const savedFailWhen = localStorage.getItem('failWhen');
    return savedFailWhen ? new Date(savedFailWhen) : null;
  });
  const [passWhen, setPassWhen] = useState(() => {
    const savedPassWhen = localStorage.getItem('passWhen');
    return savedPassWhen ? new Date(savedPassWhen) : null;
  });
  const [prevSensorData, setPrevSensorData] = useState(null);

  useEffect(() => {
    // 처음 렌더링 시 prevSensorData를 설정하지 않고 return
    if (prevSensorData === null) {
      setPrevSensorData(sensorData);
      return;
    }

    // 상태 업데이트
    if (!isNaN(sensorData.totalPassCount)) {
      setTotalCnt(sensorData.totalPassCount);
    }
    if (!isNaN(sensorData.totalFailCount)) {
      setTotalFailCnt(sensorData.totalFailCount);
    }
    if (!isNaN(sensorData.passCount)) {
      setCnt(sensorData.passCount);
    }
    if (!isNaN(sensorData.failCount)) {
      setFailCnt(sensorData.failCount);
    }
    if (!isNaN(sensorData.failCountLog)) {
      setFailCnt(sensorData.failCount);
    }

    // 이전 데이터를 현재 데이터로 업데이트
    setPrevSensorData(sensorData);

    // 이전 데이터와 새로운 데이터를 비교하여 타임스탬프 설정
    if (prevSensorData.totalPassCount !== sensorData.totalPassCount) {
      console.log('Total Pass Count changed:', sensorData.totalPassCount);
    }
    if (prevSensorData.totalFailCount !== sensorData.totalFailCount) {
      console.log('Total Fail Count changed:', sensorData.totalFailCount);
    }
    if (prevSensorData?.passCount !== sensorData?.passCount !== '0') {
      console.log("prev: ", prevSensorData)
      console.log('Pass Count changed:', sensorData.passCount);
      const newPassWhen = new Date();
      localStorage.setItem('passWhen', newPassWhen.toString());
    }
    if (prevSensorData.failCount !== sensorData.failCount !== '0') {
      console.log('Fail Count changed:', sensorData.failCount);
      const newFailWhen = new Date();
      setFailWhen(newFailWhen);
      localStorage.setItem('failWhen', newFailWhen.toString());
    }
  }, [sensorData]);

  // 타임 포맷 함수
  const formatTime = (date) => {
    if (date !== null) {
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 max-w-[1280px]">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="p-6 bg-slate-100">
            <div className="grid grid-cols-8 grid-rows-5 gap-5 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8">
              <Card className="p-5 col-span-2 h-44 ">
                <div className='flex flex-row gap-3'>
                  <div className='bg-rose-400 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>양품 :</p><p className='text-2xl font-bold mt-3'>{cnt}</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <p className='text-slate-400'>발생 시간: {formatTime(passWhen)}</p>
                </div>
              </Card>
              <Card className="p-5 col-span-2 h-44">
                <div className='flex flex-row gap-3'>
                  <div className='bg-fuchsia-500 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>총 생산량 :</p><p className='text-2xl font-bold mt-3'>{totalCnt}</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <p className='text-slate-400'>정상</p>
                </div>
              </Card>
              <Card className="p-5 col-span-2 h-44">
                <div className='flex flex-row gap-3'>
                  <div className='bg-rose-400 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>불량 :</p><p className='text-2xl font-bold mt-3'>{failCnt}</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <p className='text-slate-400'>발생 시간: {formatTime(failWhen)}</p>
                </div>
              </Card>
              <Card className="p-5 col-span-2 h-44">
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
