export function Categories() {
  const categories = [
    { name: "Home & Decor", image: "/images/decor.jpg" },
    { name: "Fashion & Apparel", image: "/images/fashion.jpg" },
    { name: "Jewelry & Accessories", image: "/images/jewelry.jpg" },
    { name: "Handicrafts", image: "/images/handicraft.jpg" },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-8">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 sm:px-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-24 sm:h-40 object-cover"
            />
            <p className="text-center py-2 font-medium text-gray-700">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
