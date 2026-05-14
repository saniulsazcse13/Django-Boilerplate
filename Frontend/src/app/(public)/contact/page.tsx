"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Contact } from "@/components/sections/contact"

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">Contact</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have a question, project idea, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </motion.div>
        <Contact />
      </div>
    </div>
  )
}
