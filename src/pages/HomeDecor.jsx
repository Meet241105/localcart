import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";

export default function HomeDecor() {
  const [promoIndex, setPromoIndex] = useState(0);
  const chips = [
    "Wall Art",
    "Festive Decor",
    "Sculptures",
    "Furniture",
    "Fragrance",
    "Personalized",
  ];

  const promos = [
    { title: "Festive Torans", subtitle: "Extra 10% off", img: "/images/placeholder-hero-1.jpg" },
    { title: "Hand-painted Wall Art", subtitle: "New arrivals", img: "/images/placeholder-hero-2.jpg" },
    { title: "Eco Decor Picks", subtitle: "Under ₹999", img: "/images/placeholder-hero-3.jpg" },
  ];

  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Decor Item ${i + 1}`,
    price: 899 + i * 50,
    image: `/images/placeholder-${(i % 4) + 1}.jpg`,
    badge: i % 3 === 0 ? "Eco" : i % 3 === 1 ? "Festive" : "New",
  }));

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* Promo carousel (simple) */}
        <section className="relative rounded-xl overflow-hidden bg-gradient-to-r from-emerald-100 via-white to-emerald-50">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="px-6 py-10 sm:py-14">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{promos[promoIndex].title}</h1>
              <p className="text-gray-600 mt-2">{promos[promoIndex].subtitle}</p>
              <div className="mt-4 inline-block bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-md">
                Shop Now
              </div>
              <div className="mt-6 flex gap-2">
                {promos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPromoIndex(i)}
                    className={`h-2 w-2 rounded-full ${i === promoIndex ? "bg-emerald-600" : "bg-emerald-200"}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="h-48 md:h-full">
              <img
                src={promos[promoIndex].img}
                alt="Promo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Quick filter chips */}
        <section className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {chips.map((c) => (
            <button
              key={c}
              className="whitespace-nowrap border px-3 py-1 rounded-full text-sm hover:bg-emerald-50"
            >
              {c}
            </button>
          ))}
        </section>

        {/* Coupon cards */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {["LOCAL10","DECOR15","FESTIVE20"].map((code, idx) => (
            <div key={code} className="bg-emerald-50 border border-emerald-100 rounded-md p-3">
              <p className="text-emerald-900 text-sm font-medium">Use code {code}</p>
              <p className="text-emerald-700 text-xs">Save {idx === 0 ? "10%" : idx === 1 ? "15%" : "20%"} on select decor</p>
            </div>
          ))}
        </section>

        {/* Category tiles */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { t: "Wall Art", img: "/images/placeholder-cat-1.jpg" },
              { t: "Hangings", img: "/images/placeholder-cat-2.jpg" },
              { t: "Sculptures", img: "/images/placeholder-cat-3.jpg" },
              { t: "Furniture", img: "/images/placeholder-cat-4.jpg" },
              { t: "Fragrance", img: "/images/placeholder-cat-5.jpg" },
              { t: "Personalized", img: "/images/placeholder-cat-6.jpg" },
            ].map((c) => (
              <div key={c.t} className="bg-white shadow rounded-md overflow-hidden text-center">
                <img src={c.img} alt={c.t} className="w-full h-24 object-cover" />
                <p className="p-2 text-sm font-medium">{c.t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured collections */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Wall Art & Hangings", "Festive & Regional Decor"].map((t, i) => (
            <div key={t} className="bg-white shadow rounded-md overflow-hidden">
              <img
                src={`/images/placeholder-feature-${i + 1}.jpg`}
                alt={t}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{t}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Explore curated picks handcrafted by local artisans.
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Sticky sort/utility bar */}
        <section className="mt-8 flex items-center justify-between sticky top-16 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 z-10 py-2">
          <p className="text-sm text-gray-600">
            Showing {products.length} results
          </p>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>Sort: Popular</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
          <div className="hidden sm:flex items-center gap-2">
            {["Best Seller","New","Eco","Festival"].map((b) => (
              <span key={b} className="text-xs border px-2 py-1 rounded-full text-gray-700">{b}</span>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow rounded-md overflow-hidden hover:shadow-md transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm sm:text-base">{p.name}</p>
                  <span className="text-[10px] sm:text-xs text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                </div>
                <p className="text-emerald-600 text-sm sm:text-base">
                  ₹{p.price}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Specialty rows */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Sculptures & Figurines
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white shadow rounded-md overflow-hidden"
              >
                <img
                  src={`/images/placeholder-sculpt-${i}.jpg`}
                  alt="Sculpture"
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <p className="text-sm font-medium">Terracotta Piece {i}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shop by room */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Shop by Room</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Living","Bedroom","Entrance","Festive"].map((r, i) => (
              <div key={r} className="bg-white shadow rounded-md overflow-hidden">
                <img src={`/images/placeholder-room-${i + 1}.jpg`} alt={r} className="w-full h-28 object-cover" />
                <p className="p-2 text-sm font-medium">{r} Room</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Home Fragrance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white shadow rounded-md overflow-hidden"
              >
                <img
                  src={`/images/placeholder-frag-${i}.jpg`}
                  alt="Fragrance"
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <p className="text-sm font-medium">Soy Candle {i}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending deals */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Trending Deals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-white shadow rounded-md p-3">
                <p className="font-medium text-sm">Limited-time Deal</p>
                <p className="text-emerald-700 text-xs">Ends in 12:3{i}</p>
                <div className="mt-2 h-24 bg-[url('/images/placeholder-deal.jpg')] bg-cover bg-center rounded" />
              </div>
            ))}
          </div>
        </section>

        {/* Editorial */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Artisan Stories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white shadow rounded-md overflow-hidden"
              >
                <img
                  src={`/images/placeholder-artisan-${i}.jpg`}
                  alt="Artisan"
                  className="w-full h-36 object-cover"
                />
                <div className="p-4">
                  <p className="font-medium">Craft from Rajasthan</p>
                  <p className="text-sm text-gray-600 mt-1">
                    A short story about techniques and heritage.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer SEO text */}
        <section className="mt-10 text-sm text-gray-600">
          <p>
            Explore Madhubani, Warli, Tanjore and eco-friendly home decor
            crafted by local artisans.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
