"use client"

import { motion } from "framer-motion"
import {
  Code,
  Heart,
  Lightbulb,
  Target,
  Users,
  Zap,
  Github,
  Linkedin,
  Mail,
  Award,
  BookOpen,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

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
    github: "#",
    linkedin: "#",
    email: "anshuman@techispider.com",
  },
  {
    name: "Saurabh Dwivedi",
    role: "Frontend Specialist",
    avatar: "/images/saurabh-dwivedi.jpg",
    bio: "Expert in modern frontend technologies with a keen eye for UI/UX design.",
    skills: ["React", "Next.js", "Tailwind CSS", "UI/UX"],
    github: "#",
    linkedin: "#",
    email: "saurabh@techispider.com",
  },
  {
    name: "Preeti",
    role: "Backend Developer",
    avatar: "/images/preeti.jpg",
    bio: "Specializes in robust backend systems and API development for educational platforms.",
    skills: ["Python", "APIs", "Database", "System Design"],
    github: "#",
    linkedin: "#",
    email: "preeti@techispider.com",
  },
  {
    name: "Prateek",
    role: "DevOps Engineer",
    avatar: "/images/prateek.jpg",
    bio: "Ensures seamless deployment and maintains high-performance infrastructure.",
    skills: ["Cloud", "CI/CD", "Docker", "Monitoring"],
    github: "#",
    linkedin: "#",
    email: "prateek@techispider.com",
  },
]

const achievements = [
  {
    icon: Award,
    title: "50,000+ Students",
    description: "Successfully served over 50,000 students worldwide",
  },
  {
    icon: BookOpen,
    title: "500+ Courses",
    description: "Comprehensive course catalog across multiple domains",
  },
  {
    icon: Users,
    title: "100+ Instructors",
    description: "Expert instructors from leading tech companies",
  },
  {
    icon: TrendingUp,
    title: "95% Success Rate",
    description: "High completion and satisfaction rates",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Code className="w-10 h-10 text-blue-600" />
              <Zap className="w-10 h-10 text-purple-600" />
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-gradient">TechiSpider Team</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              We're a passionate team of developers, designers, and educators dedicated to revolutionizing online
              learning through innovative technology solutions. Our mission is to make quality education accessible to
              everyone, everywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                TechiSpider was born from a simple belief: that technology can transform education and make learning
                more engaging, accessible, and effective. Our team came together with diverse backgrounds in software
                development, education, and user experience design.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We've witnessed firsthand the challenges that students and educators face in traditional learning
                environments. That's why we're committed to building platforms that not only deliver content but create
                meaningful learning experiences that inspire and empower.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, EduFlow represents our vision of the future of education – a platform where learning is
                personalized, interactive, and accessible to learners around the globe.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Built with Passion</h3>
                    <p className="text-gray-600 dark:text-gray-300">Every line of code, every design decision</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and impact in the education technology space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">{achievement.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The talented individuals behind EduFlow, each bringing unique expertise and passion to our mission
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent" asChild>
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our approach to building educational technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8">
                  At TechiSpider, we believe that quality education should be accessible to everyone, everywhere. Our
                  mission is to create innovative, user-friendly learning platforms that empower students, educators,
                  and institutions to achieve their full potential in the digital age.
                </p>
                <div className="flex items-center justify-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <Code className="w-6 h-6" />
                    <span className="font-medium text-lg">Code</span>
                  </div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-6 h-6" />
                    <span className="font-medium text-lg">Create</span>
                  </div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-6 h-6" />
                    <span className="font-medium text-lg">Innovate</span>
                  </div>
                </div>
                <div className="mt-8 text-blue-200">
                  <p className="text-lg">🏆 Building the future of education technology, one line of code at a time</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
