"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, DollarSign, Calendar } from "lucide-react"

export function BusinessLoanManagement() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <Tabs defaultValue="active" className="space-y-6">
      <TabsList>
        <TabsTrigger value="active">Active Loans</TabsTrigger>
        <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
        <TabsTrigger value="history">Loan History</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Principal Amount</p>
                <p className="text-2xl font-bold">$50,000</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Interest Rate</p>
                <p className="text-2xl font-bold">8.5%</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Term Length</p>
                <p className="text-2xl font-bold">24 months</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Repayment Progress</span>
                <span>65%</span>
              </div>
              
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Upcoming Payments</h4>
              {[
                { date: "2024-04-01", amount: 2500 },
                { date: "2024-05-01", amount: 2500 },
                { date: "2024-06-01", amount: 2500 },
              ].map((payment, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{payment.date}</span>
                  </div>
                  <span>${payment.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="apply">
        <Card>
          <CardHeader>
            <CardTitle>New Loan Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loan Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="number" placeholder="Enter amount" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Term Length (months)</label>
                  <Input type="number" placeholder="Enter term length" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Purpose of Loan</label>
                  <Input placeholder="e.g., Inventory Purchase" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expected Revenue Impact</label>
                  <Input placeholder="e.g., 20% increase" />
                </div>
              </div>
              <Button className="w-full">Submit Application</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Loan History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  id: "L123",
                  amount: 30000,
                  date: "2023-01-15",
                  status: "Completed",
                  purpose: "Equipment Purchase"
                },
                {
                  id: "L122",
                  amount: 20000,
                  date: "2022-06-01",
                  status: "Completed",
                  purpose: "Inventory Expansion"
                }
              ].map((loan, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Loan #{loan.id}</p>
                    <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                    <p className="text-sm text-muted-foreground">{loan.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${loan.amount}</p>
                    <span className="text-sm text-green-500">{loan.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 