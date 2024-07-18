import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import React, { Component } from 'react'

export default class timeCard extends Component {
  render() {
    const { title, chipColor, diceScale } = this.props;
    return (
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
          <div>
            <p>칩 색깔 : </p><p>{chipColor}</p>
          </div>
          <div>
            <p>주사위 눈 : </p><p>{diceScale}</p>
          </div>
      </CardContent>
    </Card>
    )
  }
}
