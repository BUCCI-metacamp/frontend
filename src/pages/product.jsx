import useSocket from '../hooks/useSocket';
import React, { useState, useEffect } from "react"
import { Card, CardTitle, CardHeader } from "@/src/components/ui/card"
import ProductChartCard from "@components/chart/productChart/productChartCard"
import { SideNav } from "../components/sideNav"
import Header from "../components/header";

export function Product() {
  const { sensorData, socket } = useSocket("production");


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

  const [totalCountLog, setTotalCountLog] = useState([]);
  const [failRatioLog, setFailRatioLog] = useState([]);
  const [currentFailRatioLog, setCurrentFailRatioLog] = useState([]);

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
    if (typeof prevSensorData?.passCount === 'number' && prevSensorData?.passCount !== sensorData?.passCount) {
      // console.log("prev: ", prevSensorData)
      console.log('Pass Count changed:', sensorData.passCount);
      const newPassWhen = new Date();
      setPassWhen(newPassWhen);
      localStorage.setItem('passWhen', newPassWhen.toString());
    }

    if (typeof prevSensorData?.failCount === 'number' && prevSensorData?.failCount !== sensorData?.failCount) {
      console.log('Fail Count changed:', sensorData.failCount);
      const newFailWhen = new Date();
      setFailWhen(newFailWhen);
      localStorage.setItem('failWhen', newFailWhen.toString());
    }

    if (Array.isArray(sensorData.totalCountLog)) {
      const reverse = sensorData.totalCountLog?.slice().reverse();
      setTotalCountLog([...reverse]);
    } else {
      setTotalCountLog([]);
    }

    let totalMap = new Map(
      sensorData.totalCountLog
        ?.reverse()
        .map((item) => [item.time, item.totalCount || 0])
    );
    let failMap = new Map(
      sensorData.failCountLog
        ?.reverse()
        .map((item) => [item.time, item.totalCount || 0])
    );
    let failRatioArray = [];
    for (let time of totalMap.keys()) {
      if (failMap.has(time)) {
        // 같은 time을 가진 항목이 있으면 value를 계산
        failRatioArray.push({
          time: time,
          failRatio: (failMap.get(time) / totalMap.get(time)) * 100 || 0,
        });
      }
    }
    setFailRatioLog([...failRatioArray]);

    setCurrentFailRatioLog(sensorData?.currentFailCountRatioLog.slice(-5));
  }, [sensorData]);


  const formatTime = (date) => {
    if(date !== null ){
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return "00:00:00";
    }
  };
  

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#15103A]">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14  max-w-[1280px]">
        <Header/>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="p-6 bg-inherit border-0">
            <div className="grid grid-cols-8 gap-5 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8">
              <Card className="p-5 col-span-2 h-44 bg-[#262852] border-0">
                <div className='flex flex-row gap-3'>
                  <div className='bg-rose-400 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>양품 :</p><p className='text-2xl font-bold mt-3'>{cnt}</p>
                  </div>
                </div>
                <div className='mt-4 flex flex-row gap-2'>
                  <p className='text-slate-400'>발생 시간: </p>
                  { cnt >= 1 ?
                    (<p className='text-slate-400'>{formatTime(passWhen)}</p>) :
                    (<p className='text-slate-400'>00:00:00</p>)
                  }                
                </div>
              </Card>
              <Card className="p-5 col-span-2 h-44 bg-[#262852] border-0">
                <div className='flex flex-row gap-3'>
                  <div className='bg-fuchsia-500 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>불량 :</p><p className='text-2xl font-bold mt-3'>{failCnt}</p>
                  </div>
                </div>
                <div className='mt-4 flex flex-row gap-2'>
                  <p className='text-slate-400'>발생 시간: </p>
                  { failCnt >= 1 ?
                    (<p className='text-slate-400'>{formatTime(failWhen)}</p>) :
                    (<p className='text-slate-400'>00:00:00</p>)
                  }
                </div>
              </Card>
              <Card className="p-5 col-span-2 h-44 bg-[#262852] border-0">
                <div className='flex flex-row gap-3'>
                  <div className='bg-rose-400 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>총 생산량 :</p><p className='text-2xl font-bold mt-3'>{totalCnt}</p>
                  </div>
                </div>
                <div className='mt-4'>
                </div>
              </Card>
              <Card className="p-5 col-span-2 h-44 bg-[#262852] border-0">
                <div className='flex flex-row gap-3'>
                  <div className='bg-pink-400 h-[70px] w-[10px] rounded-full'/>
                  <div className=''>
                    <p className='font-bold text-slate-500'>총 불량 갯수 :</p><p className='text-2xl font-bold mt-3'>{totalFailCnt}</p>
                  </div>
                </div>
              </Card>
              </div>
              <div className='flex flex-row gap-4 mt-4'>
              <Card className="col-span-4 row-span-1 bg-[#262852] border-0 w-full">
                <CardHeader>
                  <h3 className="font-bold text-xl">총 생산량</h3>
                </CardHeader>
                <ProductChartCard
                  data={ totalCountLog }
                  dataKey="totalCount"
                />
              </Card>
              <Card className="col-span-2 row-span-1 bg-[#262852] border-0 w-full">
                <CardHeader>
                  <h3 className="font-bold text-lg">총 불량률</h3>
                </CardHeader>
                <ProductChartCard
                  className="auto-cols-max"
                  data={ failRatioLog }
                  dataKey="failRatio"
                />
              </Card>
              <Card className="col-span-2 row-span-1 bg-[#262852] border-0 w-full">
                <CardHeader>
                  <h3 className="font-bold text-lg">현 공정 불량률</h3>
                </CardHeader>
                <ProductChartCard
                  className="auto-cols-max"
                  data={ currentFailRatioLog }
                  dataKey="ratio"
                />
              </Card>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

// className="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"