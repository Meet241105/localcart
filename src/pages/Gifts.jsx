import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Gifts() {
  const steps = ["Choose", "Order", "Pay", "Receive"];
  const subs = [
    { t: "Decorative Items", img: "/images/gift-decor.jpg" },
    { t: "Personalized Creations", img: "/images/gift-personal.jpg" },
    { t: "Stationery & Office", img: "/images/gift-stationery.jpg" },
    { t: "Festive & Souvenir Gifts", img: "/images/gift-festive.jpg" },
    { t: "Corporate Gifting", img: "/images/gift-corporate.jpg" },
  ];
  const products = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `New Product ${i + 1}`,
    price: 899 + i * 90,
    img: `/images/gift-${(i % 4) + 1}.jpg`,
  }));
  const featured = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Featured ${i + 1}`,
    price: 999 + i * 110,
    img: `/images/feat-${(i % 4) + 1}.jpg`,
  }));
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* big banner */}
        <section className="rounded-xl overflow-hidden bg-[url('/images/gifts-hero.jpg')] bg-cover bg-center">
          <div className="bg-white/75 p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Handicrafts & Gifts
            </h1>
            <p className="text-gray-700 mt-2">
              Artisanal gifts with a cultural touch. Make it personal, make it
              local.
            </p>
            <div className="mt-4 inline-block bg-emerald-600 text-white text-sm px-4 py-2 rounded-md">
              Read More
            </div>
          </div>
        </section>

        {/* process buttons */}
        <section className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {steps.map((s) => (
            <div
              key={s}
              className="bg-white shadow rounded-md py-3 text-center text-sm font-medium"
            >
              {s}
            </div>
          ))}
        </section>

        {/* new products row */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            New Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-md overflow-hidden border border-emerald-50 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 text-sm">
                  <p className="font-medium">{p.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-emerald-700">₹{p.price}</span>
                    <button className="text-xs bg-emerald-600 text-white px-3 py-1 rounded">
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* connect banner */}
        <section className="mt-10 rounded-xl overflow-hidden bg-[url('/images/gifts-connect.jpg')] bg-cover bg-center">
          <div className="bg-black/40 text-white p-8 text-center">
            <h3 className="text-xl font-semibold">Connect With Us</h3>
            <p className="text-sm mt-2">
              Join the artisan community and discover stories behind each
              creation.
            </p>
            <button className="mt-4 bg-emerald-500 text-white text-sm px-4 py-2 rounded">
              Join Now
            </button>
          </div>
        </section>

        {/* featured products */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featured.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-md overflow-hidden border border-emerald-50 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 text-sm">
                  <p className="font-medium">{p.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-emerald-700">₹{p.price}</span>
                    <button className="text-xs bg-emerald-600 text-white px-3 py-1 rounded">
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* subcategory blocks - images first */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {subs.map((s) => (
              <div
                key={s.t}
                className="bg-white rounded-md overflow-hidden text-center border border-emerald-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={s.img}
                  alt={s.t}
                  className="w-full h-28 object-cover"
                />
                <p className="p-2 text-sm font-medium">{s.t}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
