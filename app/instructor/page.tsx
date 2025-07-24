"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Users, BarChart3, PlusCircle, Clock, Star, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function InstructorDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user && user.role !== "instructor") {
      // Redirect to appropriate dashboard based on role
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.role !== "instructor") {
    return null
  }

  const stats = [
    {
      title: "Total Courses",
      value: "12",
      change: "+2 this month",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Total Students",
      value: "1,234",
      change: "+180 this month",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Course Rating",
      value: "4.8",
      change: "+0.2 this month",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Monthly Revenue",
      value: "$12,450",
      change: "+15% this month",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const recentCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      students: 245,
      rating: 4.9,
      status: "Published",
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      title: "Node.js Backend Mastery",
      students: 189,
      rating: 4.7,
      status: "Published",
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      title: "TypeScript Fundamentals",
      students: 156,
      rating: 4.8,
      status: "Draft",
      lastUpdated: "3 days ago",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Review assignment submissions",
      course: "React Development",
      dueDate: "Today",
      priority: "high",
    },
    {
      id: 2,
      title: "Update course materials",
      course: "Node.js Backend",
      dueDate: "Tomorrow",
      priority: "medium",
    },
    {
      id: 3,
      title: "Schedule live session",
      course: "TypeScript Fundamentals",
      dueDate: "This week",
      priority: "low",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user.name}! 👨‍🏫</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Here's what's happening with your courses today.</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/instructor/create-course">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create New Course
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/instructor/courses">
                <BookOpen className="w-4 h-4 mr-2" />
                Manage Courses
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/instructor/students">
                <Users className="w-4 h-4 mr-2" />
                View Students
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/instructor/analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Courses</CardTitle>
                <CardDescription>Your latest course activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {course.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {course.lastUpdated}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={course.status === "Published" ? "default" : "secondary"}>{course.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                  <Link href="/instructor/courses">View All Courses</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Things that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.course}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {task.dueDate}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Course Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>How your courses are performing this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Advanced React Development</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">85% completion rate</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Node.js Backend Mastery</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">72% completion rate</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">TypeScript Fundamentals</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">91% completion rate</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
