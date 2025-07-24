"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Star, Clock, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const allCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 12543,
    duration: 480,
    price: 89.99,
    image: "/images/web-development-course.png",
    category: "Development",
    level: "Beginner",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive bootcamp.",
    tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
  },
  {
    id: "2",
    title: "Data Science with Python",
    instructor: "Dr. Michael Chen",
    rating: 4.8,
    students: 8932,
    duration: 360,
    price: 79.99,
    image: "/images/data-science-python-course.png",
    category: "Data Science",
    level: "Intermediate",
    description: "Master data analysis, machine learning, and visualization with Python.",
    tags: ["Python", "Pandas", "Machine Learning", "Data Visualization"],
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    instructor: "Emma Rodriguez",
    rating: 4.9,
    students: 6721,
    duration: 240,
    price: 69.99,
    image: "/images/ui-ux-design-course.png",
    category: "Design",
    level: "Beginner",
    description: "Create stunning user interfaces and experiences with modern design principles.",
    tags: ["Figma", "Adobe XD", "Prototyping", "User Research"],
  },
  {
    id: "4",
    title: "Advanced React Development",
    instructor: "James Wilson",
    rating: 4.7,
    students: 5432,
    duration: 320,
    price: 94.99,
    image: "/images/web-development-course.png",
    category: "Development",
    level: "Advanced",
    description: "Deep dive into React hooks, context, performance optimization, and testing.",
    tags: ["React", "Redux", "Testing", "Performance"],
  },
  {
    id: "5",
    title: "Digital Marketing Strategy",
    instructor: "Lisa Park",
    rating: 4.6,
    students: 9876,
    duration: 180,
    price: 59.99,
    image: "/images/digital-marketing-course.png",
    category: "Marketing",
    level: "Beginner",
    description: "Learn SEO, social media marketing, content strategy, and analytics.",
    tags: ["SEO", "Social Media", "Content Marketing", "Analytics"],
  },
  {
    id: "6",
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Robert Kim",
    rating: 4.8,
    students: 7654,
    duration: 400,
    price: 99.99,
    image: "/images/machine-learning-course.png",
    category: "Data Science",
    level: "Intermediate",
    description: "Understand algorithms, neural networks, and practical ML applications.",
    tags: ["Python", "TensorFlow", "Neural Networks", "Algorithms"],
  },
]

const categories = ["All", "Development", "Data Science", "Design", "Marketing", "Business"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]
const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 6

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel

      return matchesSearch && matchesCategory && matchesLevel
    })

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "newest":
          return Number.parseInt(b.id) - Number.parseInt(a.id)
        case "popular":
        default:
          return b.students - a.students
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedLevel, sortBy])

  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage)
  const paginatedCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage,
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* <Navbar /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Explore Our Courses</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover courses that will help you grow your skills and advance your career
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between bg-transparent">
                  {selectedCategory}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Level Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between bg-transparent">
                  {selectedLevel}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {levels.map((level) => (
                  <DropdownMenuItem key={level} onClick={() => setSelectedLevel(level)}>
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between bg-transparent">
                  {sortOptions.find((option) => option.value === sortBy)?.label}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortOptions.map((option) => (
                  <DropdownMenuItem key={option.value} onClick={() => setSortBy(option.value)}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-300">Showing {filteredAndSortedCourses.length} courses</p>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full">
                <div className="relative">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{course.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90">
                      {course.level}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{course.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({course.students.toLocaleString()})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {Math.floor(course.duration / 60)}h {course.duration % 60}m
                    </div>
                    <div className="text-lg font-bold text-blue-600">${course.price}</div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">by {course.instructor}</div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Button className="w-full" asChild>
                      <Link href={`/courses/${course.id}`}>View Course</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center space-x-2"
          >
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
                className="w-10"
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </motion.div>
        )}
      </div>

      {/* <Footer /> */}
    </div>
  )
}
