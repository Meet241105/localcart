import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Jewelry() {
  const styles = [
    "Round",
    "Kundan",
    "Meenakari",
    "Terracotta",
    "Beaded",
    "Thread",
    "Resin",
    "Fusion",
    "Personalized",
  ];

  const items = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Jewelry ${i + 1}`,
    price: 799 + i * 70,
    img: `/images/jewel-${(i % 4) + 1}.jpg`,
  }));

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50">
        {/* HERO SECTION */}
        <section className="relative w-full">
          <div className="grid md:grid-cols-2">
            <div className="p-10 flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-white">
              <p className="text-emerald-700 text-sm uppercase tracking-wide">
                Gold for Every Event
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 leading-tight">
                Crafted Elegance, Timeless Shine
              </h1>
              <p className="text-gray-600 mt-3 max-w-md">
                Discover designs that capture every emotion — from weddings to
                everyday grace. Handcrafted with love by local artisans.
              </p>
              <div className="mt-6 flex gap-4">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition">
                  Shop Now
                </button>
                <button className="border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-5 py-2.5 rounded-md text-sm font-medium transition">
                  View Collections
                </button>
              </div>
            </div>
            <div className="h-[420px] md:h-auto bg-[url('/images/jewel-hero.jpg')] bg-cover bg-center" />
          </div>
        </section>

        {/* EXPLORE BY STYLE */}
        <section className="container mx-auto px-6 mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Explore by Style
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
            {styles.map((style, i) => (
              <div
                key={i}
                className="flex flex-col items-center flex-shrink-0 min-w-[80px]"
              >
                <div className="h-14 w-14 flex items-center justify-center bg-emerald-100 rounded-full shadow-sm">
                  <span className="text-emerald-700 font-medium text-sm">
                    {style[0]}
                  </span>
                </div>
                <p className="text-xs mt-2 text-gray-700">{style}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS - HORIZONTAL SCROLL */}
        <section className="container mx-auto px-6 mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Featured Products
            </h2>
            <a
              href="#"
              className="text-sm text-emerald-700 hover:underline font-medium"
            >
              View All
            </a>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-none">
            {items.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden flex-shrink-0 w-60 hover:shadow-md transition-all"
              >
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-52 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {p.name}
                  </p>
                  <p className="text-emerald-600 font-medium text-sm sm:text-base">
                    ₹{p.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* GALLERY / COLLECTIONS GRID */}
        <section className="container mx-auto px-6 mt-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="col-span-1 bg-[url('/images/jewel-hero2.jpg')] bg-cover bg-center rounded-2xl p-10 flex flex-col justify-end text-white">
              <h3 className="text-3xl font-semibold mb-2">Antique Style</h3>
              <p className="text-sm mb-4 opacity-90">
                Uncover vintage charm with modern craftsmanship.
              </p>
              <button className="bg-white text-emerald-700 font-medium px-4 py-2 rounded-md text-sm hover:bg-emerald-50 transition">
                Explore Now
              </button>
            </div>

            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {items.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4">
                    <p className="font-semibold text-gray-800">{p.name}</p>
                    <p className="text-emerald-600 font-medium">₹{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
