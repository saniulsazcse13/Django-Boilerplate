"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Users, Lock, BarChart3, Palette } from "lucide-react"
import type { Feature } from "@/types"

const features: Feature[] = [
  {
    icon: "Shield",
    title: "Google OAuth",
    description: "Secure authentication with Google Sign-In. No passwords needed.",
  },
  {
    icon: "Zap",
    title: "JWT Tokens",
    description: "Automatic token refresh and secure session management.",
  },
  {
    icon: "Users",
    title: "User Management",
    description: "Complete user profiles with role-based access control.",
  },
  {
    icon: "Lock",
    title: "Security First",
    description: "CSRF protection, rate limiting, and security best practices.",
  },
  {
    icon: "BarChart3",
    title: "Admin Dashboard",
    description: "Full analytics dashboard with charts and data visualization.",
  },
  {
    icon: "Palette",
    title: "Modern UI",
    description: "ShadCN UI components with dark/light mode support.",
  },
]

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  Lock: <Lock className="h-6 w-6" />,
  BarChart3: <BarChart3 className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Features() {
  return (
    <section id="features" className="section-padding bg-muted/30">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              build fast
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Production-ready features that save you weeks of setup time.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[feature.icon]}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
