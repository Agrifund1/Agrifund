"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Store, 
  MapPin, 
  Star,
  ChevronDown 
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const business = [
  {
    id: 1,
    name: "One Stop shop for Fertilizer Spreaders, Sprayers, and Seeders",
    location: "Sacramento, CA",
    products: ["Fertilizers", "seeds"],
    rating: 4.8,
    distance: "15 miles",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
    contact: {
      ownerName: "Ayomide Badejo",
      phoneNumber: "08126573569",
      email: "ayomidebadejo@gmail.com",
      profileImage: ""
    }
  },
  {
    id: 2,
    name: "Tools and Machine shore",
    location: "Davis, CA",
    products: ["tractors", "Rakes"],
    rating: 4.6,
    distance: "8 miles",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    contact: {
      ownerName: "Ayomide Badejo",
      phoneNumber: "08126573569",
      email: "ayomidebadejo@gmail.com",
      profileImage: ""
    }
  },
  {
    id: 3,
    name: "Fresh Fields Farm",
    location: "Modesto, CA",
    products: ["Grains", "Vegetables"],
    rating: 4.9,
    distance: "20 miles",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    contact: {
      ownerName: "Ayomide Badejo",
      phoneNumber: "08126573569",
      email: "ayomidebadejo@gmail.com",
      profileImage: ""
    }
  }
]

export function FarmersMarketplace() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search business or products..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="distance">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Product type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="vegetables">Tractors</SelectItem>
              <SelectItem value="fruits">Fertilizers</SelectItem>
              <SelectItem value="dairy">Seedlings</SelectItem>
              <SelectItem value="poultry">Tools</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Farmer Listings */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {business.map((business) => (
          <Card key={business.id} className="overflow-hidden">
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: `url(${business.image})` }}
            />
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{business.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{business.location}</span>
                    <span>•</span>
                    <span>{business.distance}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{business.rating}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {business.products.map((product, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-0.5 text-sm bg-primary/10 text-primary rounded-full"
                    >
                      {product}
                    </span>
                  ))}
                </div>

                <Button className="w-full">Contact Business</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 