"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Save,
  BookOpen,
  Video,
  FileText,
  Users,
  Clock,
  DollarSign,
  Tag,
  Globe,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import toast from "react-hot-toast"

interface Lesson {
  id: string
  title: string
  type: "video" | "text" | "quiz"
  duration: number
  content: string
  videoUrl?: string
  isPreview: boolean
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

interface CourseData {
  title: string
  subtitle: string
  description: string
  category: string
  level: string
  language: string
  price: number
  thumbnail: string
  tags: string[]
  isPublished: boolean
  modules: Module[]
}

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Design",
  "Marketing",
  "Business",
  "Photography",
  "Music",
  "Language",
]

const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"]

const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Portuguese"]

export default function CreateCoursePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    language: "English",
    price: 0,
    thumbnail: "",
    tags: [],
    isPublished: false,
    modules: [],
  })

  const [newTag, setNewTag] = useState("")
  const [activeTab, setActiveTab] = useState("basics")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    if (user.role !== "instructor") {
      router.push("/dashboard")
      return
    }
    setIsLoading(false)
  }, [user, router])

  const handleInputChange = (field: keyof CourseData, value: any) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !courseData.tags.includes(newTag.trim())) {
      setCourseData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCourseData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: `Module ${courseData.modules.length + 1}`,
      description: "",
      lessons: [],
    }
    setCourseData((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }))
  }

  const updateModule = (moduleId: string, field: keyof Module, value: any) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => (module.id === moduleId ? { ...module, [field]: value } : module)),
    }))
  }

  const removeModule = (moduleId: string) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.filter((module) => module.id !== moduleId),
    }))
  }

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: "New Lesson",
      type: "video",
      duration: 0,
      content: "",
      isPreview: false,
    }

    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId ? { ...module, lessons: [...module.lessons, newLesson] } : module,
      ),
    }))
  }

  const updateLesson = (moduleId: string, lessonId: string, field: keyof Lesson, value: any) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : module,
      ),
    }))
  }

  const removeLesson = (moduleId: string, lessonId: string) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
          : module,
      ),
    }))
  }

  const saveCourse = async (publish = false) => {
    setIsSaving(true)

    // Basic validation
    if (!courseData.title.trim()) {
      toast.error("Course title is required")
      setIsSaving(false)
      return
    }

    if (!courseData.category) {
      toast.error("Please select a category")
      setIsSaving(false)
      return
    }

    if (publish && courseData.modules.length === 0) {
      toast.error("Add at least one module before publishing")
      setIsSaving(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const updatedCourseData = {
        ...courseData,
        isPublished: publish,
      }

      setCourseData(updatedCourseData)

      if (publish) {
        toast.success("Course published successfully!")
        router.push("/instructor")
      } else {
        toast.success("Course saved as draft!")
      }
    } catch (error) {
      toast.error("Failed to save course. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

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

  const totalLessons = courseData.modules.reduce((total, module) => total + module.lessons.length, 0)
  const totalDuration = courseData.modules.reduce(
    (total, module) => total + module.lessons.reduce((moduleTotal, lesson) => moduleTotal + lesson.duration, 0),
    0,
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/instructor">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Course</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Build and publish your course to share knowledge with students worldwide
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => saveCourse(false)} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              <Button onClick={() => saveCourse(true)} disabled={isSaving}>
                <Globe className="w-4 h-4 mr-2" />
                {isSaving ? "Publishing..." : "Publish Course"}
              </Button>
            </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Modules</p>
                  <p className="text-xl font-bold">{courseData.modules.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Lessons</p>
                  <p className="text-xl font-bold">{totalLessons}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Duration</p>
                  <p className="text-xl font-bold">
                    {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Price</p>
                  <p className="text-xl font-bold">${courseData.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basics">Course Basics</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>Provide basic information about your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Course Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter course title"
                        value={courseData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subtitle">Course Subtitle</Label>
                      <Input
                        id="subtitle"
                        placeholder="Enter course subtitle"
                        value={courseData.subtitle}
                        onChange={(e) => handleInputChange("subtitle", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Course Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what students will learn in this course"
                        rows={6}
                        value={courseData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={courseData.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="level">Course Level</Label>
                      <Select value={courseData.level} onValueChange={(value) => handleInputChange("level", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={courseData.language}
                        onValueChange={(value) => handleInputChange("language", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="thumbnail">Course Thumbnail</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="thumbnail"
                          placeholder="Enter thumbnail URL"
                          value={courseData.thumbnail}
                          onChange={(e) => handleInputChange("thumbnail", e.target.value)}
                        />
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tags">Course Tags</Label>
                      <div className="flex items-center space-x-2 mb-2">
                        <Input
                          placeholder="Add a tag"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addTag()}
                        />
                        <Button type="button" onClick={addTag} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {courseData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag}
                            <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Curriculum</CardTitle>
                    <CardDescription>Organize your course content into modules and lessons</CardDescription>
                  </div>
                  <Button onClick={addModule}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Module
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {courseData.modules.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No modules yet</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Start building your course by adding your first module
                    </p>
                    <Button onClick={addModule}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Module
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {courseData.modules.map((module, moduleIndex) => (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-lg p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">Module {moduleIndex + 1}</Badge>
                            <Input
                              placeholder="Module title"
                              value={module.title}
                              onChange={(e) => updateModule(module.id, "title", e.target.value)}
                              className="font-medium"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeModule(module.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="mb-4">
                          <Textarea
                            placeholder="Module description"
                            value={module.description}
                            onChange={(e) => updateModule(module.id, "description", e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="space-y-3">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                              <div className="flex items-center space-x-2 flex-1">
                                <Badge variant="secondary" className="text-xs">
                                  {lessonIndex + 1}
                                </Badge>
                                <Input
                                  placeholder="Lesson title"
                                  value={lesson.title}
                                  onChange={(e) => updateLesson(module.id, lesson.id, "title", e.target.value)}
                                  className="flex-1"
                                />
                                <Select
                                  value={lesson.type}
                                  onValueChange={(value) => updateLesson(module.id, lesson.id, "type", value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="video">
                                      <div className="flex items-center">
                                        <Video className="w-4 h-4 mr-2" />
                                        Video
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="text">
                                      <div className="flex items-center">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Text
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="quiz">
                                      <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-2" />
                                        Quiz
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  type="number"
                                  placeholder="Duration (min)"
                                  value={lesson.duration}
                                  onChange={(e) =>
                                    updateLesson(module.id, lesson.id, "duration", Number.parseInt(e.target.value) || 0)
                                  }
                                  className="w-32"
                                />
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={lesson.isPreview}
                                    onCheckedChange={(checked) =>
                                      updateLesson(module.id, lesson.id, "isPreview", checked)
                                    }
                                  />
                                  <Label className="text-xs">Preview</Label>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLesson(module.id, lesson.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" onClick={() => addLesson(module.id)} className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Lesson
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Pricing</CardTitle>
                <CardDescription>Set the price for your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price">Course Price (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={courseData.price}
                        onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Set to $0 to make this course free</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Pricing Recommendations</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Beginner courses:</span>
                        <span className="text-gray-600 dark:text-gray-300">$20 - $50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Intermediate courses:</span>
                        <span className="text-gray-600 dark:text-gray-300">$50 - $100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Advanced courses:</span>
                        <span className="text-gray-600 dark:text-gray-300">$100 - $200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish Course</CardTitle>
                <CardDescription>Review your course and make it available to students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Course Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Title:</span>
                        <span className="text-gray-600 dark:text-gray-300">{courseData.title || "Not set"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="text-gray-600 dark:text-gray-300">{courseData.category || "Not set"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Level:</span>
                        <span className="text-gray-600 dark:text-gray-300">{courseData.level || "Not set"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="text-gray-600 dark:text-gray-300">${courseData.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modules:</span>
                        <span className="text-gray-600 dark:text-gray-300">{courseData.modules.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Lessons:</span>
                        <span className="text-gray-600 dark:text-gray-300">{totalLessons}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Publishing Checklist</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {courseData.title ? (
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-300 rounded-full" />
                        )}
                        <span className="text-sm">Course title added</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {courseData.description ? (
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-300 rounded-full" />
                        )}
                        <span className="text-sm">Course description added</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {courseData.category ? (
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-300 rounded-full" />
                        )}
                        <span className="text-sm">Category selected</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {courseData.modules.length > 0 ? (
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-300 rounded-full" />
                        )}
                        <span className="text-sm">At least one module added</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {totalLessons > 0 ? (
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-300 rounded-full" />
                        )}
                        <span className="text-sm">At least one lesson added</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-6 border-t">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={courseData.isPublished}
                      onCheckedChange={(checked) => handleInputChange("isPublished", checked)}
                    />
                    <Label>
                      {courseData.isPublished ? (
                        <span className="flex items-center text-green-600">
                          <Globe className="w-4 h-4 mr-1" />
                          Published
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-600">
                          <Lock className="w-4 h-4 mr-1" />
                          Draft
                        </span>
                      )}
                    </Label>
                  </div>
                  <Button onClick={() => saveCourse(true)} disabled={isSaving}>
                    <Globe className="w-4 h-4 mr-2" />
                    {isSaving ? "Publishing..." : "Publish Course"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
