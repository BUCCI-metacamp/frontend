import React, { useState, useEffect } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "/src/components/ui/card";

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@components/ui/chart"


const ProductChartCard = ({data}) => {

  const [chartData, setChartData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

    
    // currentTime 5초마다 갱신
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    // chartData 5초마다 갱신
    useEffect(() => {
      if (data.length > 0) {
        // data가 변경되었다면 갱신
        const cnt = filteredData.map(item => ({
          time: formatTime(currentTime),
          value: item.value ? 1 : 0
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
        <ChartContainer config={chartConfig}  className=" h-full w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xDataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey={yDataKey}
              type="monotone"
              stroke={totalStroke}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    );
  }


export default ProductChartCard;


{/* <Card>
<CardContent>
  <ChartContainer config={chartConfig} className="min-h-[100px] w-full">
    <AreaChart accessibilityLayer data={chartData}>
      <XAxis
        dataKey="time"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
      />
      <Area
        dataKey="desktop"
        type="step"
        fill="var(--color-desktop)"
        fillOpacity={0.4}
        stroke="var(--color-desktop)"
      />
    </AreaChart>
  </ChartContainer>
</CardContent>
</Card> */}

