"use client"

import { motion } from "framer-motion"
import { Code, Heart, Lightbulb, Target, Users, Zap, Github, Linkedin, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const teamValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pushing the boundaries of educational technology with cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together to create meaningful learning experiences for everyone.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Committed to delivering high-quality, user-focused educational platforms.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Driven by our love for technology and dedication to improving education.",
  },
]

const teamMembers = [
  {
    name: "Anshuman Mishra",
    role: "Full Stack Developer",
    avatar: "/images/anshuman-mishra.jpg",
    bio: "Passionate about creating scalable web applications and innovative user experiences.",
    skills: ["React", "Node.js", "TypeScript", "Database Design"],
  },
  {
    name: "Saurabh Dwivedi",
    role: "Frontend Specialist",
    avatar: "/images/saurabh-dwivedi.jpg",
    bio: "Expert in modern frontend technologies with a keen eye for UI/UX design.",
    skills: ["React", "Next.js", "Tailwind CSS", "UI/UX"],
  },
  {
    name: "Preeti",
    role: "Backend Developer",
    avatar: "/images/preeti.jpg",
    bio: "Specializes in robust backend systems and API development for educational platforms.",
    skills: ["Python", "APIs", "Database", "System Design"],
  },
  {
    name: "Prateek",
    role: "DevOps Engineer",
    avatar: "/images/prateek.jpg",
    bio: "Ensures seamless deployment and maintains high-performance infrastructure.",
    skills: ["Cloud", "CI/CD", "Docker", "Monitoring"],
  },
]

export function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-25 via-white to-purple-25 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="w-8 h-8 text-blue-600" />
            <Zap className="w-8 h-8 text-purple-600" />
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet the TechiSpider Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're a passionate team of developers, designers, and educators dedicated to revolutionizing online learning
            through innovative technology solutions.
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="w-24 h-24 mx-auto border-4 border-gradient-to-r from-blue-600 to-purple-600">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-2">
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{value.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-blue-800/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
                At TechiSpider, we believe that quality education should be accessible to everyone, everywhere. Our
                mission is to create innovative, user-friendly learning platforms that empower students, educators, and
                institutions to achieve their full potential in the digital age.
              </p>
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Code</span>
                </div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Create</span>
                </div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Innovate</span>
                </div>
              </div>
              <div className="mt-6 text-sm text-blue-200">
                <p>🏆 Building the future of education technology, one line of code at a time</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
