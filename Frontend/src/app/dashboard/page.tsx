"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your application.</p>
      </div>

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <AnalyticsChart />
        <div className="space-y-6">
          <RecentActivity />
          <NotificationsPanel />
        </div>
      </div>
    </div>
  )
}
