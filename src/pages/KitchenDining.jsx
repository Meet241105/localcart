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
      s: "Embroidered Linens",
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

  const deals = [
    {
      title: "Flat 25% Off • Handmade Serveware",
      desc: "Exquisite hand-painted ceramics for modern homes — only till midnight!",
      expires: "06:14:29",
    },
    {
      title: "Festive Combo",
      desc: "Buy 2 Get 1 Free • Brassware",
      code: "FEST25",
    },
    {
      title: "Eco Hampers",
      desc: "15% Off • Corporate Orders",
      code: "CORP15",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-8 py-10">

        {/* Hero Section */}
        <section className={`relative rounded-2xl overflow-hidden ${heroBg}`}>
          <div className="grid sm:grid-cols-2 gap-6 items-stretch">
            <div className="p-6 sm:p-10">
              <p className="text-xs tracking-wider uppercase text-gray-600">
                Kitchen & Dining
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight mt-2">
                Modern Artistry for Every Table
              </h1>
              <p className="text-gray-700 mt-3 max-w-xl">
                Handcrafted essentials and contemporary cookware that blend
                tradition with modern living — each piece tells a story.
              </p>
              <button className="mt-5 bg-emerald-700 text-white text-sm px-5 py-2 rounded-md hover:bg-emerald-800 transition">
                Explore Collection
              </button>
            </div>

            <div className="relative min-h-[220px] sm:min-h-[300px]">
              <img
                src="/images/images (4).jpeg"
                alt="Cookware"
                className="absolute right-6 top-8 w-44 sm:w-60 h-44 sm:h-60 object-cover rounded-xl shadow-md"
              />
              <img
                src="/images/images (3).jpeg"
                alt="Prep"
                className="absolute right-28 sm:right-48 bottom-8 w-28 sm:w-40 h-28 sm:h-40 object-cover rounded-xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Features Row */}
        <section className="mt-8">
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
                  className="bg-white rounded-lg border shadow-sm px-4 py-3 flex items-center gap-2 text-xs sm:text-sm text-gray-700 hover:shadow-md transition"
                >
                  <Icon size={16} className="text-emerald-600" />
                  <span>{f.l}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Category Grid */}
        <section className="mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {tiles.map((c) => (
              <div
                key={c.t}
                className="relative rounded-xl overflow-hidden group border border-emerald-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={c.img}
                  alt={c.t}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-emerald-900/30 group-hover:bg-emerald-900/20 transition" />
                <div className="absolute inset-0 p-4 text-white flex flex-col justify-end">
                  <p className="text-sm opacity-90">{c.s}</p>
                  <h3 className="text-lg font-semibold">{c.t}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deals & Specials */}
        <section className="mt-14">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Deals of the Day</h2>
            <button className="text-sm text-emerald-700 hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Main Deal */}
            <div className="col-span-1 sm:col-span-2 relative rounded-xl overflow-hidden bg-gradient-to-r from-emerald-100 via-white to-emerald-50 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {deals[0].title}
                </h3>
                <p className="text-gray-600 mt-1">{deals[0].desc}</p>
              </div>
              <button className="mt-4 self-start bg-emerald-700 text-white px-4 py-2 rounded-md text-sm">
                Shop Now
              </button>
              <div className="absolute top-3 right-3 text-xs bg-emerald-700 text-white px-2 py-1 rounded-md">
                Expires in {deals[0].expires}
              </div>
            </div>

            {/* Mini Deals */}
            <div className="grid gap-5">
              {deals.slice(1).map((c, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 shadow-sm border hover:border-emerald-300 transition-all"
                >
                  <h4 className="font-medium text-gray-800">{c.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{c.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="bg-gray-100 px-2 py-1 text-xs font-mono rounded text-gray-700">
                      {c.code}
                    </span>
                    <button className="text-xs text-emerald-600 hover:underline">
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Classy Products */}
        <section className="mt-14">
          <p className="text-center text-xs tracking-wider text-gray-500">
            Our Pick
          </p>
          <h2 className="mt-1 text-center text-2xl font-semibold text-gray-800">
            Classy Products
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <button className="px-4 py-1.5 rounded-full bg-emerald-700 text-white">
              New
            </button>
            <button className="px-4 py-1.5 rounded-full border">
              Trending
            </button>
            <button className="px-4 py-1.5 rounded-full border">
              Best Sellers
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {classy.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl overflow-hidden border border-emerald-50 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-3 text-sm">
                  <p className="font-medium">{p.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-emerald-700 font-semibold">
                      ₹{p.price}
                    </span>
                    <button className="text-xs bg-emerald-700 text-white px-3 py-1 rounded hover:bg-emerald-800">
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
