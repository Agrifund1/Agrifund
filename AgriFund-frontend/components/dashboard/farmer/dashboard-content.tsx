import { motion } from "framer-motion"
import { Coins, TrendingUp, BookOpen, Bell, FileText } from "lucide-react"
import { MetricsCard } from "@/components/dashboard/metrics-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FarmerDashboardContent() {
  const dummyEducationResources = [
    { title: "Maximizing Crop Yield", type: "Video", duration: "15 mins", fileName: "MaximizingCropYield" },
    { title: "Maximizing Crop Yield", type: "Article", duration: "15 mins", fileName: "MaximizingCropYield" },
    { title: "Financial Management for Farmers", type: "Article", duration: "10 mins", fileName: "FinancialManagementforFarmers" },
    { title: "Sustainable Farming Practices", type: "Course", duration: "2 hours", fileName: "" },
  ]

  const notifications = [
    { message: "Upcoming payment due in 15 days", type: "payment" },
    { message: "Your Farmer Coin value increased by 5%", type: "coin" },
    { message: "New farming technique guide available", type: "education" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Link href="/dashboard/farmer/loan-application">
          <Button size="lg" className="gap-2">
            <FileText className="h-4 w-4" />
            Apply for New Loan
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricsCard
          title="Loan Status"
          value="75% Paid"
          icon={Coins}
          description="Next payment due in 15 days"
        />
        <MetricsCard
          title="Farmer Coin Status"
          value="92 FCP"
          icon={TrendingUp}
          description="Performance score: 92/100"
          trend={{ value: 5, label: "vs last month" }}
        />
        <MetricsCard
          title="Educational Progress"
          value="3 Courses"
          icon={BookOpen}
          description="2 certificates earned"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Loan Repayment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Loan</span>
                  <span className="text-sm text-muted-foreground">$12,000</span>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Paid: $9,000</span>
                  <span>Remaining: $3,000</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Payment History</h4>
                <div className="space-y-2">
                  {[
                    { date: "2024-03-01", amount: 1000 },
                    { date: "2024-02-01", amount: 1000 },
                    { date: "2024-01-01", amount: 1000 },
                  ].map((payment, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{payment.date}</span>
                      <span>${payment.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyEducationResources.map((resource, i) => (

                resource.type == 'Article' ?
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.type} • {resource.duration}</p>
                    </div>
                    {/* <Button onClick={() => onClickArticle(resource.fileName)} variant="outline" size="sm"></Button> */}
                    <Link href={`/dashboard/posts/${resource.fileName}`}>
                      <Button size="lg" className="gap-2">
                        Start
                      </Button>
                    </Link>
                  </div> :
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.type} • {resource.duration}</p>
                    </div>
                    {/* <Button variant="outline" size="sm">Start</Button> */}
                    <Link href="#">
                      <Button size="lg" className="gap-2">
                        Start
                      </Button>
                    </Link>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                <Bell className={`h-5 w-5 ${notification.type === 'payment' ? 'text-yellow-500' :
                  notification.type === 'coin' ? 'text-green-500' : 'text-blue-500'
                  }`} />
                <p className="text-sm">{notification.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 