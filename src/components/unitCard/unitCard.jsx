import React, { Component, useState, useEffect } from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/src/components/ui/pagination"
import { Button } from "@/src/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"



const UnitCard = (props) => {

  const { title, description, type,
    option1, option1Value1, option1Value2,
    option2, option2Value1, option2Value2,
    option3, option3Value1, option3Value2,
    option4, option4Value1, option4Value2,
    data } = props;


  const [opt1, setOpt1] = useState()
  const [opt2, setOpt2] = useState()
  const [opt3, setOpt3] = useState()
  const [opt4, setOpt4] = useState()


  useEffect(() => {
    if (type === 'unit1') {
      if (data && data.length > 0) {
        const filteredOpt1 = data.filter(item => item.name === 'No1ChipEmpty');
        if (filteredOpt1.length > 0) setOpt1(filteredOpt1[0].value);
        const filteredOpt2 = data.filter(item => item.name === 'No1Push');
        if (filteredOpt2.length > 0) setOpt2(filteredOpt2[0].value);
      }
    } else if (type === 'unit2') {
      if (data && data.length > 0) {
        const filteredOpt1 = data.filter(item => item.name === 'No2CubeFull');
        if (filteredOpt1.length > 0) setOpt1(filteredOpt1[0].value);
        const filteredOpt2 = data.filter(item => item.name === 'No2InPoint');
        if (filteredOpt2.length > 0) setOpt2(filteredOpt2[0].value);
        const filteredOpt3 = data.filter(item => item.name === 'No2Chip');
        if (filteredOpt3.length > 0) setOpt3(filteredOpt3[0].value);
        const filteredOpt4 = data.filter(item => item.name === 'No2Sol');
        if (filteredOpt4.length > 0) setOpt4(filteredOpt4[0].value);
      }
    } else if (type === 'unit3') {
      if (data && data.length > 0) {
        const filteredOpt1 = data.filter(item => item.name === 'No3ChipArrival');
        if (filteredOpt1.length > 0) setOpt1(filteredOpt1[0].value);
        const filteredOpt2 = data.filter(item => item.name === 'No3Gripper');
        if (filteredOpt2.length > 0) setOpt2(filteredOpt2[0].value);
        const filteredOpt3 = data.filter(item => item.name === 'No3Motor1Position');
        if (filteredOpt3.length > 0) setOpt3(filteredOpt3[0].value);
        const filteredOpt4 = data.filter(item => item.name === 'No3Motor2Position');
        if (filteredOpt4.length > 0) setOpt4(filteredOpt4[0].value);
      }
    }
  }, [type, data]);

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-3">
          <CardTitle className="group flex items-center gap-2">
            {title}
          </CardTitle>  
          <CardDescription>
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        { option1 ?  
        <div className="gap-3 flex flex-row">
            <p className="font-semibold">{option1} : </p> {opt1 ? <p> {option1Value1}</p> : <p> {option1Value2}</p>}
        </div> : <></>
        }
        
        { option2 ?  
        <div className="gap-3">
          <Separator className="my-4" />
          <div className="gap-3 flex flex-row">
            <p className="font-semibold">{option2} : </p> {opt2 ? <p> {option2Value1}</p> : <p> {option2Value2}</p>}
          </div>
        </div> : <></>
        }
        { option3 ?  
        <div className="gap-3">
          <Separator className="my-4" />
          <div className="gap-3 flex flex-row">
            <p className="font-semibold">{option3} :</p> {opt3 ? <p>{option3Value1}</p> : <p>{option3Value2}</p>}
          </div>
        </div> : <></>
        }
        { option4 ?  
        <div className="gap-3">
          <Separator className="my-4" />
          <div className="gap-3 flex flex-row">
            <p className="font-semibold">{option4} :</p> {opt4 ? <p>{option4Value1}</p> : <p>{option4Value2}</p>}
          </div>
        </div> : <></>
        }
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  )
}

export default UnitCard