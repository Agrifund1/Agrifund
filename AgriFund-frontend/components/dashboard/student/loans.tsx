"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function StudentLoans() {
  const loans = [
    {
      id: 1,
      type: "Education Loan",
      amount: "$10,000",
      status: "Active",
      interestRate: "4.5%",
      nextPayment: "2024-04-01",
      remainingBalance: "$8,500",
    },
    {
      id: 2,
      type: "Study Materials",
      amount: "$2,000",
      status: "Pending",
      interestRate: "3.5%",
      nextPayment: "-",
      remainingBalance: "$2,000",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Apply for New Loan</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Submit a new loan application for your educational needs
          </p>
          <Button className="w-full">Apply Now</Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Loan Calculator</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Calculate your potential loan payments
          </p>
          <Button variant="outline" className="w-full">Calculate</Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Payment History</h3>
          <p className="text-sm text-muted-foreground mb-4">
            View your past loan payments
          </p>
          <Button variant="outline" className="w-full">View History</Button>
        </Card>
      </div>

      {/* Active Loans Table */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Your Loans</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Next Payment</TableHead>
              <TableHead>Remaining Balance</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.type}</TableCell>
                <TableCell>{loan.amount}</TableCell>
                <TableCell>
                  <Badge variant={loan.status === "Active" ? "default" : "secondary"}>
                    {loan.status}
                  </Badge>
                </TableCell>
                <TableCell>{loan.interestRate}</TableCell>
                <TableCell>{loan.nextPayment}</TableCell>
                <TableCell>{loan.remainingBalance}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
} 