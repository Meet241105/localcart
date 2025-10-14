import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PersonalCare() {
  const strip = [
    { t: "Skincare", img: "/images/images (1).jpeg" },
    { t: "Haircare", img: "/images/images (2).jpeg" },
    { t: "Wellness", img: "/images/images (3).jpeg" },
    { t: "Soaps", img: "/images/images (4).jpeg" },
    { t: "Tees", img: "/images/fashion.jpg" },
  ];

  const deals = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Deal ${i + 1}`,
    price: 299 + i * 50,
    img: `/images/gift-${(i % 4) + 1}.jpg`,
  }));

  const leftCats = [
    "Traditional Wear",
    "Western Wear",
    "Swim & Beachwear",
    "Winter & Seasonal Wear",
    "Beauty & Grooming",
    "Jewellery",
    "Personal care Appliances",
    "International Brands",
    "Foot Wear",
    "Watches",
    "Accessories",
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* Pastel category strip + hero */}
        <section>
          <div className="grid grid-cols-5 gap-2">
            {strip.map((s) => (
              <div
                key={s.t}
                className="rounded-xl overflow-hidden border border-emerald-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={s.img}
                  alt={s.t}
                  className="w-full h-20 object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl overflow-hidden bg-[#efe9e2]">
            <div className="relative h-48 sm:h-64 flex items-center justify-center text-center">
              <img
                src="/images/decor.jpg"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="relative">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Socks For Summer Look
                </h1>
                <div className="mt-3 flex gap-3 justify-center">
                  <button className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-md">
                    Shop Women
                  </button>
                  <button className="border text-sm px-4 py-2 rounded-md">
                    Shop Men
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard grid: left categories, center promos, right sidebar */}
        <section className="mt-8 grid grid-cols-12 gap-4">
          {/* Left */}
          <aside className="hidden sm:block col-span-3 bg-white rounded-xl border shadow-sm">
            <ul className="p-3 text-sm space-y-2">
              {leftCats.map((c) => (
                <li
                  key={c}
                  className="py-1 px-2 rounded hover:bg-emerald-50 cursor-pointer"
                >
                  {c}
                </li>
              ))}
            </ul>
          </aside>

          {/* Center */}
          <div className="col-span-12 sm:col-span-6 grid gap-4">
            <div className="rounded-xl overflow-hidden bg-emerald-50 p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800">
                More Deals Inside
                <br />
                Up to 50% Off
              </h3>
              <button className="mt-4 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm">
                Wishlist Now
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <img
                src="/images/images (1).jpeg"
                className="h-24 w-full object-cover rounded-lg shadow"
              />
              <img
                src="/images/images (2).jpeg"
                className="h-24 w-full object-cover rounded-lg shadow"
              />
              <img
                src="/images/images (3).jpeg"
                className="h-24 w-full object-cover rounded-lg shadow"
              />
              <img
                src="/images/images (4).jpeg"
                className="h-24 w-full object-cover rounded-lg shadow"
              />
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="hidden sm:block col-span-3 space-y-4">
            <div className="bg-white rounded-xl border p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800">Recently Viewed</h4>
              <img
                src="/images/91rPf6CMOiL._UF350,350_QL80_.jpg"
                className="mt-3 w-full h-28 object-cover rounded-md shadow"
              />
            </div>
            <div className="bg-white rounded-xl border p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800">
                Suggestions for You
              </h4>
              <img
                src="/images/jewelry.jpg"
                className="mt-3 w-full h-28 object-cover rounded-md shadow"
              />
              <p className="mt-2 text-sm text-gray-600">Watch more</p>
            </div>
          </aside>
        </section>

        {/* Deals of the Day */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Deals of the Day</h3>
            <span className="text-sm text-red-600">20 : 45 : 12 Left</span>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {deals.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-md overflow-hidden border border-emerald-50 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3 text-xs">
                  <p className="font-medium truncate">{d.name}</p>
                  <p className="mt-1 text-emerald-700">₹{d.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
