import React, { Component } from 'react'

import { Card, CardHeader, CardContent, CardTitle } from "@/src/components/ui/card"


export default class onTime extends Component {
  render() {
    const { onTime } = this.props;
    return (
      <Card>
        <CardHeader className="flex flex-row items-start bg-muted/50 p-5">
          <div className="grid gap-3">
            <CardTitle className="group flex items-center gap-2">
              공장 운영 시간
            </CardTitle>  
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <time>{onTime}</time>
        </CardContent>
      </Card>
    )
  }
}
