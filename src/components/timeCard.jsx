import React, { useState, useEffect } from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Dice1 } from 'lucide-react';

const TimeCard = (props) => {

    const { title, data } = props;
    const [chipColor, setChipColor] = useState()

    useEffect(() => {
      if (data && data.length > 0) {
        const chipColor = data.filter(item => item.name === "No2SensingMemory");
        if (chipColor.length > 0) setChipColor(chipColor[0]?.value);
      }
    }, [data]);

    const DiceScale = () => {
      Dice1;
    };
    

    return (
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
      </CardHeader>
      <CardContent>
        <div className='flex flex-row justify-between'>
          <CardTitle>{title}</CardTitle>
          <div className='flex flex-row gap-16 mr-16'>
            <div className="flex gap-3 items-center ">
              <p>칩 색상 : </p> 
              {{chipColor} ? (
                <div className="bg-red-500 w-[16px] h-[16px] rounded-sm"/>
              ) : (
                <div className='bg-slate-300 w-[16px] h-[16px] rounded-sm'/>
              )}
            </div>
            <div className="flex flex-row gap-3">
              <p>주사위 눈 : </p><div><Dice1/></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    )
  }

  export default TimeCard
