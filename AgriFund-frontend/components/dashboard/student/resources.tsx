"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  BookOpen,
  Video,
  FileText,
  Download,
  Search,
  Calendar,
  GraduationCap,
  BookMarked,
  ExternalLink
} from "lucide-react"

const studyMaterials = [
  {
    id: 1,
    title: "Agricultural Science Fundamentals",
    type: "Course Material",
    format: "PDF",
    size: "2.5 MB",
    lastUpdated: "2024-03-15",
    category: "Core Subject"
  },
  {
    id: 2,
    title: "Sustainable Farming Practices",
    type: "Video Lecture",
    duration: "45 mins",
    instructor: "Dr. Sarah Johnson",
    category: "Specialization"
  },
  {
    id: 3,
    title: "Farm Management Guide",
    type: "E-Book",
    format: "PDF",
    size: "5.2 MB",
    lastUpdated: "2024-03-10",
    category: "Business"
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: "Career Fair: Agricultural Sector",
    date: "2024-04-20",
    time: "10:00 AM",
    location: "Virtual",
    type: "Career"
  },
  {
    id: 2,
    title: "Research Methodology Workshop",
    date: "2024-04-25",
    time: "2:00 PM",
    location: "Room 201",
    type: "Academic"
  }
]

const careerResources = [
  {
    id: 1,
    title: "Agricultural Career Guide",
    type: "Career Planning",
    description: "Comprehensive guide to careers in agriculture",
    status: "New"
  },
  {
    id: 2,
    title: "Resume Templates",
    type: "Job Search",
    description: "Specialized templates for agricultural positions"
  },
  {
    id: 3,
    title: "Interview Preparation",
    type: "Career Development",
    description: "Industry-specific interview questions and tips"
  }
]

export function StudentResources() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-8" />
        </div>
        <Button>
          <BookMarked className="mr-2 h-4 w-4" />
          My Saved Resources
        </Button>
      </div>

      <Tabs defaultValue="materials" className="space-y-6">
        <TabsList>
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="career">Career Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-4">
          {studyMaterials.map((material) => (
            <Card key={material.id}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    {material.type === "Course Material" ? (
                      <FileText className="h-8 w-8 text-blue-500" />
                    ) : material.type === "Video Lecture" ? (
                      <Video className="h-8 w-8 text-purple-500" />
                    ) : (
                      <BookOpen className="h-8 w-8 text-green-500" />
                    )}
                    <div>
                      <h3 className="font-semibold">{material.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {material.type} • {material.format || material.duration}
                      </p>
                      {material.instructor && (
                        <p className="text-sm text-muted-foreground">
                          Instructor: {material.instructor}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {material.format ? (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Watch
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card key={event.id}>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <Calendar className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} • {event.time}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Location: {event.location}
                      </p>
                    </div>
                  </div>
                  <Badge>{event.type}</Badge>
                </div>
                <Button className="mt-4 w-full">Register Now</Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="career" className="space-y-4">
          {careerResources.map((resource) => (
            <Card key={resource.id}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{resource.title}</h3>
                        {resource.status && (
                          <Badge variant="secondary">{resource.status}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {resource.type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Access Resource</Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
} 