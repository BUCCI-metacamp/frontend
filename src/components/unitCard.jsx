import React, { Component } from 'react'

export default class unitCard extends Component {
  render() {
    // const { chartData, chartConfig, title, description } = this.props;

    return (
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-3">
            <CardTitle className="group flex items-center gap-2">
              반출 공정
            </CardTitle>
            <CardDescription>
              반출 공정에 대한 정보입니다.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
              <p className="font-semibold">모터 속도 : </p>
          </div>
          <Separator className="my-4" />
          <div>
            <p className="font-semibold">푸셔 on/off</p>
          </div>
          <Separator className="my-4" />
          <div>
            <p className="font-semibold">칩 적재 상태 : </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">November 23, 2023</time>
          </div>
          <Pagination className="ml-auto mr-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <Button size="icon" variant="outline" className="h-6 w-6">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="sr-only">Previous Order</span>
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button size="icon" variant="outline" className="h-6 w-6">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="sr-only">Next Order</span>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    )
  }
}
