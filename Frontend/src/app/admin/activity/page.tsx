"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const activities = [
  { id: 1, user: "Sarah Johnson", action: "created", target: "Project 'Marketing Site'", time: "2 min ago", status: "completed" as const },
  { id: 2, user: "Michael Chen", action: "updated", target: "Deployment settings", time: "15 min ago", status: "completed" as const },
  { id: 3, user: "Emily Rodriguez", action: "deployed", target: "Production build v2.4.1", time: "1 hour ago", status: "completed" as const },
  { id: 4, user: "David Kim", action: "reviewed", target: "Pull request #42", time: "2 hours ago", status: "pending" as const },
  { id: 5, user: "Sarah Johnson", action: "commented", target: "Issue #15", time: "3 hours ago", status: "completed" as const },
  { id: 6, user: "Lisa Thompson", action: "uploaded", target: "Assets for landing page", time: "4 hours ago", status: "completed" as const },
  { id: 7, user: "Michael Chen", action: "created", target: "API endpoint /api/v2/users", time: "5 hours ago", status: "failed" as const },
  { id: 8, user: "Emily Rodriguez", action: "merged", target: "Pull request #41", time: "6 hours ago", status: "completed" as const },
]

export default function AdminActivityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-muted-foreground">System-wide activity and audit trail.</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search activity..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Activity</CardTitle>
          <CardDescription>A chronological log of all system actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {activity.user.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    activity.status === "completed" ? "success" :
                    activity.status === "pending" ? "warning" : "destructive"
                  }
                  className="capitalize"
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
