"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export function PortfolioPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Portfolio</CardTitle>
        <CardDescription>Your active investments overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Invested</p>
              <p className="text-2xl font-bold">$3,500</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Investments</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Return Rate</p>
              <p className="text-2xl font-bold">7.5%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Payment Due</p>
              <p className="text-2xl font-bold">May 1</p>
            </div>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/investor/portfolio">View Full Portfolio</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 