import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, CirclePlus, Copy, CreditCard, Dice1, File, Home, LineChart, ListFilter, MoreVertical, Package, Package2, PanelLeft, Pencil, Search, Settings, ShoppingCart, TableProperties, Truck, Users2, } from "lucide-react"

import { Badge } from "@/src/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/src/components/ui/breadcrumb"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/src/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/src/components/ui/dropdown-menu"
import { Input } from "@/src/components/ui/input"
import { Pagination, PaginationContent, PaginationItem, } from "@/src/components/ui/pagination"
import { Progress } from "@/src/components/ui/progress"
import { Separator } from "@/src/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/src/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/src/components/ui/tabs"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/components/ui/chart"
// import { SideNav } from "../components/nav/sideNav"

import ChartCard from "@/src/components/chartCard"
import TimeCard from "@/src/components/timeCard"
import UnitCard from "@/src/components/unitCard"

const ChartData = [
  { time: "1", desktop: 100 },
  { time: "2", desktop: 0 },
  { time: "3", desktop: 100 },
  { time: "4", desktop: 100 },
  { time: "5", desktop: 0 },
  { time: "6", desktop: 100 },
];

const ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
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
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* <SideNav /> */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="/placeholder-user.jpg"
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div>
              <TimeCard
                    title="현 공정 소재 상태"
                    chipColor={ChipColor}
                    diceScale={DiceScale}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              <ChartCard
                chartData={ChartData}
                chartConfig={ChartConfig}
                title="반출 공정"
                description="푸셔 기동 상태"
              />
              <ChartCard
                chartData={ChartData}
                chartConfig={ChartConfig}
                title="가공 공정"
                description="푸셔 기동 상태"
              />
              <ChartCard
                chartData={ChartData}
                chartConfig={ChartConfig}
                title="분류 공정"
                description="1축 기동 상태"
              />
              <ChartCard
                chartData={ChartData}
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
              </TabsContent>
              <TabsContent value="unit2">
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-3">
                  <CardTitle className="group flex items-center gap-2">
                    가공 공정
                  </CardTitle>
                  <CardDescription>가공 공정에 대한 정보입니다.</CardDescription>
                  
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

              </TabsContent>
            </Tabs>
          </div>
          <div>
          </div>
        </main>
      </div>
    </div>
  )
}
