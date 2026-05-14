"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import type { Testimonial } from "@/types"

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechFlow Inc.",
    content:
      "This boilerplate saved us weeks of development time. The Google OAuth setup and JWT handling are seamless. Highly recommended for any Django project.",
    avatar: "",
  },
  {
    name: "Michael Chen",
    role: "Full-Stack Developer",
    company: "DataPulse",
    content:
      "The clean architecture and TypeScript support make this a joy to work with. The admin dashboard is production-ready right out of the box.",
    avatar: "",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "ScaleUp",
    content:
      "We migrated our legacy app to this stack. The performance improvements and developer experience were immediately noticeable. Great documentation too.",
    avatar: "",
  },
]

export function Testimonials() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Trusted by developers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our users have to say about DjangoStack.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>
                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
