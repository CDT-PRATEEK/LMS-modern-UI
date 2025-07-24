"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "instructor" | "admin"
  enrolledCourses: string[]
  completedLessons: string[]
  certificates: string[]
  xp: number
  level: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("lms-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("lms-user")
      }
    }
    setIsLoading(false)
  }, [])

  const getRoleBasedRedirect = (role: string) => {
    switch (role) {
      case "admin":
        return "/admin"
      case "instructor":
        return "/instructor"
      case "student":
      default:
        return "/dashboard"
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let newUser: User | null = null

    if (email === "demo@eduflow.com" && password === "demo123") {
      newUser = {
        id: "1",
        name: "Alex Johnson",
        email: "demo@eduflow.com",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "student",
        enrolledCourses: ["1", "2"],
        completedLessons: ["1-1", "1-2", "2-1"],
        certificates: ["cert-1"],
        xp: 1250,
        level: 3,
      }
    } else if (email === "admin@eduflow.com" && password === "admin123") {
      newUser = {
        id: "2",
        name: "Sarah Admin",
        email: "admin@eduflow.com",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "admin",
        enrolledCourses: [],
        completedLessons: [],
        certificates: [],
        xp: 0,
        level: 1,
      }
    } else if (email === "instructor@eduflow.com" && password === "instructor123") {
      newUser = {
        id: "3",
        name: "John Instructor",
        email: "instructor@eduflow.com",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "instructor",
        enrolledCourses: [],
        completedLessons: [],
        certificates: [],
        xp: 500,
        level: 2,
      }
    }

    if (newUser) {
      setUser(newUser)
      localStorage.setItem("lms-user", JSON.stringify(newUser))

      // Show success message with role
      const roleMessage =
        newUser.role === "admin"
          ? "Admin access granted!"
          : newUser.role === "instructor"
            ? "Instructor access granted!"
            : "Welcome back!"
      toast.success(roleMessage)

      setIsLoading(false)

      // Redirect to role-specific dashboard
      const redirectPath = getRoleBasedRedirect(newUser.role)
      setTimeout(() => {
        router.push(redirectPath)
      }, 100)

      return true
    }

    toast.error("Invalid credentials")
    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: "student",
      enrolledCourses: [],
      completedLessons: [],
      certificates: [],
      xp: 0,
      level: 1,
    }

    setUser(newUser)
    localStorage.setItem("lms-user", JSON.stringify(newUser))
    toast.success("Account created successfully!")
    setIsLoading(false)

    // Redirect to student dashboard for new signups
    setTimeout(() => {
      router.push("/dashboard")
    }, 100)

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("lms-user")
    toast.success("Logged out successfully")
    router.push("/")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("lms-user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
