"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    title: "Building a Production-Ready Django Backend",
    excerpt: "Learn how to set up a Django REST Framework backend with Google OAuth, JWT authentication, and best practices.",
    author: "Sarah Johnson",
    date: "May 10, 2026",
    readTime: "5 min read",
    slug: "production-ready-django-backend",
    tags: ["Django", "Backend"],
  },
  {
    title: "Next.js 14 App Router: A Complete Guide",
    excerpt: "Explore the features of Next.js 14 App Router including layouts, server components, and middleware.",
    author: "Michael Chen",
    date: "May 8, 2026",
    readTime: "7 min read",
    slug: "nextjs-14-app-router-guide",
    tags: ["Next.js", "Frontend"],
  },
  {
    title: "Implementing Google OAuth with Django REST Framework",
    excerpt: "Step-by-step guide to integrating Google OAuth2 authentication in your Django API.",
    author: "Emily Rodriguez",
    date: "May 5, 2026",
    readTime: "6 min read",
    slug: "google-oauth-django-rest-framework",
    tags: ["Authentication", "Django"],
  },
  {
    title: "JWT Authentication Best Practices",
    excerpt: "Learn about JWT token management, refresh tokens, and security best practices for your web application.",
    author: "David Kim",
    date: "May 3, 2026",
    readTime: "4 min read",
    slug: "jwt-authentication-best-practices",
    tags: ["Security", "JWT"],
  },
  {
    title: "Building a Modern Admin Dashboard with ShadCN UI",
    excerpt: "Create a beautiful, responsive admin dashboard using ShadCN UI components and Tailwind CSS.",
    author: "Sarah Johnson",
    date: "April 28, 2026",
    readTime: "8 min read",
    slug: "modern-admin-dashboard-shadcn",
    tags: ["UI", "Dashboard"],
  },
  {
    title: "TypeScript Tips for Django Developers",
    excerpt: "Essential TypeScript patterns and practices for developers coming from a Django background.",
    author: "Michael Chen",
    date: "April 25, 2026",
    readTime: "5 min read",
    slug: "typescript-tips-django-developers",
    tags: ["TypeScript", "Tips"],
  },
]

export default function BlogPage() {
  return (
    <div className="section-padding">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">Blog</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Latest Articles</h1>
          <p className="text-lg text-muted-foreground">
            Insights, tutorials, and best practices for Django and Next.js development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full group hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {post.author.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{post.author}</p>
                        <div className="flex items-center text-xs text-muted-foreground space-x-3">
                          <span className="flex items-center">
                            <CalendarDays className="h-3 w-3 mr-1" /> {post.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
