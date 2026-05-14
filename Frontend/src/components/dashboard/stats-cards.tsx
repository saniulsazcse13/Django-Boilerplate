"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}

const stats: StatCardProps[] = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1% from last month",
    trend: "up",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1% from last month",
    trend: "up",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Sales",
    value: "12,234",
    change: "+19% from last month",
    trend: "up",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-0.5% from last month",
    trend: "down",
    icon: <Activity className="h-4 w-4" />,
  },
]

function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
          "text-xs flex items-center mt-1",
          trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
        )}>
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
