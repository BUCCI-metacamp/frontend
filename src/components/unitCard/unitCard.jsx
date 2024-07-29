import React, { Component } from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/src/components/ui/pagination"
import { Button } from "@/src/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"


export default class UnitCard extends Component {
  render() {
    const { title, description, option1, option2, option3, option4,option4Value, option5 } = this.props;

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
          <div className="grid gap-3">
              <p className="font-semibold">{option1}</p>
          </div>
          <Separator className="my-4" />
          <div>
            <p className="font-semibold">{option2}</p>
          </div>
          <Separator className="my-4" />
          <div>
            <p className="font-semibold">{option3}</p>
          </div>
          <Separator className="my-4" />
          <div>
            <p className="font-semibold">{option4}:{option4Value}</p>
          </div>
          <Separator className="my-4" />
          <div>
            <p className="font-semibold">{option5}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">November 23, 2023</time>
          </div>
        </CardFooter>
      </Card>
    )
  }
}
