"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const coinData = [
  { date: '2024-01', value: 85 },
  { date: '2024-02', value: 88 },
  { date: '2024-03', value: 92 },
]

const insightsList = [
  { title: "Current Value", value: "92 FCP", change: "+5%" },
  { title: "Market Rank", value: "#123", change: "↑ 10" },
  { title: "Trading Volume", value: "1,234 FCP", change: "+12%" },
]

export function FarmerCoinInsights() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {insightsList.map((insight, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insight.value}</div>
              <p className={`text-sm ${insight.change.includes('+') ? 'text-green-500' : 'text-blue-500'}`}>
                {insight.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coin Value History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={coinData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 