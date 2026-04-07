export function CategoryCard({ category, index }) {
  return (
    <div
      className="bg-white/90 backdrop-blur-sm rounded-xl border border-emerald-50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
      style={{
        background:
          index % 2 === 0
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(255, 255, 255, 0.9) 100%)"
            : "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(255, 255, 255, 0.9) 100%)",
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={category.img}
          alt={category.title}
          className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
          Handmade
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-800">
          {category.title}
        </h4>
        <p className="text-sm text-gray-600 mt-2">{category.desc}</p>
      </div>
    </div>
  );
}

