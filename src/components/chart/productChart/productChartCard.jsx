import React, { useState, useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@components/ui/chart";

const ProductChartCard = (props) => {
  const { data, dataKey } = props;

  const [chartData, setChartData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentTime(new Date());
  //     console.log('dataaaaaaaaaaaaaa', data);
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    if (data) {
      const formattedData = data.map((d) => {
        const newD = { ...d };
        newD.time = formatTime(new Date(d.time));
        return newD;
      });
      const emptyData = Array.from({ length: 1 }, () => ({
        time: '',
        totalCount: 0,
        failRatio: 0
      }));
      setChartData(formattedData.length ? formattedData : emptyData);
      // const formattedData = {
      //   time: formatTime(currentTime),
      //   totalFailCount: data.totalFailCount,
      //   totalPassCount: data.totalPassCount,
      //   failCount: data.failCount
      // };

      // setChartData(prevData => {
      //   const newChartData = [...prevData];
      //   if (newChartData.length === 0 || newChartData[newChartData.length - 1].time !== formattedData.time) {
      //     newChartData.push(formattedData);
      //   }
      //   return newChartData.slice(-5);
      // });
    }
  }, [data]);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const ChartConfig = {
    totalFailCount: {
      label: "Total Fail Count",
      color: "#cc527a",
    },
    totalPassCount: {
      label: "Total Pass Count",
      color: "#e8175d",
    },
    failCount: {
      label: "Fail Count",
      color: "#6453b2",
    },
  };

  return (
    <div className="flex justify-center mt-12">
      <ChartContainer config={ChartConfig} className="h-full w-11/12">
        <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="time"
            tickLine={true}
            axisLine={true}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 8)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey={dataKey}
            type="monotone"
            stroke={
              dataKey == "totalFailCount"
                ? "var(--color-totalFailCount)"
                : dataKey == "failCount"
                ? "var(--color-failCount)"
                : "var(--color-totalPassCount)"
            }
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default ProductChartCard;
