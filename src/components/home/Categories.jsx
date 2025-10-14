"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Categories() {
  const categories = [
    { name: "Home & Decor", image: "/images/decor.jpg" },
    { name: "Fashion & Apparel", image: "/images/fashion.jpg" },
    { name: "Jewelry & Accessories", image: "/images/jewelry.jpg" },
    { name: "Handicrafts & Gifts", image: "/images/handicraft.jpg" },
    { name: "Personal Care & Wellness", image: "/images/wellness.jpg" },
    { name: "Toys", image: "/images/toys.jpg" },
    { name: "Kitchen & Dining", image: "/images/kitchen.jpg" },
    { name: "Regional & Cultural Crafts", image: "/images/cultural.jpg" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCount = 4

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - visibleCount, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + visibleCount, categories.length - visibleCount)
    )
  }

  const visibleCategories = categories.slice(currentIndex, currentIndex + visibleCount)

  return (
    <section className="py-12 bg-gray-50 w-full">
      <div className="container mx-auto px-6 relative">
        {/* Header with Buttons */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-emerald-700">
            Shop by Category
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex + visibleCount >= categories.length}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-300">
          {visibleCategories.map((cat) => (
            <Card
              key={cat.name}
              className="rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
              <p className="text-center py-3 font-medium text-gray-700 text-sm sm:text-base">
                {cat.name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
