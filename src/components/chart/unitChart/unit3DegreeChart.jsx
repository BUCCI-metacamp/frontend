import React, { useState, useEffect } from 'react';
import { XAxis, Area, AreaChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

const ChartConfig = {
  value: {
    label: "Value",
    color: "#cc527a",
  }
};

const Unit3DegreeChart = ({ data }) => {

  
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

    
    // data가 변경될 때 filtered 갱신
    useEffect(() => {
      if (data && data.length > 0) {
        const filtered = data.filter(item => item.name === 'No3Motor2Position');
        setFilteredData(filtered);
      }
    }, [data]);
  


  // currentTime 5초마다 갱신
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // chartData 5초마다 갱신
  useEffect(() => {
    if (filteredData.length > 0) {
      // data가 변경되었다면 갱신
      const formattedData = filteredData.map(item => ({
        time: formatTime(currentTime),
        value: item.value
      }));

      // chartData에 데이터 추가
      setChartData(prevData => {
        // chartData가 비어있다면, formattedData를 불러와서 초기화
        if (prevData.length === 0) {
          return formattedData;
        }

        // 시간이 변경되었다면 갱신
        const newChartData = [...prevData];
        if (newChartData.length > 0 && newChartData[newChartData.length - 1].time !== formattedData[0].time) {
          newChartData.push(formattedData[0]);
        }

        // 최근 5개 값만 가짐
        return newChartData.slice(-5);
      });
    }
  }, [currentTime, filteredData]);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  if (!filteredData || filteredData.length === 0) {
    return <div>Loading...</div>;
  }


  return (
    <div>
    <Card>
      <CardHeader className="pb-2">
        <div className='flex flex-row justify-between items-center'>
        <CardTitle className="text-2xl">분류 공정</CardTitle>
        { data.filter(item => item.name === "No3PowerState")[0].value ? 
        (
          <div className='bg-red-200 w-[30px] h-[20px] flex items-center justify-center rounded'>
            <p>on</p>
          </div>
        ) : (
          <div className='bg-slate-100 w-[30px] h-[20px] flex items-center justify-center rounded'>
            <p>off</p>
          </div>
        ) }
        </div>
        <CardDescription>분류 공정 로봇 팔 각도</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="flex justify-between">
            <div className="flex flex-col">
            <div className='flex justify-center'>
              {(filteredData[0].value > 0) ? (
                <div className='bg-red-500 w-[16px] h-[16px] rounded-sm'/>
              ) : (
                <div className='bg-slate-300 w-[16px] h-[16px] rounded-sm'/>
              )}
              </div>
              <div>
                동작
              </div>
            </div>
            <div className="flex flex-col">
            <div className='flex justify-center'>
            {(filteredData[0].value == '0') ? (
                <div className='bg-red-500 w-[16px] h-[16px] rounded-sm'/>
              ) : (
                <div className='bg-slate-300 w-[16px] h-[16px] rounded-sm'/>
              )}
              </div>
              <div>
                정지
              </div>
            </div>
          </div>
      </CardContent>
      <CardFooter>
      <ChartContainer config={ChartConfig} className="max-h-[100px] w-full">
            <AreaChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="time"
                tickLine={true}
                axisLine={false}
                tickFormatter={(value) => value.slice(3, 8)}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent hideLabel />}
              />
              <Area
                dataKey="value"
                type="step"
                fill="var(--color-value)"
                fillOpacity={0.4}
                stroke="var(--color-value)"
              />
            </AreaChart>
          </ChartContainer>
      </CardFooter>
    </Card>
  </div>
  );
};

export default Unit3DegreeChart;
