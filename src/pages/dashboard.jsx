import React, { useState, useEffect } from "react"
import io from 'socket.io-client';

import { Dice1, ListFilter } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/src/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/src/components/ui/tabs"

import ChartCard from "@/src/components/chart/chartCardWs"
import TimeCard from "@/src/components/timeCard"
import UnitCard from "@/src/components/unitCard/unitCard"
import { SideNav } from "../components/sideNav"
import Header from "../components/header"
// import WebSocketChart from "../components/chart/WebsocketChart";

  // class dashboard extends Component {
  
  // componentWillUnmount() {
  //   const { socket } = this.state;
  //   if (socket) {
  //     socket.disconnect();
  //   }
  // }

//   updateGraphData = (receivedData, roomName) => {
//     let updatedData = [];
//     if (roomName === 'edukit') {
//       updatedData = receivedData.map(item => ({
//         time: item.timestamp,
//         value: item.value
//       }));
//     } else if (roomName === 'production') {
//       updatedData = receivedData.map(item => ({
//         time: item.timestamp,
//         pass: item.passCount,
//         fail: item.failCount
//       }));
//     }
//     this.setState({ data: updatedData });
//   };
// }





const ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "#cc527a",
  }
};



const ChipColor = () => {
  console.log('Create New Order clicked');
  // 필요한 로직 추가
};

const DiceScale = () => {
  Dice1;
};

export function Dashboard() {
  
  const [token, setToken] = useState('');
  const [roomName, setRoomName] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState([]);
  let b2i;
  const [chartData, setChartData] = useState({
    labels: [],
    values: []
  })

  const ConnectSocket = ({ isConnected, setIsConnected }) => {
    useEffect(() => {
      const roomName = "edukit";
      const token = localStorage.getItem("token");
      const newSocket = io('http://158.247.241.162:3001', {
        withCredentials: false,
        query: { token },
      });
  
      newSocket.on('connect', () => {
        console.log('Connected to server');
        setIsConnected(true);
        newSocket.emit('request_join_room', roomName);
      });
  
      const eventName = roomName === 'edukit' ? 'edukit_data' : 'production_data';
  
      newSocket.on(eventName, (receivedData) => {
        // console.log('Received data:', receivedData);
        setData(receivedData);
        console.log("datatatata", data[1].value)
        updateChartData(data);
        // if(data[1].value == false){
        //   b2i = 0
        // } else {
        //   b2i = 100
        // }
        // console.log(b2i)
        // return b2i;
        // 여기서 receivedData를 처리하는 로직을 추가할 수 있습니다.
      });
  
      // 컴포넌트가 언마운트될 때 소켓 연결을 닫습니다.
      return () => {
        newSocket.close();
      };
    }, []); // 빈 배열은 이 효과가 컴포넌트 마운트 시 한 번만 실행됨을 의미합니다.
  
    return (
      <div>
        {isConnected ? "연결됨" : "연결되지 않음"}
      </div>
    );
  };

  // const ChartData = [
  //   { time: "1", desktop: b2i },
  //   { time: "2", desktop: b2i },
  //   { time: "3", desktop: b2i },
  //   { time: "4", desktop: b2i },
  //   { time: "5", desktop: b2i },
  //   { time: "6", desktop: b2i },
  // ];
  const updateChartData = (data) => {
    const labels = data.map(item => item.name);
    const values = data.map(item => item.value);

    setChartData({
        labels: labels,
        values: values
    });
};

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-slate-200">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14  max-w-[1280px]">
        <Header/>
        <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="p-6 bg-slate-100">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="flex gap-4">
                <ConnectSocket isConnected={isConnected} setIsConnected={setIsConnected} />
                <button onClick={() => setIsConnected(true)}>연결</button>
              </div>
              <div className="bg-slate-300 h-fit">
                <ul>
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <li key={item.tagId}>{item.name} ({item.tagId}) ({item.value.toString()})</li>
                  ))
                ) : (
                  <li>No data available</li>
                )}
                </ul>
              </div>
              <div>
                <TimeCard
                      title="현 공정 소재 상태"
                      chipColor={ChipColor}
                      diceScale={DiceScale}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                {/* <WebSocketChart/> */}
                <ChartCard
                  chartData={chartData}
                  chartConfig={ChartConfig}
                  title="반출 공정"
                  description="푸셔 기동 상태"
                />
                <ChartCard
                  token={token}
                  roomName={roomName}
                  chartData={chartData}
                  chartConfig={ChartConfig}
                  title="가공 공정"
                  description="푸셔 기동 상태"
                />
                <ChartCard
                  token={token}
                  roomName={roomName}
                  chartData={chartData}
                  chartConfig={ChartConfig}
                  title="분류 공정"
                  description="1축 기동 상태"
                />
                <ChartCard
                  token={token}
                  roomName={roomName}
                  chartData={chartData}
                  chartConfig={ChartConfig}
                  title="분류 공정"
                  description="2축 기동 상태"
                />
              </div>
              <Tabs defaultValue="unit1">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="unit1">반출 공정</TabsTrigger>
                    <TabsTrigger value="unit2">가공 공정</TabsTrigger>
                    <TabsTrigger value="unit3">분류 공정</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Fulfilled
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Declined
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Refunded
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <TabsContent value="unit1">
                  <UnitCard
                    title="반출 공정"
                    description="반출 공정에 대한 정보입니다."
                    option1="모터 속도"
                    option2="푸셔 on/off"
                    option3="칩 적재 여부"
                    option4="전방 센서 상태"
                    option5="후방 센서 상태"
                  />
                </TabsContent>
                <TabsContent value="unit2">
                  <UnitCard
                    title="가공 공정"
                    description="가공 공정에 대한 정보입니다."
                    option1="모터 속도"
                    option2="푸셔 on/off"
                    option3="칩 센서"
                    option4="솔레노이드"
                    option5="주사위 적재 여부"
                  />
                </TabsContent>
                <TabsContent value="unit3">
                  <UnitCard
                    title="분류 공정"
                    description="분류 공정에 대한 정보입니다."
                    option1="칩 센서"
                    option2="그리퍼"
                    option3="로봇 z축"
                    option4="로봇 각도"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
