import React, { useState } from "react"
import useSocket from '../hooks/useSocket';

import { Card } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/src/components/ui/tabs"

import TimeCard from "@/src/components/timeCard"
import UnitCard from "@/src/components/unitCard/unitCard"
import { SideNav } from "../components/sideNav"
import Header from "../components/header"
import Unit1Chart from "../components/chart/unitChart/unit1Chart";
import Unit2Chart from "../components/chart/unitChart/unit2Chart";
import Unit3DegreeChart from "../components/chart/unitChart/unit3DegreeChart";
import Unit3ZChart from "../components/chart/unitChart/unit3ZChart";




export default function Dashboard() {
  const { sensorData, socket } = useSocket('edukit');
  const [activeTab, setActiveTab] = useState('unit1');
  // console.log("senda",sensorData)


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-slate-200">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14  max-w-[1280px]">
        <Header/>
        <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="p-6 bg-slate-100">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div>
                <TimeCard
                  title="현 공정 소재 상태"
                  data={sensorData}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                <Unit1Chart 
                data={sensorData}
                />
                <Unit2Chart 
                data={sensorData}
                />
                <Unit3DegreeChart 
                data={sensorData}
                />
                <Unit3ZChart 
                data={sensorData}
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="unit1">반출 공정</TabsTrigger>
                    <TabsTrigger value="unit2">가공 공정</TabsTrigger>
                    <TabsTrigger value="unit3">분류 공정</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="unit1">
                  <UnitCard
                    title="반출 공정"
                    description="반출 공정에 대한 정보입니다."
                    type={activeTab}
                    data={sensorData}
                    option1="칩 적재 여부"
                    option1Value1="없음"
                    option1Value2="있음"
                    option2="푸셔 on/off"
                    option2Value1="on"
                    option2Value2="off"
                  />
                </TabsContent>
                <TabsContent value="unit2">
                  <UnitCard
                    title="가공 공정"
                    description="가공 공정에 대한 정보입니다."
                    type={activeTab}
                    data={sensorData}
                    option1="주사위 적재 여부"
                    option1Value1="없음"
                    option1Value2="있음"
                    option2="푸셔 on/off"
                    option2Value1="on"
                    option2Value2="off"
                    option3="칩 센서"
                    option3Value1="접근 확인"
                    option3Value2="접근 미확인"
                    option4="솔레노이드"
                    option4Value1="동작"
                    option4Value2="대기"
                  />
                </TabsContent>
                <TabsContent value="unit3">
                  <UnitCard
                    title="분류 공정"
                    description="분류 공정에 대한 정보입니다."
                    type={activeTab}
                    data={sensorData}
                    option1="칩 센서"
                    option1Value1="도착"
                    option1Value2="없음"
                    option2="그리퍼"
                    option2Value1="동작"
                    option2Value2="대기"
                    option3="로봇 z축"
                    option3Value1={(sensorData.filter(item => item.name === "No3Motor1Position")[0]?.value)}
                    option4="로봇 각도"
                    option4Value1={(sensorData.filter(item => item.name === "No3Motor2Position")[0]?.value)}
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