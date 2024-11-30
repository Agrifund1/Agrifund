"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function StudentCommunity() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Community Forums Card */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Discussion Forums</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/avatars/forum.png" alt="Forum" />
              <AvatarFallback>F</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-medium">Study Groups</h4>
              <p className="text-sm text-muted-foreground">Join or create study groups</p>
            </div>
            <Button variant="outline">Join</Button>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/avatars/mentorship.png" alt="Mentorship" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-medium">Mentorship Program</h4>
              <p className="text-sm text-muted-foreground">Connect with mentors</p>
            </div>
            <Button variant="outline">Explore</Button>
          </div>
        </div>
      </Card>

      {/* Events Card */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-medium">Student Networking Event</h4>
              <p className="text-sm text-muted-foreground">March 15, 2024</p>
            </div>
            <Button>RSVP</Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-medium">Career Workshop</h4>
              <p className="text-sm text-muted-foreground">March 20, 2024</p>
            </div>
            <Button>RSVP</Button>
          </div>
        </div>
      </Card>

      {/* Resources Card */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Learning Resources</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-medium">Study Materials</h4>
              <p className="text-sm text-muted-foreground">Access shared resources</p>
            </div>
            <Button variant="secondary">View</Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-medium">Tutorials</h4>
              <p className="text-sm text-muted-foreground">Watch video tutorials</p>
            </div>
            <Button variant="secondary">Watch</Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 