"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Server, Code2, Database, Cloud, ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Server,
    title: "Backend Development",
    description: "Scalable Django REST APIs with PostgreSQL, Redis, and Celery.",
    features: [
      "RESTful API design with DRF",
      "Database modeling and optimization",
      "Authentication and authorization",
      "Caching with Redis",
      "Background tasks with Celery",
    ],
  },
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Modern Next.js applications with TypeScript and ShadCN UI.",
    features: [
      "Responsive mobile-first design",
      "State management with Zustand",
      "Reusable component library",
      "SEO optimization",
      "Dark/light mode support",
    ],
  },
  {
    icon: Database,
    title: "Full-Stack Integration",
    description: "Seamless frontend-backend integration with type safety.",
    features: [
      "Type-safe API integration",
      "Automatic token refresh",
      "Error handling system",
      "Form validation",
      "Toast notifications",
    ],
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description: "Docker, CI/CD, and cloud deployment with monitoring.",
    features: [
      "Docker containerization",
      "CI/CD pipeline setup",
      "Cloud deployment (AWS/GCP/Azure)",
      "Monitoring and logging",
      "Automated backups",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="section-padding">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">Services</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Our Services</h1>
          <p className="text-lg text-muted-foreground">
            End-to-end development services to bring your project from idea to production.
          </p>
        </motion.div>

        <div className="space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="grid md:grid-cols-2 gap-6">
                    <CardHeader>
                      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                      <div className="pt-4">
                        <Button asChild>
                          <Link href="/contact">
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-4">What&apos;s included:</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-primary mr-3 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
