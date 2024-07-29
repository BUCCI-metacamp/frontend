import React, { useState, useEffect } from "react"
import useSocket from '../hooks/useSocket';

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
import BooleanChart from "../components/chart/boolChart";


const ChipColor = () => {
  console.log('Create New Order clicked');
  // 필요한 로직 추가
};

const DiceScale = () => {
  Dice1;
};



export default function Dashboard() {
  const { sensorData, socket } = useSocket();
  const No1ChipEmpty = sensorData.find(item => item.name === "No1ChipEmpty")?.value;
  console.log("111111", No1ChipEmpty)

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
                  chipColor={ChipColor}
                  diceScale={DiceScale}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                <BooleanChart 
                data={sensorData}
                />
                <BooleanChart 
                data={sensorData}
                />
                <BooleanChart 
                data={sensorData}
                />
                <BooleanChart 
                data={sensorData}
                />
              </div>
              <Tabs defaultValue="unit1">
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
                    option1="모터 속도"
                    option2="푸셔 on/off"
                    option3="칩 적재 여부"
                    option4="전방 센서 상태"
                    option4Value={No1ChipEmpty}
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