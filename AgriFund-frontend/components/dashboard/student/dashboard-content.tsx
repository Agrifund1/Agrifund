"use client"

import { motion } from "framer-motion"
import { GraduationCap, Book, Calendar, Award, Users, FileText, Bell } from "lucide-react"
import { MetricsCard } from "@/components/dashboard/metrics-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const dummyEducationResources = [
  { title: "Career Development Workshop", type: "Event", date: "2024-04-20" },
  { title: "Agricultural Science Study Guide", type: "Document", date: "Available Now" },
  { title: "Industry Mentorship Program", type: "Program", status: "Enrolling" },
]

const communityActivities = [
  { activity: "Local Farm Visit", date: "2024-04-15", status: "Upcoming" },
  { activity: "Student Research Project", date: "2024-04-30", status: "In Progress" },
  { activity: "Community Service", date: "2024-05-10", status: "Scheduled" },
]

export function StudentDashboardContent() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
        <Link href="/dashboard/student/scholarships">
          <Button size="lg" className="w-full sm:w-auto gap-2">
            <GraduationCap className="h-4 w-4" />
            Apply for Scholarship
          </Button>
        </Link>
        <Link href="/dashboard/student/loans">
          <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
            <FileText className="h-4 w-4" />
            Apply for Loan
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Scholarship Status"
          value="Active"
          icon={GraduationCap}
          description="Next disbursement in 30 days"
        />
        <MetricsCard
          title="Current Semester"
          value="2nd Year"
          icon={Calendar}
          description="Agricultural Science"
        />
        <MetricsCard
          title="Course Progress"
          value="75%"
          icon={Book}
          trend={{ value: 8, label: "vs last semester" }}
        />
        <MetricsCard
          title="Academic Score"
          value="3.8 GPA"
          icon={Award}
          trend={{ value: 5, label: "vs last semester" }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Educational Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyEducationResources.map((resource, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div>
                    <h4 className="font-semibold">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.type} • {resource.date}</p>
                  </div>
                  <Button variant="outline" size="sm">Access</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityActivities.map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{activity.activity}</h4>
                    <p className="text-sm text-muted-foreground">Due: {activity.date}</p>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    activity.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-700' :
                    activity.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {activity.status}
                  </span>
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
            {[
              { message: "Scholarship application under review", type: "scholarship" },
              { message: "New study resource available", type: "resource" },
              { message: "Upcoming community event registration", type: "community" },
            ].map((notification, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                <Bell className={`h-5 w-5 ${
                  notification.type === 'scholarship' ? 'text-green-500' :
                  notification.type === 'resource' ? 'text-blue-500' : 'text-yellow-500'
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