"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricsCardProps {
  title: string
  value: string
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    label: string
  }
  className?: string
}

export function MetricsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className
}: MetricsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("h-full", className)}
    >
      <Card className="relative h-full bg-gradient-to-br from-card to-card/95 shadow-md hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg 
              className="h-full w-full" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern 
                  id={`grid-${title.replace(/\s+/g, '-')}`} 
                  width="10" 
                  height="10" 
                  patternUnits="userSpaceOnUse"
                >
                  <path 
                    d="M 10 0 L 0 0 0 10" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill={`url(#grid-${title.replace(/\s+/g, '-')})`} />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col space-y-4">
            {/* Title Row */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 p-2.5 bg-primary/10 rounded-xl">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {title}
              </h3>
            </div>

            {/* Value Row */}
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                {value}
              </p>
            </div>
            
            {/* Trend Row */}
            {trend && (
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                    trend.value >= 0 
                      ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  )}
                >
                  {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
                </div>
                <span className="text-xs text-muted-foreground">
                  {trend.label}
                </span>
              </div>
            )}

            {/* Description Row */}
            {description && (
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 