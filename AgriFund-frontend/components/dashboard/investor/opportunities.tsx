"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"


interface LoanOpportunity {
  id: string
  farmerName: string
  amount: number
  purpose: string
  duration: number
  interestRate: number
  funded: number
  status: 'active' | 'funded' | 'completed'
}

const mockOpportunities: LoanOpportunity[] = [
  {
    id: "1",
    farmerName: "John Smith",
    amount: 5000,
    purpose: "Purchase of irrigation equipment",
    duration: 12,
    interestRate: 8,
    funded: 65,
    status: 'active'
  },
  {
    id: "2",
    farmerName: "Maria Garcia",
    amount: 3000,
    purpose: "Seed purchase for next season",
    duration: 6,
    interestRate: 7,
    funded: 40,
    status: 'active'
  }
]

export function LoanOpportunities() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockOpportunities.map((opportunity) => (
        <Card key={opportunity.id}>
          <CardHeader>
            <CardTitle>{opportunity.farmerName}</CardTitle>
            <CardDescription>
              Loan Amount: ${opportunity.amount.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Purpose</p>
              <p>{opportunity.purpose}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{opportunity.funded}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p>{opportunity.duration} months</p>
              </div>
              <div>
                <p className="text-muted-foreground">Interest Rate</p>
                <p>{opportunity.interestRate}%</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {/* <Button className="w-full">Invest Now</Button> */}
            <Link href="https://sui-investment.vercel.app/">
              <Button size="lg" className="gap-2">
                Invest Now
              </Button>
            </Link>

          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 