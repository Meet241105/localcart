import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Toys() {
  const categories = [
    { t: "Traditional Cloth / Wooden Toys", img: "/images/images (1).jpeg" },
    {
      t: "DIY Kits: Crochet, Embroidery, Painting, Resin Art",
      img: "/images/images (2).jpeg",
    },
    {
      t: "Adult DIY Craft Kits for Experiential Learning",
      img: "/images/images (3).jpeg",
    },
  ];

  const popular = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Popular Toy ${i + 1}`,
    price: 399 + i * 70,
    img: `/images/gift-${(i % 4) + 1}.jpg`,
  }));

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* Hero - rounded banner */}
        <section className="rounded-2xl overflow-hidden bg-[#efe9e2]">
          <div className="grid sm:grid-cols-2 gap-6 items-center">
            <div className="p-6 sm:p-10">
              <p className="text-xs uppercase tracking-wider text-gray-600">
                Play • Learn • Create
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                Decorate Your Dream Space With Our Finest Collection
              </h1>
              <p className="text-gray-700 mt-3 max-w-xl">
                Explore curated educational and handcrafted toys that spark
                creativity and hands-on learning.
              </p>
              <div className="mt-5 flex gap-3">
                <button className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-md">
                  Explore Collection
                </button>
                <button className="border text-sm px-4 py-2 rounded-md">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative min-h-[240px] sm:min-h-[300px]">
              <img
                src="/images/decor.jpg"
                alt="Hero"
                className="absolute right-6 top-6 w-44 sm:w-64 h-44 sm:h-64 object-cover rounded-xl shadow"
              />
              <img
                src="/images/artisan-display.jpg"
                alt="Alt"
                className="absolute right-28 sm:right-44 bottom-6 w-28 sm:w-40 h-28 sm:h-40 object-cover rounded-xl shadow"
              />
            </div>
          </div>
        </section>

        {/* Top Categories */}
        <section className="mt-8">
          <h2 className="text-center text-xl font-semibold text-gray-800">
            Top Categories
          </h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((c) => (
              <div
                key={c.t}
                className="relative rounded-xl overflow-hidden group"
              >
                <img
                  src={c.img}
                  alt={c.t}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition" />
                <div className="absolute inset-0 p-4 text-white flex items-end">
                  <span className="text-sm font-medium">{c.t}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Us + Story + Collections grid */}
        <section className="mt-10 grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-gray-800">About Us</h3>
            <p className="mt-2 text-sm text-gray-600">
              We source toys and DIY kits from Indian artisans and makers,
              focusing on quality, sustainability, and joyful learning.
            </p>
            <img
              src="/images/handicraft.jpg"
              alt="About"
              className="mt-4 w-full h-36 object-cover rounded-lg"
            />
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-gray-800">Our Story</h3>
            <p className="mt-2 text-sm text-gray-600">
              From heritage wooden toys to modern DIY craft kits, our collection
              inspires creativity for all ages.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <img
                src="/images/images (2).jpeg"
                className="h-28 w-full object-cover rounded-md"
              />
              <img
                src="/images/images (3).jpeg"
                className="h-28 w-full object-cover rounded-md"
              />
              <img
                src="/images/images (4).jpeg"
                className="h-28 w-full object-cover rounded-md"
              />
              <img
                src="/images/images.jpeg"
                className="h-28 w-full object-cover rounded-md"
              />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-gray-800">Collections</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/images/download (5).jpeg"
                  className="h-28 w-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/images/images (1).jpeg"
                  className="h-28 w-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/images/jewelry.jpg"
                  className="h-28 w-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/images/fashion.jpg"
                  className="h-28 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter banner */}
        <section className="mt-10 rounded-2xl overflow-hidden bg-[#efe9e2]">
          <div className="p-6 sm:p-10 grid sm:grid-cols-2 items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Stay in the Loop for Exclusive Offers
              </h3>
              <p className="text-sm text-gray-700 mt-2">
                Get updates on new DIY kits and traditional toys.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 border rounded-md px-3 py-2"
              />
              <button className="bg-emerald-600 text-white px-4 rounded-md">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Most Popular */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800">Most Popular</h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {popular.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-md shadow overflow-hidden"
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
