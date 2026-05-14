"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import type { PricingPlan } from "@/types"

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: 0,
    description: "Perfect for getting started with small projects.",
    features: [
      "Up to 3 projects",
      "Basic authentication",
      "Community support",
      "1GB storage",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    price: 29,
    description: "For growing teams and production applications.",
    features: [
      "Unlimited projects",
      "Advanced authentication",
      "Priority support",
      "50GB storage",
      "Advanced analytics",
      "Team collaboration",
      "API access",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For large organizations with advanced needs.",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "Unlimited storage",
      "SLA guarantee",
      "Custom deployment",
      "White-labeling",
      "Audit logs",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="section-padding">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className={`h-full relative ${
                  plan.highlighted
                    ? "border-primary shadow-lg shadow-primary/10"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-0">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Button
                    className={`w-full mb-6 ${
                      plan.highlighted ? "" : "variant-outline"
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/signup">
                      {plan.price === 0 ? "Get Started Free" : "Subscribe"}
                    </Link>
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-primary mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
