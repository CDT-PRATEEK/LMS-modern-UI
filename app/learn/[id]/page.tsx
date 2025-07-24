"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Textarea } from "@/components/ui/textarea"

const courseContent = {
  id: "1",
  title: "Complete Web Development Bootcamp",
  currentLesson: {
    id: "1-3",
    title: "JavaScript Fundamentals - Variables and Data Types",
    duration: 1800, // 30 minutes in seconds
    videoUrl: "/placeholder.svg?height=400&width=600",
    description: "Learn about JavaScript variables, data types, and how to work with them effectively.",
    transcript: `In this lesson, we'll explore JavaScript variables and data types. 

Variables are containers that store data values. In JavaScript, you can declare variables using var, let, or const keywords.

Data types in JavaScript include:
- Numbers: 42, 3.14
- Strings: "Hello World"
- Booleans: true, false
- Arrays: [1, 2, 3]
- Objects: {name: "John", age: 30}

Let's see some examples...`,
    resources: [
      { name: "JavaScript Variables Cheat Sheet", type: "pdf", url: "#" },
      { name: "Practice Exercises", type: "zip", url: "#" },
      { name: "Code Examples", type: "github", url: "#" },
    ],
  },
  lessons: [
    { id: "1-1", title: "Course Introduction", duration: 900, completed: true },
    { id: "1-2", title: "Setting Up Development Environment", duration: 1200, completed: true },
    {
      id: "1-3",
      title: "JavaScript Fundamentals - Variables and Data Types",
      duration: 1800,
      completed: false,
      current: true,
    },
    { id: "1-4", title: "JavaScript Functions", duration: 2100, completed: false },
    { id: "1-5", title: "DOM Manipulation", duration: 1800, completed: false },
    { id: "1-6", title: "Event Handling", duration: 1500, completed: false },
  ],
  quiz: {
    question: "Which keyword is used to declare a constant variable in JavaScript?",
    options: ["var", "let", "const", "final"],
    correct: 2,
    explanation:
      "The 'const' keyword is used to declare constants in JavaScript. Variables declared with const cannot be reassigned.",
  },
}

export default function LearnPage({ params }: { params: { id: string } }) {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [notes, setNotes] = useState("")
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [sidebarTab, setSidebarTab] = useState<"lessons" | "notes" | "resources">("lessons")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!user.enrolledCourses.includes(params.id)) {
      toast.error("You are not enrolled in this course")
      router.push(`/courses/${params.id}`)
      return
    }
  }, [user, params.id, router])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleLessonComplete = () => {
    if (!user) return

    const lessonId = courseContent.currentLesson.id
    if (!user.completedLessons.includes(lessonId)) {
      updateUser({
        completedLessons: [...user.completedLessons, lessonId],
        xp: user.xp + 50,
      })
      toast.success("Lesson completed! +50 XP")
    }
  }

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer")
      return
    }

    setShowExplanation(true)

    if (selectedAnswer === courseContent.quiz.correct) {
      toast.success("Correct! +25 XP")
      if (user) {
        updateUser({ xp: user.xp + 25 })
      }
    } else {
      toast.error("Incorrect. Review the explanation.")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="relative bg-black flex-1">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12 ml-1" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{courseContent.currentLesson.title}</h3>
                  <p className="text-gray-300">{formatTime(courseContent.currentLesson.duration)} lesson</p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={handlePlayPause} className="text-white hover:bg-white/20">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <SkipBack className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <SkipForward className="w-4 h-4" />
                  </Button>

                  <div className="flex-1 mx-4">
                    <div className="bg-white/20 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full transition-all"
                        style={{ width: `${(currentTime / courseContent.currentLesson.duration) * 100}%` }}
                      />
                    </div>
                  </div>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(courseContent.currentLesson.duration)}
                  </span>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Volume2 className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Settings className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Info & Actions */}
          <div className="bg-white dark:bg-gray-800 p-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {courseContent.currentLesson.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{courseContent.currentLesson.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={handleLessonComplete}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
                <Button variant="outline" onClick={() => setShowQuiz(!showQuiz)}>
                  Take Quiz
                </Button>
              </div>
            </div>

            {/* Quiz Section */}
            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t pt-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Quiz</CardTitle>
                    <CardDescription>Test your understanding of this lesson</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="font-medium">{courseContent.quiz.question}</h3>
                      <div className="space-y-2">
                        {courseContent.quiz.options.map((option, index) => (
                          <label key={index} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="quiz"
                              value={index}
                              checked={selectedAnswer === index}
                              onChange={() => setSelectedAnswer(index)}
                              className="text-blue-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>

                      {!showExplanation && (
                        <Button onClick={handleQuizSubmit} disabled={selectedAnswer === null}>
                          Submit Answer
                        </Button>
                      )}

                      {showExplanation && (
                        <div
                          className={`p-4 rounded-lg ${
                            selectedAnswer === courseContent.quiz.correct
                              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                          }`}
                        >
                          <p className="font-medium mb-2">
                            {selectedAnswer === courseContent.quiz.correct ? "Correct!" : "Incorrect"}
                          </p>
                          <p className="text-sm">{courseContent.quiz.explanation}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l flex flex-col">
          {/* Sidebar Tabs */}
          <div className="flex border-b">
            {[
              { id: "lessons", label: "Lessons", icon: BookOpen },
              { id: "notes", label: "Notes", icon: FileText },
              { id: "resources", label: "Resources", icon: MessageSquare },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSidebarTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                  sidebarTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {sidebarTab === "lessons" && (
              <div className="space-y-2">
                <h3 className="font-semibold mb-4">Course Lessons</h3>
                {courseContent.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      lesson.current
                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {lesson.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : lesson.current ? (
                        <Play className="w-5 h-5 text-blue-500" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{lesson.title}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(lesson.duration)}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">{index + 1}</span>
                  </div>
                ))}
              </div>
            )}

            {sidebarTab === "notes" && (
              <div className="space-y-4">
                <h3 className="font-semibold">My Notes</h3>
                <Textarea
                  placeholder="Take notes while learning..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[200px]"
                />
                <Button size="sm" className="w-full">
                  Save Notes
                </Button>
              </div>
            )}

            {sidebarTab === "resources" && (
              <div className="space-y-4">
                <h3 className="font-semibold">Lesson Resources</h3>
                <div className="space-y-2">
                  {courseContent.currentLesson.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{resource.name}</p>
                        <p className="text-xs text-gray-500 uppercase">{resource.type}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-3">Lesson Transcript</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {courseContent.currentLesson.transcript}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button size="sm">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
