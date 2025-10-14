import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Leaf, Hand, Truck, ShieldCheck, Sparkles } from "lucide-react";

export default function KitchenDining() {
  const heroBg = "bg-[#f1e8dd]";

  const tiles = [
    {
      t: "Serveware & Utensils",
      s: "Hand-painted Ceramics",
      img: "/images/handmadevase.jpeg",
    },
    {
      t: "Wooden & Stone Cookware",
      s: "Handcrafted Kitchen Tools",
      img: "/images/pot.jpeg",
    },
    {
      t: "Textiles & Dining Decor",
      s: "Embroidered linens",
      img: "/images/wool.jpeg",
    },
    {
      t: "Crochet Coasters & Mats",
      s: "Placemats & more",
      img: "/images/beads.jpg",
    },
    {
      t: "Artisanal Food & Beverages",
      s: "Spices, Teas & Pickles",
      img: "/images/images.jpeg",
    },
    {
      t: "Traditional Cookware",
      s: "Brass • Copper • Clay",
      img: "/images/handicraft.jpg",
    },
  ];

  const classy = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Editor’s Pick ${i + 1}`,
    price: 699 + i * 120,
    img: `/images/images (${(i % 4) + 1}).jpeg`,
  }));

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* Hero - beige block with split layout and images */}
        <section className={`relative rounded-2xl overflow-hidden ${heroBg}`}>
          <div className="grid sm:grid-cols-2 gap-6 items-stretch">
            {/* Left - copy */}
            <div className="p-6 sm:p-10">
              <p className="text-xs tracking-wider uppercase text-gray-600">
                Kitchen & Dining
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight mt-2">
                Innovative Utensils Set
              </h1>
              <p className="text-gray-700 mt-3 max-w-xl">
                Modern, handcrafted essentials for everyday cooking and elegant
                hosting — aligned with our clean, contemporary brand.
              </p>
              <button className="mt-5 bg-emerald-600 text-white text-sm px-4 py-2 rounded-md">
                Shop Collection
              </button>
            </div>
            {/* Right - stacked imagery */}
            <div className="relative min-h-[220px] sm:min-h-[280px]">
              <img
                src="/images/images (4).jpeg"
                alt="Cookware"
                className="absolute right-4 top-6 w-40 sm:w-56 h-40 sm:h-56 object-cover rounded-lg shadow"
              />
              <img
                src="/images/images (3).jpeg"
                alt="Prep"
                className="absolute right-24 sm:right-40 bottom-6 w-28 sm:w-40 h-28 sm:h-40 object-cover rounded-lg shadow"
              />
            </div>
          </div>
        </section>

        {/* Features row */}
        <section className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { i: Leaf, l: "Natural Materials" },
              { i: Hand, l: "Handcrafted" },
              { i: Truck, l: "Fast Delivery" },
              { i: ShieldCheck, l: "Trusted Quality" },
              { i: Sparkles, l: "Easy Care" },
            ].map((f, idx) => {
              const Icon = f.i;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg border shadow-sm px-4 py-3 flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                >
                  <Icon size={16} className="text-emerald-600" />
                  <span>{f.l}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Category Tiles - 2 x 3 grid */}
        <section className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tiles.map((c) => (
              <div
                key={c.t}
                className="relative rounded-xl overflow-hidden group"
              >
                <img
                  src={c.img}
                  alt={c.t}
                  className="w-full h-36 sm:h-44 object-cover"
                />
                <div className="absolute inset-0 bg-emerald-900/35 group-hover:bg-emerald-900/25 transition" />
                <div className="absolute inset-0 p-4 text-white flex flex-col justify-end">
                  <p className="text-sm opacity-90">{c.s}</p>
                  <h3 className="text-lg font-semibold">{c.t}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Classy Products */}
        <section className="mt-10">
          <p className="text-center text-xs tracking-wider text-gray-500">
            Our Pick
          </p>
          <h2 className="mt-1 text-center text-2xl font-semibold text-gray-800">
            Classy Products
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <button className="px-4 py-1.5 rounded-full bg-emerald-600 text-white">
              New
            </button>
            <button className="px-4 py-1.5 rounded-full border">
              Trending
            </button>
            <button className="px-4 py-1.5 rounded-full border">
              Best Sellers
            </button>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {classy.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow rounded-md overflow-hidden"
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
                      Add
                    </button>
                  </div>
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
