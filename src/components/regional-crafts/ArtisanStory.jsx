export function ArtisanStory({ artisan }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={artisan.image}
          alt={artisan.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold">{artisan.name}</h3>
          <p className="text-emerald-300">{artisan.location}</p>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-emerald-600 font-bold text-lg">
              {artisan.experience}+
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Years Experience</p>
            <p className="font-semibold">{artisan.craft}</p>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed mb-6">{artisan.story}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {artisan.products.map((product, index) => (
                <img
                  key={index}
                  src={product}
                  alt={`Product ${index + 1}`}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {artisan.products.length} products
            </span>
          </div>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
