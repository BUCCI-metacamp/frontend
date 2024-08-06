import React, { useState, useEffect } from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Dice1, Dice1Icon, Dice2Icon, Dice3Icon, Dice4Icon, Dice5Icon, Dice6Icon, DicesIcon } from 'lucide-react';

const TimeCard = (props) => {

    const { title, data } = props;
    const [chipColor, setChipColor] = useState()
    const [diceData, setDiceData] = useState()

    useEffect(() => {
      if (data && data.length > 0) {
      const chipColor = data.filter(item => item.name === "No2SensingMemory");
      if (chipColor.length > 0) setChipColor(chipColor[0]?.value);
      const diceData = data.filter(item => item.name === "DiceValue");
      if (diceData.length > 0) setDiceData(diceData[0]?.value);
      }
    }, [data]);

    return (
      <Card className="sm:col-span-2 bg-[#262852] border-0 p-4" x-chunk="dashboard-05-chunk-0">
      <CardContent className="mt-6">
        <div className='grid grid-cols-3 justify-between'>
          <CardTitle className="text-white">{title}</CardTitle>
          <div className='flex flex-row gap-24 col-span-2 justify-center'>
            <div className="flex gap-3 items-center ">
              <p className='text-white'>칩 색상 : </p> 
              { chipColor ? (
                <div className='bg-slate-300 rounded-sm w-[32px] h-[32px] md :'/>
              ) : (
                <div className="bg-red-500 rounded-sm w-[32px] h-[32px]"/>
              )}
            </div>
            <div className="flex flex-row gap-3 items-center">
              <p className='text-white'>주사위 눈 : </p> 
              <div>
                { 
                  (diceData === '1') ? <Dice1Icon className="w-[80px] h-[80px]"/> : 
                  (diceData === '2') ? <Dice2Icon className="w-[80px] h-[80px]"/> :
                  (diceData === '3') ? <Dice3Icon className="w-[80px] h-[80px]"/> :
                  (diceData === '4') ? <Dice4Icon className="w-[80px] h-[80px]"/> :
                  (diceData === '5') ? <Dice5Icon className="w-[80px] h-[80px]"/> :
                  (diceData === '6') ? <Dice6Icon className="w-[80px] h-[80px]"/> :
                  <DicesIcon className="w-[80px] h-[80px] bg-white rounded-md"/>
                }
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    )
  }

  export default TimeCard
