"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const userData = [
  { name: "Mon", users: 45 },
  { name: "Tue", users: 52 },
  { name: "Wed", users: 38 },
  { name: "Thu", users: 65 },
  { name: "Fri", users: 58 },
  { name: "Sat", users: 30 },
  { name: "Sun", users: 25 },
]

const pageViews = [
  { page: "/", views: 4200 },
  { page: "/pricing", views: 2800 },
  { page: "/about", views: 1900 },
  { page: "/blog", views: 3400 },
  { page: "/contact", views: 1200 },
  { page: "/dashboard", views: 5600 },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">System-wide analytics and performance metrics.</p>
      </div>

      <AnalyticsChart />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users</CardTitle>
            <CardDescription>User activity over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tickLine={false} axisLine={false} />
                  <YAxis className="text-xs" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pageViews.map((item) => (
                <div key={item.page} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {item.page}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium">{item.views.toLocaleString()} views</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
