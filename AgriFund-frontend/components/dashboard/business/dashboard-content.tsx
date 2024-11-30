"use client"

import { motion } from "framer-motion"
import { Store, Users, TrendingUp, HandHeart, ShoppingBag, Calendar, FileText, GraduationCap } from "lucide-react"
import { MetricsCard } from "@/components/dashboard/metrics-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BusinessDashboardContent() {
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="flex justify-end gap-4">
        <Link href="/dashboard/business/loan-management">
          <Button size="lg" className="gap-2">
            <FileText className="h-4 w-4" />
            Apply for Business Loan
          </Button>
        </Link>
        <Link href="/dashboard/business/marketplace">
          <Button size="lg" variant="outline" className="gap-2">
            <Store className="h-4 w-4" />
            Visit Marketplace
          </Button>
        </Link>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Active Partnerships"
          value="24"
          icon={Store}
          trend={{ value: 10, label: "vs last month" }}
        />
        <MetricsCard
          title="Monthly Revenue"
          value="$45,231"
          icon={TrendingUp}
          trend={{ value: 12, label: "vs last month" }}
        />
        <MetricsCard
          title="Inventory Status"
          value="85%"
          icon={ShoppingBag}
          description="Well stocked"
        />
        <MetricsCard
          title="Community Impact"
          value="156"
          icon={HandHeart}
          description="People supported"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Loan Status */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Loan</span>
                  <span className="text-sm text-muted-foreground">$50,000</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Paid: $32,500</span>
                  <span>Remaining: $17,500</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Payment Schedule</h4>
                {[
                  { date: "2024-04-01", amount: 2500, status: "Upcoming" },
                  { date: "2024-03-01", amount: 2500, status: "Paid" },
                  { date: "2024-02-01", amount: 2500, status: "Paid" },
                ].map((payment, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span>{payment.date}</span>
                    <div className="flex items-center gap-2">
                      <span>${payment.amount}</span>
                      <span className={payment.status === "Paid" ? "text-green-500" : "text-yellow-500"}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Community Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: "Local Farmer Partnership",
                  description: "Sourcing fresh produce from 12 local farmers",
                  metric: "12 partnerships",
                  icon: Users
                },
                {
                  title: "Student Internships",
                  description: "Providing practical experience to agriculture students",
                  metric: "5 positions",
                  icon: GraduationCap
                },
                {
                  title: "Community Events",
                  description: "Upcoming farmer's market participation",
                  metric: "Apr 15, 2024",
                  icon: Calendar
                }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="text-sm font-medium">{item.metric}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 