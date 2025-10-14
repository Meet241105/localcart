import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Gifts() {
  const featured = [
    { id: 1, name: "Handcrafted Wooden Frame", price: 1499, img: "/images/feat-1.jpg" },
    { id: 2, name: "Resin Candle Holder", price: 999, img: "/images/feat-2.jpg" },
    { id: 3, name: "Embroidered Gift Box", price: 1299, img: "/images/feat-3.jpg" },
    { id: 4, name: "Artisanal Paper Journal", price: 899, img: "/images/feat-4.jpg" },
  ];

  const subs = [
    {
      title: "Decorative Items",
      desc: "Wooden Carvings & Toys • Candle Holders, Lamps • Resin Art Decor",
      img: "/images/gift-decor.jpg",
    },
    {
      title: "Personalized Creations",
      desc: "Custom Embroidered Gifts",
      img: "/images/gift-personal.jpg",
    },
    {
      title: "Stationery & Office",
      desc: "Handmade Journals / Notebooks • Upcycled Paper Products • Embossed Paper Crafts",
      img: "/images/gift-stationery.jpg",
    },
    {
      title: "Festive & Souvenir Gifts",
      desc: "Rakhi, Cultural Souvenirs, Wedding Gifts • Festive & Cultural Specials",
      img: "/images/gift-festive.jpg",
    },
    {
      title: "Corporate Gifting",
      desc: "Eco Hampers • Artisanal Stationery",
      img: "/images/gift-corporate.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-8 py-10 space-y-16">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden bg-[url('/images/gifts-hero.jpg')] bg-cover bg-center">
          <div className="bg-white/70 backdrop-blur-sm p-10 sm:p-16 md:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
              Handcrafted Gifts, Timeless Stories
            </h1>
            <p className="mt-4 text-gray-700 text-base sm:text-lg">
              Discover uniquely crafted gifts that celebrate culture, creativity, and care.
            </p>
            <button className="mt-6 bg-emerald-600 text-white px-5 py-2 rounded-md shadow hover:bg-emerald-700 transition">
              Explore Collection
            </button>
          </div>
        </section>

        {/* Best Sellers */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Best Sellers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {featured.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl overflow-hidden border border-emerald-50 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-4 text-sm">
                  <p className="font-medium text-gray-800">{p.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-emerald-700 font-semibold">₹{p.price}</span>
                    <button className="text-xs bg-emerald-600 text-white px-3 py-1 rounded">
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Gifting Section */}
        <section className="grid sm:grid-cols-2 gap-8 items-center">
          <div className="rounded-xl overflow-hidden">
            <img
              src="/images/gift-custom.jpg"
              alt="Custom Gifts"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Custom Gifting for Every Occasion
            </h3>
            <p className="text-gray-600 leading-relaxed">
              From thoughtful personalized creations to sophisticated corporate hampers —
              make your gifts truly memorable. Every detail is crafted with heart.
            </p>
            <div className="flex gap-4">
              <button className="bg-emerald-600 text-white px-5 py-2 rounded-md">
                Personalized
              </button>
              <button className="border border-emerald-600 text-emerald-700 px-5 py-2 rounded-md">
                Corporate
              </button>
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subs.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl border border-emerald-50 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <img src={s.img} alt={s.title} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">{s.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
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
