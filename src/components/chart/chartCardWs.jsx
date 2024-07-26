// src/components/chart/chartCard.jsx
import React, { Component } from 'react';
import { Area, AreaChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

class ChartCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isConnected: true,
      socket: null
    };
  }

  render() {
    const { title, description, chartConfig } = this.props;
    const { data, isConnected } = this.state;

    return (
      <div>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex flex-col justify-center">
                <input type="checkbox" />
                <div>
                  동작
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <input type="checkbox" />
                <div>
                  전진
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <input type="checkbox" />
                <div>
                  후진
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {isConnected ? (
              <ChartContainer config={chartConfig} className="max-h-[100px] w-full">
                <AreaChart accessibilityLayer data={data}>
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
                    dataKey="value"
                    type="step"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div>연결되지 않음</div>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default ChartCard;
