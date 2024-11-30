"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface LoanRequest {
  id: number
  farmerName: string
  amount: number
  funded: number
  purpose: string
  performanceScore: number
  duration: string
  expectedROI: string
}

export function LoanCard({ loan }: { loan: LoanRequest }) {
  const [contribution, setContribution] = useState("")
  const progress = (loan.funded / loan.amount) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{loan.farmerName}</CardTitle>
            <span className={`text-sm px-2 py-1 rounded-full ${
              loan.performanceScore >= 85 ? 'bg-green-100 text-green-700' :
              loan.performanceScore >= 70 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              Score: {loan.performanceScore}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{loan.purpose}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>${loan.funded} of ${loan.amount}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">{loan.duration}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Expected ROI</p>
              <p className="font-medium">{loan.expectedROI}</p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Contribute</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Contribute to Loan</DialogTitle>
                <DialogDescription>
                  Support {loan.farmerName}'s agricultural project
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Contribution Amount ($)</p>
                  <Input
                    type="number"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    placeholder="Enter amount"
                    min={0}
                    max={loan.amount - loan.funded}
                  />
                  <p className="text-sm text-muted-foreground">
                    Maximum contribution: ${loan.amount - loan.funded}
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    // Handle contribution
                    console.log(`Contributing $${contribution} to loan ${loan.id}`)
                  }}
                  disabled={!contribution || Number(contribution) <= 0}
                >
                  Confirm Contribution
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </motion.div>
  )
} 