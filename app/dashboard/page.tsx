"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, Clock, Award, TrendingUp, Calendar, Play, CheckCircle, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const progressData = [
  { name: "Week 1", progress: 20 },
  { name: "Week 2", progress: 35 },
  { name: "Week 3", progress: 55 },
  { name: "Week 4", progress: 70 },
  { name: "Week 5", progress: 85 },
  { name: "Week 6", progress: 95 },
]

const skillsData = [
  { name: "JavaScript", value: 85, color: "#3B82F6" },
  { name: "React", value: 70, color: "#10B981" },
  { name: "CSS", value: 90, color: "#F59E0B" },
  { name: "Node.js", value: 60, color: "#EF4444" },
]

const enrolledCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    progress: 65,
    totalLessons: 45,
    completedLessons: 29,
    image: "/placeholder.svg?height=100&width=150",
    nextLesson: "Advanced JavaScript Concepts",
    timeSpent: 24,
    lastAccessed: "2024-01-20",
  },
  {
    id: "2",
    title: "Data Science with Python",
    instructor: "Dr. Michael Chen",
    progress: 40,
    totalLessons: 32,
    completedLessons: 13,
    image: "/placeholder.svg?height=100&width=150",
    nextLesson: "Pandas Data Manipulation",
    timeSpent: 16,
    lastAccessed: "2024-01-18",
  },
]

const upcomingDeadlines = [
  {
    id: "1",
    title: "JavaScript Project Submission",
    course: "Web Development Bootcamp",
    dueDate: "2024-01-25",
    type: "assignment",
    priority: "high",
  },
  {
    id: "2",
    title: "Data Analysis Quiz",
    course: "Data Science with Python",
    dueDate: "2024-01-28",
    type: "quiz",
    priority: "medium",
  },
  {
    id: "3",
    title: "Final Project Presentation",
    course: "Web Development Bootcamp",
    dueDate: "2024-02-05",
    type: "project",
    priority: "high",
  },
]

const achievements = [
  {
    id: "1",
    title: "First Course Completed",
    description: "Completed your first course",
    icon: "🎓",
    earned: true,
    date: "2024-01-10",
  },
  {
    id: "2",
    title: "Speed Learner",
    description: "Completed 5 lessons in one day",
    icon: "⚡",
    earned: true,
    date: "2024-01-15",
  },
  {
    id: "3",
    title: "Consistent Learner",
    description: "Learned for 7 days straight",
    icon: "🔥",
    earned: false,
    progress: 5,
  },
  {
    id: "4",
    title: "Quiz Master",
    description: "Scored 100% on 3 quizzes",
    icon: "🏆",
    earned: false,
    progress: 2,
  },
]

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    // Redirect non-students to their appropriate dashboards
    if (!isLoading && user && user.role !== "student") {
      if (user.role === "admin") {
        router.push("/admin")
      } else if (user.role === "instructor") {
        router.push("/instructor")
      }
      return
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.role !== "student") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-gray-600 dark:text-gray-300">Continue your learning journey and track your progress</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Courses Enrolled</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.enrolledCourses.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Hours Learned</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">40</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Certificates</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.certificates.length}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">XP Points</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.xp}</p>
                  <p className="text-xs text-gray-500">Level {user.level}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          width={80}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 dark:text-white truncate">{course.title}</h3>
                          <p className="text-sm text-gray-500 mb-2">by {course.instructor}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>
                              {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                            <span>{course.timeSpent}h completed</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" asChild>
                            <Link href={`/learn/${course.id}`}>
                              <Play className="w-4 h-4 mr-1" />
                              Continue
                            </Link>
                          </Button>
                          <p className="text-xs text-gray-500 text-center">Next: {course.nextLesson}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Your learning activity over the past 6 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="progress"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Skills Overview</CardTitle>
                  <CardDescription>Your proficiency in different technologies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillsData.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${skill.value}%`,
                              backgroundColor: skill.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                      <div key={deadline.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            deadline.priority === "high"
                              ? "bg-red-500"
                              : deadline.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{deadline.title}</h4>
                          <p className="text-xs text-gray-500 mb-1">{deadline.course}</p>
                          <p className="text-xs text-gray-400">
                            Due: {new Date(deadline.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={deadline.type === "assignment" ? "default" : "secondary"} className="text-xs">
                          {deadline.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          achievement.earned
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : "bg-gray-50 dark:bg-gray-800"
                        }`}
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{achievement.title}</h4>
                          <p className="text-xs text-gray-500">{achievement.description}</p>
                          {achievement.earned ? (
                            <p className="text-xs text-green-600 dark:text-green-400">
                              Earned on {new Date(achievement.date!).toLocaleDateString()}
                            </p>
                          ) : (
                            <div className="mt-1">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}/3</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                                <div
                                  className="bg-blue-600 h-1 rounded-full"
                                  style={{ width: `${(achievement.progress! / 3) * 100}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        {achievement.earned && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/courses">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Browse Courses
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/profile">
                        <Users className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/certificates">
                        <Award className="w-4 h-4 mr-2" />
                        View Certificates
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
