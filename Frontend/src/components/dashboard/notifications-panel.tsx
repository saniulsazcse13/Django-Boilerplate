"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bell, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react"
import Link from "next/link"
import type { Notification } from "@/types"

const notifications: Notification[] = [
  {
    id: "1",
    title: "Deployment successful",
    message: "Production build v2.4.1 deployed successfully.",
    type: "success",
    read: false,
    timestamp: "5 minutes ago",
  },
  {
    id: "2",
    title: "New user registered",
    message: "A new user has signed up via Google OAuth.",
    type: "info",
    read: false,
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    title: "Server warning",
    message: "CPU usage exceeded 80% threshold.",
    type: "warning",
    read: false,
    timestamp: "2 hours ago",
  },
]

const typeConfig = {
  success: { icon: CheckCircle, color: "text-emerald-500", badge: "success" as const },
  warning: { icon: AlertTriangle, color: "text-amber-500", badge: "warning" as const },
  error: { icon: XCircle, color: "text-destructive", badge: "destructive" as const },
  info: { icon: Info, color: "text-blue-500", badge: "info" as const },
}

export function NotificationsPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </CardTitle>
          <CardDescription>Stay updated with latest events</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/notifications">
            View All <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => {
            const config = typeConfig[notification.type]
            const Icon = config.icon
            return (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-3 rounded-lg ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
              >
                <Icon className={`h-5 w-5 mt-0.5 ${config.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <Badge variant={config.badge} className="text-[10px] px-1.5 py-0">
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
