"use client"

import { motion } from "framer-motion"
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  PiggyBank,
  ChevronRight,
  Star,
  ArrowUpRight,
  LineChart
} from "lucide-react"
import { MetricsCard } from "@/components/dashboard/metrics-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoanCard } from "./loan-card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"

// Dummy data for loan requests
const loanRequests = [
  {
    id: 1,
    farmerName: "John Smith",
    amount: 5000,
    funded: 3200,
    purpose: "Purchase of Organic Seeds",
    performanceScore: 92,
    duration: "12 months",
    expectedROI: "15-18%"
  },
  {
    id: 2,
    farmerName: "Maria Garcia",
    amount: 8000,
    funded: 5500,
    purpose: "Irrigation System Upgrade",
    performanceScore: 88,
    duration: "18 months",
    expectedROI: "16-20%"
  },
  {
    id: 3,
    farmerName: "David Chen",
    amount: 3500,
    funded: 1200,
    purpose: "Greenhouse Construction",
    performanceScore: 85,
    duration: "12 months",
    expectedROI: "14-17%"
  }
]

// Top performing farmer coins
const topFarmerCoins = [
  {
    id: 1,
    name: "Green Valley Farm",
    performance: 92,
    roi: "22%",
    trend: "+5.2%"
  },
  {
    id: 2,
    name: "Sunrise Organics",
    performance: 88,
    roi: "19%",
    trend: "+4.8%"
  },
  {
    id: 3,
    name: "Highland Crops",
    performance: 86,
    roi: "18%",
    trend: "+4.1%"
  }
]

// Market insights
const marketInsights = [
  {
    title: "Agricultural Tech",
    trend: "+12%",
    description: "Growing demand in smart farming solutions"
  },
  {
    title: "Organic Farming",
    trend: "+8%",
    description: "Increasing market for organic produce"
  },
  {
    title: "Sustainable Practices",
    trend: "+15%",
    description: "Rising interest in eco-friendly farming"
  }
]

export function InvestorDashboardContent() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Total Investments"
          value="$45,231"
          icon={Wallet}
          trend={{ value: 12, label: "vs last month" }}
        />
        <MetricsCard
          title="Active Farmer Coins"
          value="23"
          icon={PiggyBank}
          trend={{ value: 8, label: "vs last month" }}
        />
        <MetricsCard
          title="ROI"
          value="18.2%"
          icon={TrendingUp}
          trend={{ value: 5, label: "vs last month" }}
        />
        <MetricsCard
          title="Farmers Supported"
          value="142"
          icon={Users}
          trend={{ value: 15, label: "vs last month" }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Performing Farmer Coins */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Top Performing Farmer Coins</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFarmerCoins.map((coin) => (
                <div key={coin.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{coin.name}</p>
                      <p className="text-sm text-muted-foreground">ROI: {coin.roi}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{coin.performance}%</p>
                    <p className="text-sm text-green-500">{coin.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Insights */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Market Insights</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              More <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <LineChart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{insight.title}</p>
                      <span className="text-sm text-green-500 flex items-center">
                        {insight.trend}
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="loans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="loans">Loan Opportunities</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="loans">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Featured Opportunities</h3>
              <Button variant="outline" className="gap-2">
                View All Opportunities
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loanRequests.map((loan) => (
                <LoanCard key={loan.id} loan={loan} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Investment Portfolio</CardTitle>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/investor/portfolio">View Full Portfolio</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Investment #{i}</h4>
                      <p className="text-sm text-muted-foreground">Current ROI: 17.5%</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/investor/portfolio">View Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 