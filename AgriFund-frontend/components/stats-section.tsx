"use client"

import { motion } from "framer-motion"
import { Users, Wallet, GraduationCap } from "lucide-react"

const stats = [
  { id: 1, name: 'Farmers Supported', value: '8,000+', icon: Users },
  { id: 2, name: 'Loans Issued', value: '$15M+', icon: Wallet },
  { id: 3, name: 'Scholarships Awarded', value: '2,500+', icon: GraduationCap },
]

export function StatsSection() {
  return (
    <div className="bg-gradient-to-b from-background to-accent/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl lg:max-w-none"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by communities worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              We're making a real difference in rural communities through decentralized finance.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-4 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: stat.id * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col bg-card p-8 hover:bg-accent/50 transition-colors duration-300 rounded-xl border border-border/50"
                >
                  <dt className="text-sm font-semibold leading-6 text-muted-foreground">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    {stat.name}
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-primary">
                    {stat.value}
                  </dd>
                </motion.div>
              )
            })}
          </dl>
        </motion.div>
      </div>
    </div>
  )
}