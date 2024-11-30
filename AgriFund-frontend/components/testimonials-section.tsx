"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    content: "AgriFund helped me expand my farm with a fair-rate loan. The process was transparent and efficient.",
    author: "Sarah Johnson",
    role: "Organic Farmer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    content: "Thanks to the scholarship program, I'm pursuing my degree in Agricultural Science. This platform is changing lives.",
    author: "Michael Chen",
    role: "Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    content: "The community investment feature allowed me to start my local produce business. It's been incredible.",
    author: "Emma Rodriguez",
    role: "Small Business Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-accent/30 to-background">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Hear from Our Community
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Real stories from people who have experienced the impact of AgriFund.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-6 bg-card/50 backdrop-blur-sm">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={testimonial.image} alt={testimonial.author} />
                            <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-muted-foreground">{testimonial.content}</p>
                            <div className="mt-4">
                              <p className="font-semibold">{testimonial.author}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </motion.div>
    </section>
  )
}