"use client"

import { Card, CardContent } from "@/components/ui/card"

export function Categories() {
  const categories = [
    { name: "Home & Decor", image: "/images/decor.jpg" },
    { name: "Fashion & Apparel", image: "/images/fashion.jpg" },
    { name: "Jewelry & Accessories", image: "/images/jewelry.jpg" },
    { name: "Handicrafts & Gifts", image: "/images/handicraft.jpg" },
    { name: "Personal Care & Wellness", image: "/images/wellness.jpg" },
    { name: "Toys", image: "/images/toys.jpg" },
    { name: "Kitchen & Dining", image: "/images/kitchen.jpg" },
    { name: "Regional & Cultural Crafts", image: "/images/regional-crafts.jpg" },
  ]

  return (
    <section className="py-14 bg-gray-50">
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-8">
        Shop by Category
      </h2>

      <div className="relative group max-w-6xl mx-auto">
        {/* Horizontal scroll container */}
        <div className="flex overflow-hidden group-hover:overflow-x-auto gap-4 px-4 sm:px-6 scroll-smooth snap-x snap-mandatory no-scrollbar">
          {categories.map((cat) => (
            <Card
              key={cat.name}
              className="w-[150px] sm:w-[170px] md:w-[190px] h-[180px] flex-shrink-0 snap-start hover:scale-105 transition-transform duration-300 hover:shadow-md cursor-pointer bg-white rounded-xl"
            >
              <CardContent className="p-3 flex flex-col items-center justify-between h-full">
                <div className="w-full h-[110px] overflow-hidden rounded-lg">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <p className="text-center mt-2 text-sm font-medium text-gray-700">
                  {cat.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* gradient edges for fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent" />
      </div>
    </section>
  )
}
