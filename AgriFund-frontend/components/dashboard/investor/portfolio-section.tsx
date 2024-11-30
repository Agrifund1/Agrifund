"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Clock, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FarmerCoin {
  id: number
  name: string
  amount: number
  performance: number
  trend: number
  lastUpdate: string
}

interface Loan {
  id: number
  farmer: string
  amount: number
  returnDate: string
  expectedReturn: number
  status: "active" | "pending" | "completed"
}

const farmerCoins: FarmerCoin[] = [
  {
    id: 1,
    name: "Green Valley Farm",
    amount: 5000,
    performance: 22.5,
    trend: 5.2,
    lastUpdate: "2 hours ago"
  },
  // Add more farmer coins...
]

const activeLoans: Loan[] = [
  {
    id: 1,
    farmer: "John Smith",
    amount: 2000,
    returnDate: "2024-06-15",
    expectedReturn: 2400,
    status: "active"
  },
  // Add more loans...
]

export function PortfolioSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Farmer Coins Portfolio */}
      <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-background">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Farmer Coins Portfolio</span>
            <Button variant="outline" size="sm">View All</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {farmerCoins.map((coin) => (
            <div key={coin.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{coin.name}</h4>
                  <p className="text-sm text-muted-foreground">${coin.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center ${coin.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.trend >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    <span>{Math.abs(coin.trend)}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Last updated {coin.lastUpdate}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Loans */}
      <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-background">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Active Loans</span>
            <Button variant="outline" size="sm">View All</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeLoans.map((loan) => (
            <div key={loan.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{loan.farmer}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Return by {loan.returnDate}</p>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Expected return: ${loan.expectedReturn.toLocaleString()}</p>
                      <p>Principal: ${loan.amount.toLocaleString()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>${loan.amount.toLocaleString()}</span>
                </div>

              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
} 