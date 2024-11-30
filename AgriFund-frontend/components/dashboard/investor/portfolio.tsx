"use client"

import { motion } from "framer-motion"
import { 
  TrendingUp, 
  ArrowUpRight, 
  ChevronRight,
  LineChart,
  PiggyBank,
  Coins,
  ArrowRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Sample data for active loans
const activeLoans = [
  {
    id: 1,
    farmerName: "John Smith",
    investedAmount: 5000,
    totalAmount: 8000,
    purpose: "Organic Seeds Purchase",
    roi: "15.5%",
    duration: "12 months",
    status: "On Track",
    nextPayment: "2024-04-15",
    performanceScore: 92
  },
  {
    id: 2,
    farmerName: "Maria Garcia",
    investedAmount: 3000,
    totalAmount: 5000,
    purpose: "Irrigation System",
    roi: "17.2%",
    duration: "18 months",
    status: "Ahead of Schedule",
    nextPayment: "2024-04-20",
    performanceScore: 95
  }
]

// Sample data for farmer coins
const farmerCoins = [
  {
    id: 1,
    name: "Green Valley Farms",
    holdings: 500,
    value: 12500,
    performance: {
      daily: "+2.5%",
      weekly: "+8.2%",
      monthly: "+15.5%"
    },
    trend: [65, 70, 68, 74, 78, 82, 85],
    score: 92
  },
  {
    id: 2,
    name: "Sunrise Organics",
    holdings: 300,
    value: 8250,
    performance: {
      daily: "+1.8%",
      weekly: "+6.5%",
      monthly: "+12.8%"
    },
    trend: [60, 65, 70, 68, 72, 75, 78],
    score: 88
  }
]

export function InvestorPortfolio() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="loans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="loans">Active Loans</TabsTrigger>
          <TabsTrigger value="farmercoins">Farmer Coins</TabsTrigger>
        </TabsList>

        <TabsContent value="loans" className="space-y-4">
          <div className="grid gap-4">
            {activeLoans.map((loan) => (
              <Card key={loan.id}>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{loan.farmerName}</h3>
                      <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Status:</span>
                        <span className="text-green-500">{loan.status}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Investment Progress</span>
                          <span>${loan.investedAmount} / ${loan.totalAmount}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>Next Payment:</span>
                        <span className="font-medium">{loan.nextPayment}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-medium">ROI: {loan.roi}</span>
                      </div>
                      <p className="text-sm">Duration: {loan.duration}</p>
                      <p className="text-sm">Performance Score: {loan.performanceScore}/100</p>
                    </div>

                    <div className="flex flex-col justify-center gap-2">
                      <Button className="w-full">View Details</Button>
                      <Button variant="outline" className="w-full">Add Investment</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end">
            <Button asChild>
              <Link href="/dashboard/investor/opportunities">
                Browse More Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="farmercoins" className="space-y-4">
          <div className="grid gap-4">
            {farmerCoins.map((coin) => (
              <Card key={coin.id}>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{coin.name}</h3>
                      <div className="flex items-center gap-2">
                        <PiggyBank className="h-4 w-4 text-primary" />
                        <span className="font-medium">{coin.holdings} Coins</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Value: ${coin.value.toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Performance</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Daily</span>
                          <span className="text-green-500">{coin.performance.daily}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Weekly</span>
                          <span className="text-green-500">{coin.performance.weekly}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Monthly</span>
                          <span className="text-green-500">{coin.performance.monthly}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Trend</h4>
                      <div className="h-20 flex items-end gap-1">
                        {coin.trend.map((value, i) => (
                          <div
                            key={i}
                            className="bg-primary/20 hover:bg-primary/30 rounded-t w-full"
                            style={{ height: `${value}%` }}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-center">
                        Performance Score: {coin.score}/100
                      </p>
                    </div>

                    <div className="flex flex-col justify-center gap-2">
                      <Button className="w-full">Buy More Coins</Button>
                      <Button variant="outline" className="w-full">View Analytics</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/investor/opportunities">
                Support More Farmers
                <Coins className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/investor/farmer-coins">
                Explore More Coins
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 