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
      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* split hero */}
        <section className="rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="grid sm:grid-cols-3">
            <div className="sm:col-span-2 p-6 sm:p-10 bg-emerald-50">
              <p className="text-sm text-gray-600">
                Wedding & Occasion Jewelry
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-1">
                Crafted to Celebrate
              </h1>
              <p className="text-gray-600 mt-2">
                Traditional, fusion and personalized pieces by local artisans.
              </p>
              <div className="mt-4 flex gap-3">
                <button className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-md">
                  Buy Now
                </button>
                <button className="border border-emerald-600 text-emerald-700 text-sm px-4 py-2 rounded-md">
                  View Styles
                </button>
              </div>
            </div>
            <div className="h-48 sm:h-full bg-[url('/images/jewel-hero.jpg')] bg-cover bg-center" />
          </div>
        </section>

        {/* explore by style icons */}
        <section className="mt-6 bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm font-medium text-gray-800 mb-3">
            Explore by Style
          </p>
          <div className="flex items-center gap-3 overflow-x-auto">
            {styles.map((s, i) => (
              <div key={s} className="flex flex-col items-center min-w-16">
                <div className="h-10 w-10 rounded-full bg-emerald-100" />
                <span className="text-xs mt-1 text-gray-700 whitespace-nowrap">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* featured collections grid */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Explore Collections
            </h2>
            <a className="text-sm text-emerald-700" href="#">
              View all
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  <p className="font-semibold text-sm sm:text-base">{p.name}</p>
                  <p className="text-emerald-600 text-sm sm:text-base">
                    ₹{p.price}
                  </p>
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
