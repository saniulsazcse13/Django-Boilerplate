"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { FAQ } from "@/types"

const faqs: FAQ[] = [
  {
    question: "What is DjangoStack?",
    answer:
      "DjangoStack is a production-ready boilerplate that combines Django REST Framework with Next.js. It provides authentication, Google OAuth, JWT tokens, admin dashboard, and more — all pre-configured and ready to use.",
  },
  {
    question: "How does Google OAuth work?",
    answer:
      "Users sign in with their Google account. The frontend obtains an ID token from Google Identity Services, sends it to the backend, which verifies it and creates/authenticates the user. JWT tokens are returned for subsequent API calls.",
  },
  {
    question: "Can I customize the authentication flow?",
    answer:
      "Yes. The authentication system is fully customizable. You can add email/password auth, multi-factor authentication, social providers beyond Google, and custom permission logic.",
  },
  {
    question: "Is it production-ready?",
    answer:
      "Absolutely. The code follows security best practices including CSRF protection, proper JWT handling, token blacklisting, environment variable management, and secure HTTP headers.",
  },
  {
    question: "What tech stack does it use?",
    answer:
      "Backend: Django, Django REST Framework, SimpleJWT, Google OAuth. Frontend: Next.js 14 App Router, TypeScript, Tailwind CSS, ShadCN UI, TanStack Query, Zustand, and Framer Motion.",
  },
  {
    question: "How do I deploy it?",
    answer:
      "The project includes Docker configuration for easy deployment. You can deploy to any cloud provider: AWS, GCP, Azure, or DigitalOcean. CI/CD pipelines with GitHub Actions are included.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding bg-muted/30">
      <div className="max-width px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 text-sm text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
