"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, Info, XCircle, CheckCheck, Trash2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const allNotifications: NotificationItem[] = [
  { id: 1, title: "Deployment successful", message: "Production build v2.4.1 deployed successfully.", type: "success", time: "5 min ago", read: false },
  { id: 2, title: "New user registered", message: "A new user has signed up via Google OAuth.", type: "info", time: "1 hour ago", read: false },
  { id: 3, title: "Server warning", message: "CPU usage exceeded 80% threshold on server-01.", type: "warning", time: "2 hours ago", read: false },
  { id: 4, title: "Database backup complete", message: "Daily backup completed successfully.", type: "success", time: "3 hours ago", read: true },
  { id: 5, title: "Payment received", message: "Payment of $299 from Acme Corp received.", type: "info", time: "5 hours ago", read: true },
  { id: 6, title: "SSL certificate expiring", message: "SSL certificate for api.example.com expires in 7 days.", type: "warning", time: "1 day ago", read: true },
  { id: 7, title: "Error rate spike", message: "Error rate increased to 2.5% in the last 15 minutes.", type: "error", time: "2 days ago", read: true },
]

type NotificationType = "success" | "warning" | "error" | "info"

const typeStyles: Record<NotificationType, { icon: typeof CheckCircle; color: string; badge: "success" | "warning" | "destructive" | "info" }> = {
  success: { icon: CheckCircle, color: "text-emerald-500", badge: "success" },
  warning: { icon: AlertTriangle, color: "text-amber-500", badge: "warning" },
  error: { icon: XCircle, color: "text-destructive", badge: "destructive" },
  info: { icon: Info, color: "text-blue-500", badge: "info" },
}

interface NotificationItem {
  id: number
  title: string
  message: string
  type: NotificationType
  time: string
  read: boolean
}

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">View and manage your notifications.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <CheckCheck className="mr-2 h-4 w-4" /> Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="success">Success</TabsTrigger>
          <TabsTrigger value="warning">Warnings</TabsTrigger>
        </TabsList>

        {(["all", "unread", "success", "warning"] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{tab} Notifications</CardTitle>
                <CardDescription>
                  {tab === "all" ? "All" : tab === "unread" ? "Unread" : `${tab} related`} notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {allNotifications
                    .filter((n) => tab === "all" || tab === (n.read ? "read" : "unread") || n.type === tab)
                    .map((notification) => {
                      const config = typeStyles[notification.type]
                      const Icon = config.icon
                      return (
                        <div
                          key={notification.id}
                          className={`flex items-start space-x-4 p-4 rounded-lg border ${
                            !notification.read ? "bg-muted/30 border-muted-foreground/20" : ""
                          }`}
                        >
                          <Icon className={`h-5 w-5 mt-0.5 ${config.color}`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{notification.title}</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant={config.badge}>{notification.type}</Badge>
                                {!notification.read && (
                                  <div className="h-2 w-2 rounded-full bg-primary" />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
