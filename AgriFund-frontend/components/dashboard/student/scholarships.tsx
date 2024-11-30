"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, Clock, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const scholarships = [
  {
    id: 1,
    title: "Agricultural Innovation Scholarship",
    amount: 5000,
    deadline: "2024-05-15",
    requirements: "3.0 GPA, Agricultural Science Major",
    status: "Open",
    description: "For students pursuing innovative agricultural practices"
  },
  {
    id: 2,
    title: "Rural Development Grant",
    amount: 3000,
    deadline: "2024-05-30",
    requirements: "Rural background, Community involvement",
    status: "Open",
    description: "Supporting students from rural communities"
  },
  {
    id: 3,
    title: "Future Farmers Scholarship",
    amount: 4000,
    deadline: "2024-06-15",
    requirements: "Agriculture or related field",
    status: "Coming Soon",
    description: "For future agricultural leaders"
  }
]

export function StudentScholarships() {
  return (
    <div className="space-y-6">
      {/* Active Scholarships */}
      <Card>
        <CardHeader>
          <CardTitle>Your Active Scholarships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Merit Scholarship 2024</h3>
                  <p className="text-sm text-muted-foreground">Agricultural Science Program</p>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Disbursement Progress</span>
                  <span>$6,000 / $12,000</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Next Disbursement: May 1, 2024</span>
                  <span>Remaining: $6,000</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Scholarships */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((scholarship) => (
          <motion.div
            key={scholarship.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{scholarship.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{scholarship.description}</p>
                    </div>
                    <Badge variant={scholarship.status === "Open" ? "default" : "secondary"}>
                      {scholarship.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>Amount: ${scholarship.amount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Requirements:</p>
                    <p className="text-sm text-muted-foreground">{scholarship.requirements}</p>
                  </div>

                  <Button 
                    className="w-full"
                    disabled={scholarship.status !== "Open"}
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 