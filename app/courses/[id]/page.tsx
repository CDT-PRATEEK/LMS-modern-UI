"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Star, Clock, Users, Award, CheckCircle, ChevronDown, ChevronRight, Download, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"
import toast from "react-hot-toast"

// Mock course data - in a real app, this would come from an API
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp",
  instructor: {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Senior Full Stack Developer with 8+ years of experience at top tech companies.",
    rating: 4.9,
    students: 25000,
    courses: 12,
  },
  rating: 4.9,
  students: 12543,
  duration: 480,
  price: 89.99,
  originalPrice: 129.99,
  image: "/placeholder.svg?height=400&width=600",
  category: "Development",
  level: "Beginner",
  language: "English",
  lastUpdated: "2024-01-15",
  description:
    "Master web development from scratch with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and deploy real-world projects.",
  whatYouWillLearn: [
    "Build responsive websites with HTML5 and CSS3",
    "Master JavaScript ES6+ and modern programming concepts",
    "Create dynamic web applications with React",
    "Develop backend APIs with Node.js and Express",
    "Work with databases using MongoDB",
    "Deploy applications to production",
    "Version control with Git and GitHub",
    "Best practices for web security",
  ],
  requirements: [
    "No prior programming experience required",
    "A computer with internet connection",
    "Willingness to learn and practice",
  ],
  curriculum: [
    {
      title: "Introduction to Web Development",
      lessons: 8,
      duration: 120,
      lessons_detail: [
        { title: "Course Introduction", duration: 15, completed: false },
        { title: "Setting Up Development Environment", duration: 20, completed: false },
        { title: "How the Web Works", duration: 18, completed: false },
        { title: "HTML Basics", duration: 25, completed: false },
        { title: "CSS Fundamentals", duration: 22, completed: false },
        { title: "Your First Website", duration: 20, completed: false },
      ],
    },
    {
      title: "Advanced HTML & CSS",
      lessons: 12,
      duration: 180,
      lessons_detail: [
        { title: "Semantic HTML", duration: 15, completed: false },
        { title: "CSS Grid and Flexbox", duration: 25, completed: false },
        { title: "Responsive Design", duration: 30, completed: false },
        { title: "CSS Animations", duration: 20, completed: false },
        { title: "Sass/SCSS", duration: 18, completed: false },
        { title: "Project: Portfolio Website", duration: 45, completed: false },
      ],
    },
    {
      title: "JavaScript Fundamentals",
      lessons: 15,
      duration: 240,
      lessons_detail: [
        { title: "Variables and Data Types", duration: 20, completed: false },
        { title: "Functions and Scope", duration: 25, completed: false },
        { title: "DOM Manipulation", duration: 30, completed: false },
        { title: "Event Handling", duration: 22, completed: false },
        { title: "Async JavaScript", duration: 28, completed: false },
        { title: "Project: Interactive Web App", duration: 60, completed: false },
      ],
    },
  ],
  tags: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [expandedSection, setExpandedSection] = useState<number | null>(0)
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const { user, updateUser } = useAuth()

  const isEnrolled = user?.enrolledCourses.includes(params.id)

  const handleEnroll = () => {
    if (!user) {
      toast.error("Please login to enroll in courses")
      return
    }

    if (isEnrolled) {
      toast.info("You are already enrolled in this course")
      return
    }

    // Simulate enrollment
    updateUser({
      enrolledCourses: [...user.enrolledCourses, params.id],
    })

    toast.success("Successfully enrolled in course!")
    setShowEnrollModal(false)
  }

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* <Navbar /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary">{courseData.category}</Badge>
                <Badge variant="outline">{courseData.level}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{courseData.title}</h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{courseData.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{courseData.rating}</span>
                  <span className="ml-1">({courseData.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>
                    {Math.floor(courseData.duration / 60)}h {courseData.duration % 60}m total
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{courseData.language}</span>
                </div>
                <div>Last updated: {new Date(courseData.lastUpdated).toLocaleDateString()}</div>
              </div>
            </motion.div>

            {/* Course Video/Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative mb-8"
            >
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={courseData.image || "/placeholder.svg"}
                  alt={courseData.title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16 p-0">
                    <Play className="w-6 h-6 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseData.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    {courseData.curriculum.reduce((acc, section) => acc + section.lessons, 0)} lessons •
                    {Math.floor(courseData.duration / 60)}h {courseData.duration % 60}m total length
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {courseData.curriculum.map((section, index) => (
                      <div key={index} className="border rounded-lg">
                        <button
                          onClick={() => toggleSection(index)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div>
                            <h3 className="font-medium">{section.title}</h3>
                            <p className="text-sm text-gray-500">
                              {section.lessons} lessons • {Math.floor(section.duration / 60)}h {section.duration % 60}m
                            </p>
                          </div>
                          {expandedSection === index ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>

                        {expandedSection === index && (
                          <div className="border-t bg-gray-50 dark:bg-gray-800">
                            {section.lessons_detail.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between p-3 border-b last:border-b-0"
                              >
                                <div className="flex items-center space-x-3">
                                  <Play className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm">{lesson.title}</span>
                                </div>
                                <span className="text-sm text-gray-500">{lesson.duration}m</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {courseData.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Image
                      src={courseData.instructor.avatar || "/placeholder.svg"}
                      alt={courseData.instructor.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{courseData.instructor.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{courseData.instructor.bio}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{courseData.instructor.rating} rating</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{courseData.instructor.students.toLocaleString()} students</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          <span>{courseData.instructor.courses} courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">${courseData.price}</div>
                    {courseData.originalPrice && (
                      <div className="text-lg text-gray-500 line-through">${courseData.originalPrice}</div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    {isEnrolled ? (
                      <Button className="w-full" size="lg" asChild>
                        <Link href={`/learn/${params.id}`}>Continue Learning</Link>
                      </Button>
                    ) : (
                      <Button className="w-full" size="lg" onClick={handleEnroll}>
                        Enroll Now
                      </Button>
                    )}

                    <Button variant="outline" className="w-full bg-transparent">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Course
                    </Button>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                      <span className="font-medium">
                        {Math.floor(courseData.duration / 60)}h {courseData.duration % 60}m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Level:</span>
                      <span className="font-medium">{courseData.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Language:</span>
                      <span className="font-medium">{courseData.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Certificate:</span>
                      <span className="font-medium">Yes</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-3">This course includes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Play className="w-4 h-4 mr-2 text-gray-400" />
                        {Math.floor(courseData.duration / 60)} hours of video
                      </li>
                      <li className="flex items-center">
                        <Download className="w-4 h-4 mr-2 text-gray-400" />
                        Downloadable resources
                      </li>
                      <li className="flex items-center">
                        <Award className="w-4 h-4 mr-2 text-gray-400" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {courseData.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}
