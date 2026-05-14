"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Users, Trophy } from "lucide-react"

const stats = [
  { label: "Users", value: "10,000+" },
  { label: "Projects", value: "500+" },
  { label: "Countries", value: "50+" },
  { label: "Uptime", value: "99.9%" },
]

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We prioritize security in every aspect of our platform, from authentication to data storage.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized for speed and scalability, ensuring your applications run smoothly.",
  },
  {
    icon: Users,
    title: "Developer Experience",
    description: "Clean code, great documentation, and modern tools for the best DX.",
  },
  {
    icon: Trophy,
    title: "Quality",
    description: "Production-ready code that follows industry best practices and standards.",
  },
]

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">About Us</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Building the future of web development
          </h1>
          <p className="text-lg text-muted-foreground">
            DjangoStack is a production-ready boilerplate that combines the power of Django
            with the flexibility of Next.js. We believe in clean code, security best practices,
            and great developer experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <Card key={value.title}>
                <CardContent className="pt-6 flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
