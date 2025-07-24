"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Users,
  BookOpen,
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  UserCheck,
  BookOpenCheck,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user && user.role !== "admin") {
      // Redirect to appropriate dashboard based on role
      if (user.role === "instructor") {
        router.push("/instructor")
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

  if (!user || user.role !== "admin") {
    return null
  }

  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+573 this month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: "89",
      change: "+12 this month",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1% from last month",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "All systems operational",
      icon: Activity,
      color: "text-emerald-600",
    },
  ]

  const userStats = [
    { label: "Students", count: 10234, percentage: 81.6, color: "bg-blue-500" },
    { label: "Instructors", count: 1876, percentage: 14.9, color: "bg-green-500" },
    { label: "Admins", count: 433, percentage: 3.5, color: "bg-purple-500" },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "user_registered",
      message: "New instructor John Smith registered",
      time: "2 minutes ago",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "course_published",
      message: "Course 'Advanced Python' was published",
      time: "15 minutes ago",
      icon: BookOpenCheck,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "system_alert",
      message: "Server maintenance scheduled for tonight",
      time: "1 hour ago",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      id: 4,
      type: "payment_received",
      message: "Payment of $299 received from Alex Johnson",
      time: "2 hours ago",
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: "Course Approval",
      title: "Machine Learning Basics",
      instructor: "Dr. Sarah Wilson",
      submitted: "2 days ago",
    },
    {
      id: 2,
      type: "Instructor Application",
      title: "Michael Chen",
      instructor: "Frontend Developer",
      submitted: "3 days ago",
    },
    {
      id: 3,
      type: "Content Review",
      title: "Data Science with R",
      instructor: "Prof. David Lee",
      submitted: "1 week ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard 🛡️</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Welcome back, {user.name}. Here's your platform overview.
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/admin/users">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/courses">
                <BookOpen className="w-4 h-4 mr-2" />
                Course Management
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/settings">
                <Shield className="w-4 h-4 mr-2" />
                System Settings
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* User Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of user roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{stat.label}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {stat.count.toLocaleString()} ({stat.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`${stat.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest platform activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800`}>
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Activities
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending Approvals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Pending Approvals
                  <Badge variant="destructive" className="text-xs">
                    {pendingApprovals.length}
                  </Badge>
                </CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{item.submitted}</span>
                      </div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{item.instructor}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="h-7 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* System Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Platform performance and health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Uptime</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1.2s</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Avg Response Time</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2.1TB</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Data Processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
