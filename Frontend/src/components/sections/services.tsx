"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Server, Code2, Database, Cloud } from "lucide-react"
import Link from "next/link"
import type { Service } from "@/types"

const services: Service[] = [
  {
    icon: "Server",
    title: "Backend Development",
    description: "Scalable Django REST APIs with PostgreSQL, Redis, and Celery.",
    features: ["RESTful API design", "Database modeling", "Authentication", "Caching"],
  },
  {
    icon: "Code2",
    title: "Frontend Development",
    description: "Modern Next.js applications with TypeScript and ShadCN UI.",
    features: ["Responsive design", "State management", "Component library", "SEO optimized"],
  },
  {
    icon: "Database",
    title: "Full-Stack Integration",
    description: "Seamless frontend-backend integration with best practices.",
    features: ["API integration", "Type safety", "Error handling", "Performance"],
  },
  {
    icon: "Cloud",
    title: "DevOps & Deployment",
    description: "Docker, CI/CD, cloud deployment with monitoring.",
    features: ["Docker setup", "CI/CD pipeline", "Cloud deployment", "Monitoring"],
  },
]

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server className="h-8 w-8" />,
  Code2: <Code2 className="h-8 w-8" />,
  Database: <Database className="h-8 w-8" />,
  Cloud: <Cloud className="h-8 w-8" />,
}

export function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">Services</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What we offer</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            End-to-end development services for your next project.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[service.icon]}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary mr-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button size="lg" className="rounded-full" asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
