"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sprout } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent to-background py-20 sm:py-32">
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaf-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 2C14 2 8 6 8 12C8 18 14 22 20 22C26 22 32 18 32 12C32 6 26 2 20 2Z" 
                    fill="currentColor" className="text-primary/20" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 px-4 mx-auto max-w-7xl"
      >
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              Empowering Rural Communities Through Decentralized Finance
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              AgriFund connects farmers, businesses, and students with the financial support they need through blockchain-powered loans, community investments, and educational scholarships.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-muted-foreground/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-translate-x-1/2" />
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative mx-auto max-w-[366px] aspect-square"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sprout className="h-48 w-48 text-primary/80" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function BackgroundIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1026 1026"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
        stroke="#D4D4D4"
        strokeOpacity="0.7"
      />
      <path
        d="M513 1025C230.23 1025 1 795.77 1 513"
        stroke="url(#:R65m:-gradient-1)"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id=":R65m:-gradient-1"
          x1="1"
          y1="513"
          x2="1"
          y2="1025"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}