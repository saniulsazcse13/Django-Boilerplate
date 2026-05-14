"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { ActivityLog } from "@/types"

const activities: ActivityLog[] = [
  {
    id: "1",
    user: "Sarah Johnson",
    action: "created",
    target: "New project",
    timestamp: "2 minutes ago",
    status: "completed",
  },
  {
    id: "2",
    user: "Michael Chen",
    action: "updated",
    target: "User settings",
    timestamp: "15 minutes ago",
    status: "completed",
  },
  {
    id: "3",
    user: "Emily Rodriguez",
    action: "deployed",
    target: "Production build",
    timestamp: "1 hour ago",
    status: "completed",
  },
  {
    id: "4",
    user: "David Kim",
    action: "reviewed",
    target: "Pull request #42",
    timestamp: "2 hours ago",
    status: "pending",
  },
  {
    id: "5",
    user: "Sarah Johnson",
    action: "commented",
    target: "Issue #15",
    timestamp: "3 hours ago",
    status: "completed",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions from your team</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/activity">
            View All <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
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
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
              <Badge
                variant={activity.status === "completed" ? "success" : "warning"}
                className="capitalize"
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
