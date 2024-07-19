import React, { Component } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "/src/components/ui/card";

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@components/ui/chart"


class ProductChartCard extends Component {
  render() {
    const { chartData, chartConfig, totalStroke, xDataKey, yDataKey } = this.props;

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

