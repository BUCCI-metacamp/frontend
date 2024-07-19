import { Card, CardTitle, CardHeader } from "@/src/components/ui/card"


import ProductChartCard from "@components/chart/productChartCard"
import { SideNav } from "../components/sideNav"


const ChartData = [
  { time: "1", total: 10},
  { time: "2", total: 20},
  { time: "3", total: 30},
  { time: "4", total: 40},
  { time: "5", total: 50},
  { time: "6", total: 60},
];

const DefectiveChartData = [
  { time: "1", defectiveRatio: 5},
  { time: "2", defectiveRatio: 6},
  { time: "3", defectiveRatio: 10},
  { time: "4", defectiveRatio: 11},
  { time: "5", defectiveRatio: 15},
  { time: "6", defectiveRatio: 20},
];

const ProcessChartData = [
  { cnt: "1", defective: 0 },
  { cnt: "2", defective: 0 },
  { cnt: "3", defective: 0 },
  { cnt: "4", defective: 1 },
  { cnt: "5", defective: 1 },
]

const ChartConfig = {
  total: {
    label: "Total",
    color: "#cc527a",
  },
  defectiveRatio: {
    label: "DefectiveRatio",
    color: "#e8175d",
  },
  defective: {
    label: "Defective",
    color: "#6453b2",
  }
};

export function Product() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-slate-200">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="p-4 bg-slate-100">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid grid-cols-4 grid-rows-4 gap-5">
              <Card className="p-5">
                <p>양품 :</p>
              </Card>
              <Card className="p-5">
                <p>총 양품 갯수 :</p>
              </Card>
              <Card className="p-5">
                <p>불량 :</p>
              </Card>
              <Card className="p-5">
                <p>총 불량 갯수 :</p>
              </Card>
              <Card className="col-span-3 row-span-2">
                <CardHeader>
                  <CardTitle>총 생산량</CardTitle>
                </CardHeader>
                <ProductChartCard
                  xDataKey="time"
                  yDataKey="total"
                  chartData={ChartData}
                  chartConfig={ChartConfig}
                  totalStroke={ChartConfig.total.color}
                  title="총 생산량"
                />
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>총 불량</CardTitle>
                </CardHeader>
                <ProductChartCard
                  xDataKey="time"
                  yDataKey="defectiveRatio"
                  chartData={DefectiveChartData} 
                  chartConfig={ChartConfig}
                  totalStroke={ChartConfig.defectiveRatio.color}
                />
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>현 공정 불량</CardTitle>
                </CardHeader>
                <ProductChartCard className="auto-cols-max"
                  xDataKey="cnt"
                  yDataKey="defective"
                  chartData={ProcessChartData}
                  chartConfig={ChartConfig}
                  totalStroke={ChartConfig.defective.color}
                />
              </Card>
            </div>
          </div>
          </Card>
        </main>
      </div>
    </div>
  )
}

// className="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"