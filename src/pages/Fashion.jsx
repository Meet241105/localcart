import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Fashion() {
  const topTabs = ["Trending", "New", "Sarees", "Khadi", "Fusion"];
  const cats = ["Clothing", "Accessories", "Western Wear", "Footwear"];
  const quick = [
    "Free Delivery",
    "Support 24/7",
    "Easy Return",
    "Secure Pay",
    "Big Saving",
  ];
  const subs = [
    "Handloom Sarees",
    "Dupattas",
    "Khadi",
    "Woolen",
    "Block-Printed",
    "Hand-Painted",
    "Specialty Blouses",
    "Embroidered Bags",
    "Crochet/Macrame",
    "Scarves/Stoles",
    "Handwoven Bags",
    "Belts",
    "Organic Cotton",
    "Upcycled Fashion",
    "Mojaris/Juttis",
    "Sandals",
  ];
  const items = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Look ${i + 1}`,
    price: 1299 + i * 80,
    tag: i % 3 === 0 ? "Best" : i % 3 === 1 ? "New" : "Eco",
    img: `/images/fashion-${(i % 4) + 1}.jpg`,
  }));
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* sale hero with side image */}
        <section className="rounded-xl overflow-hidden bg-gradient-to-r from-emerald-50 via-white to-emerald-50">
          <div className="grid sm:grid-cols-3">
            <div className="sm:col-span-2 p-6 sm:p-10">
              <p className="text-xs text-gray-500">Big Fashion Sale</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Up to 50% OFF
              </h1>
              <p className="text-gray-600 mt-2">Redefine your everyday style</p>
              <div className="mt-4 inline-block bg-emerald-600 text-white text-sm px-4 py-2 rounded-md">
                Shop Deals
              </div>
              <div className="mt-4 text-xs text-gray-600">
                Gift Special · New coupon: STYLE10
              </div>
            </div>
            <div className="h-40 sm:h-full bg-[url('/images/fashion-hero.jpg')] bg-cover bg-center" />
          </div>
        </section>

        {/* utility badges */}
        <section className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {quick.map((t) => (
            <div key={t} className="bg-white shadow rounded-md p-3">
              {t}
            </div>
          ))}
        </section>

        {/* category icons row */}
        <section className="mt-6 flex gap-3 overflow-x-auto pb-1">
          {cats.map((c) => (
            <span
              key={c}
              className="border px-3 py-2 rounded-md text-sm whitespace-nowrap bg-white shadow-sm"
            >
              {c}
            </span>
          ))}
        </section>

        {/* flash sale */}
        <section className="mt-8 bg-white shadow rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Flash Sale</p>
            <span className="text-xs text-emerald-700">Ends in 08:17:56</span>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-md overflow-hidden border">
                <img
                  src={`/images/flash-${i}.jpg`}
                  alt="flash"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2 text-sm">
                  <p className="font-medium">Deal Item {i}</p>
                  <p className="text-emerald-700">
                    ₹{899 + i * 100}{" "}
                    <span className="text-gray-400 line-through ml-1">
                      ₹{999 + i * 120}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* popular subcategories tiles */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subs.map((t, i) => (
              <div
                key={t}
                className="bg-white shadow rounded-md overflow-hidden text-center"
              >
                <img
                  src={`/images/fashion-cat-${(i % 6) + 1}.jpg`}
                  alt={t}
                  className="w-full h-24 object-cover"
                />
                <p className="p-2 text-sm">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* tabs + grid */}
        <section className="mt-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {topTabs.map((t) => (
              <button
                key={t}
                className="text-sm border px-3 py-1 rounded-full hover:bg-emerald-50"
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow rounded-md overflow-hidden hover:shadow-md"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm sm:text-base">
                      {p.name}
                    </p>
                    <span className="text-[10px] border px-2 py-0.5 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-emerald-600 text-sm sm:text-base">
                    ₹{p.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* bottom banner */}
        <section className="mt-10 rounded-xl overflow-hidden bg-[url('/images/look-hero.jpg')] bg-cover bg-center">
          <div className="bg-white/70 p-6 sm:p-10">
            <p className="text-xs text-gray-600">Studio.w</p>
            <h3 className="text-2xl font-bold text-gray-800">
              Collections to mix & match
            </h3>
            <div className="mt-3 inline-block bg-emerald-600 text-white text-sm px-4 py-2 rounded-md">
              Explore Looks
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
