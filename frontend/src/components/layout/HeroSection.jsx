"use client";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-emerald-100 via-white to-emerald-50 overflow-hidden">
      {/* Background Image (light and elegant) */}
      <img
        src="/images/handicraft.jpg"
        alt="Handcrafted items"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-transparent"></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="text-center md:text-left max-w-lg z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Discover Authentic{" "}
            <span className="text-emerald-600">Handcrafted Treasures</span>
          </h1>

          <p className="text-gray-600 mb-6">
            Support local artisans and explore unique creations made with love
            and skill — from décor to jewelry, fashion, and beyond.
          </p>

          <button
            onClick={() => {
              const element = document.getElementById("featured-products");
              element?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-block bg-emerald-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-emerald-700 transition"
          >
            Shop Now
          </button>
        </div>

        {/* Right Section (Hero Image) */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center z-10">
          <img
            src="/images/artisan-display.jpg"
            alt="Artisan showcase"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
