"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { DashboardNavbar } from "@/components/layout/dashboard-navbar"
import { AdminRoute } from "@/components/auth/admin-route"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Activity,
  Settings as SettingsIcon,
  Shield,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const mobileLinks = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Activity Logs", href: "/admin/activity", icon: Activity },
  { label: "Settings", href: "/admin/settings", icon: SettingsIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <AdminRoute>
      <div className="min-h-screen bg-background">
        <AdminSidebar />

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center justify-between px-4 border-b bg-primary/5">
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-base">Admin Panel</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 py-4">
              <nav className="space-y-1 px-2">
                {mobileLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      <Icon className="h-4 w-4 mr-3 shrink-0" />
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <div className="lg:pl-64">
          <DashboardNavbar onMenuClick={() => setMobileMenuOpen(true)} />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminRoute>
  )
}
