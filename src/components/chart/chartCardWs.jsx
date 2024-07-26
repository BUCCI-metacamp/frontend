// src/components/chart/chartCard.jsx
import React, { Component } from 'react';
import io from 'socket.io-client';
import { Area, AreaChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

class ChartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isConnected: false,
      socket: null
    };
  }

  componentDidMount() {
    const { roomName } = this.props;
    if (roomName) {
      const newSocket = io('http://192.168.0.64:3001', {
        withCredentials: true
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
        this.setState({ isConnected: true });
        newSocket.emit('request_join_room', roomName);
      });

      const eventName = roomName === 'edukit' ? 'edukit_data' : 'production_data';

      newSocket.on(eventName, (receivedData) => {
        console.log('Received data:', receivedData);
        this.updateGraphData(receivedData, roomName);
      });

      this.setState({ socket: newSocket });
    }
  }

  componentWillUnmount() {
    const { socket } = this.state;
    if (socket) {
      socket.disconnect();
    }
  }

  updateGraphData = (receivedData, roomName) => {
    let updatedData = [];
    if (roomName === 'edukit') {
      updatedData = receivedData.map(item => ({
        time: item.timestamp,
        value: item.value
      }));
    } else if (roomName === 'production') {
      updatedData = receivedData.map(item => ({
        time: item.timestamp,
        pass: item.passCount,
        fail: item.failCount
      }));
    }
    this.setState({ data: updatedData });
  };

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
