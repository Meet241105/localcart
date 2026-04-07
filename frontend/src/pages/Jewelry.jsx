import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StyleExplorer } from "@/components/jewelry/StyleExplorer";
import { CollectionBanner } from "@/components/jewelry/CollectionBanner";
import { GalleryGrid } from "@/components/jewelry/GalleryGrid";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/productsApi";

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

  const [items, setItems] = useState([]);

  const fallbackItems = [
    { id: 1, name: "Jewelry 1", price: 799, img: "/images/j1.jpg" },
    { id: 2, name: "Jewelry 2", price: 869, img: "/images/j2.jpg" },
    { id: 3, name: "Jewelry 3", price: 939, img: "/images/j3.jpg" },
    { id: 4, name: "Jewelry 4", price: 1009, img: "/images/j4.jpg" },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({ category: "jewelry", limit: 24 });
        setItems(data);
      } catch (error) {
        console.error("Failed to load jewelry products:", error);
      }
    };

    loadProducts();
  }, []);

  const displayItems = items.length ? items : fallbackItems;

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
                  <button
                    onClick={() => {
                      const element =
                        document.getElementById("featured-products");
                      element?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition"
                  >
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
              onViewAllClick={() => { }}
            />
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {displayItems.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} showBadge={false} />
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
              <GalleryGrid products={displayItems.slice(0, 4)} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
