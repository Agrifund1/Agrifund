"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, TrendingUp, History } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Extended dummy data for farmer coins
const allFarmerCoins = [
  {
    id: 1,
    name: "Green Valley Farm",
    farmer: "John Smith",
    performance: 92,
    roi: "22%",
    trend: "+5.2%",
    totalValue: 50000,
    available: 15000,
    description: "Organic vegetable farm with sustainable practices",
    historicalPerformance: [
      { month: "Jan", value: 88 },
      { month: "Feb", value: 90 },
      { month: "Mar", value: 92 },
    ]
  },
  // Add more farmer coins...
]

function FarmerCoinCard({ coin }: { coin: typeof allFarmerCoins[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{coin.name}</CardTitle>
            <span className={`text-sm px-2 py-1 rounded-full bg-green-100 text-green-700`}>
              Score: {coin.performance}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Managed by {coin.farmer}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">{coin.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Available for Investment</span>
              <span>${coin.available.toLocaleString()} / ${coin.totalValue.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Expected ROI</p>
              <p className="font-medium">{coin.roi}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Performance Trend</p>
              <p className="font-medium text-green-500">{coin.trend}</p>
            </div>
          </div>

          <Button className="w-full">Invest Now</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function FarmerCoins() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("performance")

  const filteredCoins = allFarmerCoins
    .filter(coin =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.farmer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "performance") return b.performance - a.performance
      if (sortBy === "roi") return parseFloat(b.roi) - parseFloat(a.roi)
      if (sortBy === "available") return b.available - a.available
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search farmer coins..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance">Performance Score</SelectItem>
              <SelectItem value="roi">Expected ROI</SelectItem>
              <SelectItem value="available">Available Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredCoins.map((coin) => (
          <FarmerCoinCard key={coin.id} coin={coin} />
        ))}
      </motion.div>
    </div>
  )
} 