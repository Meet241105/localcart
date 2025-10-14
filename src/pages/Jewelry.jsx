import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StyleExplorer } from "@/components/jewelry/StyleExplorer";
import { CollectionBanner } from "@/components/jewelry/CollectionBanner";
import { GalleryGrid } from "@/components/jewelry/GalleryGrid";

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

  const items = [
    { id: 1, name: "Jewelry 1", price: 799, img: "/images/j1.jpg" },
    { id: 2, name: "Jewelry 2", price: 869, img: "/images/j2.jpg" },
    { id: 3, name: "Jewelry 3", price: 939, img: "/images/j3.jpg" },
    { id: 4, name: "Jewelry 4", price: 1009, img: "/images/j4.jpg" },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50 space-y-16 py-8">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
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
                  <button
                    onClick={() => {
                      const element =
                        document.getElementById("featured-products");
                      element?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-5 py-2.5 rounded-md text-sm font-medium transition cursor-pointer"
                  >
                    View Collections
                  </button>
                </div>
              </div>
              <div className="h-[420px] md:h-auto bg-[url('/images/jewel-hero.jpg')] bg-cover bg-center" />
            </div>
          </section>

          {/* EXPLORE BY STYLE */}
          <section>
            <SectionHeader title="Explore by Style" />
            <StyleExplorer styles={styles} />
          </section>

          {/* FEATURED PRODUCTS */}
          <section id="featured-products">
            <SectionHeader
              title="Featured Products"
              onViewAllClick={() => {}}
            />
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {items.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
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
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-emerald-600 font-medium text-sm sm:text-base">
                        ₹{p.price}
                      </p>
                      <button
                        onClick={() => console.log("Added to cart:", p)}
                        className="text-xs bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* GALLERY / COLLECTIONS GRID */}
          <section className="pb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <CollectionBanner
                title="Antique Style"
                description="Uncover vintage charm with modern craftsmanship."
                buttonText="Explore Now"
                backgroundImage="/images/jdark.jpg"
              />
              <GalleryGrid
                products={items.slice(0, 4)}
                onAddClick={(product) => console.log("Added to cart:", product)}
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
