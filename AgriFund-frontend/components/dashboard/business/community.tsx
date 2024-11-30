"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  MapPin,
  MessageSquare,
  HandHeart
} from "lucide-react"

const partnerships = [
  {
    id: 1,
    name: "Green Valley Farm",
    type: "Farmer",
    location: "Sacramento, CA",
    status: "Active",
    startDate: "2024-01-15",
    description: "Regular supplier of organic vegetables"
  },
  {
    id: 2,
    name: "Agricultural Institute",
    type: "Education",
    location: "Davis, CA",
    status: "Active",
    startDate: "2024-02-01",
    description: "Student internship program"
  },
  {
    id: 3,
    name: "Local Food Bank",
    type: "Community",
    location: "Sacramento, CA",
    status: "Upcoming",
    startDate: "2024-04-01",
    description: "Monthly food donation program"
  }
]

const events = [
  {
    id: 1,
    name: "Farmers Market",
    date: "2024-04-15",
    location: "Central Park",
    participants: 25,
    status: "Upcoming"
  },
  {
    id: 2,
    name: "Agricultural Workshop",
    date: "2024-04-20",
    location: "Community Center",
    participants: 40,
    status: "Upcoming"
  }
]

export function BusinessCommunity() {
  return (
    <Tabs defaultValue="partnerships" className="space-y-6">
      <TabsList>
        <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
        <TabsTrigger value="events">Community Events</TabsTrigger>
        <TabsTrigger value="impact">Social Impact</TabsTrigger>
      </TabsList>

      <TabsContent value="partnerships" className="space-y-6">
        <div className="grid gap-6">
          {partnerships.map((partnership) => (
            <Card key={partnership.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{partnership.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{partnership.location}</span>
                      <span>•</span>
                      <span>Started {partnership.startDate}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={partnership.status === "Active" ? "default" : "secondary"}
                  >
                    {partnership.status}
                  </Badge>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {partnership.description}
                </p>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="events" className="space-y-6">
        <div className="flex justify-end">
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{event.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.participants} Participants</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="w-full">Manage Event</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="impact" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Local Jobs Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+4 this quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Student Internships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Current placements</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Community Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Initiatives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Food Bank Donations",
                  date: "March 2024",
                  impact: "Supported 150 families"
                },
                {
                  title: "Agricultural Workshop",
                  date: "February 2024",
                  impact: "Trained 40 local farmers"
                },
                {
                  title: "Student Mentorship",
                  date: "January 2024",
                  impact: "Mentored 15 agriculture students"
                }
              ].map((initiative, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <HandHeart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{initiative.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {initiative.date} • {initiative.impact}
                    </p>
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