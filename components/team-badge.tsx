"use client"

import { motion } from "framer-motion"
import { Code, Users, Zap } from "lucide-react"

export function TeamBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Code className="w-4 h-4" />
            <Users className="w-4 h-4" />
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Built by TechiSpider Team</span>
        </div>
      </div>
    </motion.div>
  )
}
