import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CouponCard } from "@/components/common/CouponCard";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/productsApi";

export default function HomeDecor() {
  const [promoIndex, setPromoIndex] = useState(0);
  const [selectedChip, setSelectedChip] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [products, setProducts] = useState([]);

  const promos = [
    {
      title: "Festive Torans",
      subtitle: "Extra 10% off",
      img: "/images/beads.jpg",
    },
    {
      title: "Hand-painted Wall Art",
      subtitle: "New arrivals",
      img: "/images/beads.jpg",
    },
    {
      title: "Eco Decor Picks",
      subtitle: "Under ₹999",
      img: "/images/beads.jpg",
    },
  ];

  const fallbackProducts = [
    {
      id: 1,
      name: "Terracotta Vase",
      price: 999,
      image: "/images/vase.jpg",
      badge: "Eco",
    },
    {
      id: 2,
      name: "Hand-painted Wall Plate",
      price: 1299,
      image: "/images/platesss.jpg",
      badge: "Festive",
    },
    {
      id: 3,
      name: "Wooden Sculpture",
      price: 1599,
      image: "/images/wooden.jpg",
      badge: "New",
    },
    {
      id: 4,
      name: "Aromatic Candle",
      price: 499,
      image: "/images/candle.jpg",
      badge: "Eco",
    },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({ category: "home-decor", limit: 24 });
        setProducts(data);
      } catch (error) {
        console.error("Failed to load home decor products:", error);
      }
    };

    loadProducts();
  }, []);

  const displayProducts = products.length ? products : fallbackProducts;

  const toLabel = (value) => {
    if (!value) return "";
    return value
      .toString()
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const chipOptions = [
    "All",
    ...Array.from(
      new Set(
        displayProducts
          .map((p) => p.subCategory || p.category)
          .filter(Boolean)
          .map((entry) => toLabel(entry))
      )
    ),
  ];

  const tagOptions = [
    "All",
    ...Array.from(
      new Set(
        displayProducts
          .map((p) => p.tag || p.badge)
          .filter(Boolean)
          .map((entry) => toLabel(entry))
      )
    ),
  ];

  const filteredProducts = displayProducts.filter((product) => {
    const productChip = toLabel(product.subCategory || product.category);
    const productTag = toLabel(product.tag || product.badge);
    const chipMatch = selectedChip === "All" || productChip === selectedChip;
    const tagMatch = selectedTag === "All" || productTag === selectedTag;
    return chipMatch && tagMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "newest") {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    if (selectedSort === "price-low") {
      return Number(a.price || 0) - Number(b.price || 0);
    }
    if (selectedSort === "price-high") {
      return Number(b.price || 0) - Number(a.price || 0);
    }
    return 0;
  });

  const flashProducts = displayProducts
    .filter((p) => p.tag === "Sale" || p.badge === "Sale")
    .slice(0, 4);
  const displayFlashProducts = flashProducts.length
    ? flashProducts
    : displayProducts.slice(0, 4).map((item) => ({
      ...item,
      badge: "Sale",
      originalPrice: item.originalPrice || Math.round(item.price * 1.25),
    }));

  const coupons = [
    {
      code: "LOCAL10",
      discount: "10%",
      description: "Save 10% on select decor",
    },
    {
      code: "DECOR15",
      discount: "15%",
      description: "Save 15% on select decor",
    },
    {
      code: "FESTIVE20",
      discount: "20%",
      description: "Save 20% on select decor",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-12">
        {/* Promo carousel */}
        <section className="relative rounded-xl overflow-hidden">
          <img
            src={promos[promoIndex].img}
            alt={promos[promoIndex].title}
            className="w-full h-auto max-h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-start">
            <div className="px-6 py-10 sm:py-14 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {promos[promoIndex].title}
              </h1>
              <p className="text-white/90 mt-2">
                {promos[promoIndex].subtitle}
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("trending-deals");
                  element?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="mt-4 inline-block bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-emerald-700 transition cursor-pointer"
              >
                Shop Now
              </button>
              <div className="mt-6 flex gap-2">
                {promos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPromoIndex(i)}
                    className={`h-2 w-2 rounded-full ${i === promoIndex ? "bg-emerald-600" : "bg-white/50"
                      }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick filter chips */}
        <section className="flex gap-2 overflow-x-auto pb-1">
          {chipOptions.map((chip) => (
            <button
              key={chip}
              onClick={() => setSelectedChip(chip)}
              className={`whitespace-nowrap border px-3 py-1 rounded-full text-sm transition ${selectedChip === chip
                  ? "bg-emerald-700 text-white border-emerald-700"
                  : "hover:bg-emerald-50"
                }`}
            >
              {chip}
            </button>
          ))}
        </section>

        {/* Coupon cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.code} {...coupon} />
          ))}
        </section>

        {/* Featured collections */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Wall Art & Hangings", img: "/images/wallhanging.jpg" },
            { title: "Festive & Regional Decor", img: "/images/festive.jpg" },
          ].map((collection, i) => (
            <div
              key={collection.title}
              className="bg-white shadow rounded-md overflow-hidden"
            >
              <img
                src={collection.img}
                alt={collection.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">
                  {collection.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Explore curated picks handcrafted by local artisans.
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Sticky sort/utility bar */}
        <section className="flex items-center justify-between sticky top-16 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 z-10 py-2">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing {sortedProducts.length} results
            </p>
            <button
              onClick={() => {
                const element = document.getElementById("flash-sales");
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="bg-emerald-600 text-white text-sm px-3 py-1 rounded-md hover:bg-emerald-700 transition cursor-pointer"
            >
              Shop Deals
            </button>
          </div>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="popular">Sort: Popular</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <div className="hidden sm:flex items-center gap-2">
            {tagOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs border px-2 py-1 rounded-full transition ${selectedTag === tag
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "text-gray-700"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {sortedProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>

        {/* Flash Sales */}
        <section id="flash-sales">
          <SectionHeader title="Flash Sales" />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {displayFlashProducts.map((item) => (
              <ProductCard key={item.id} product={item} showBadge={true} />
            ))}
          </div>
        </section>

        {/* Trending deals */}
        <section id="trending-deals">
          <SectionHeader title="Trending Deals" />
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { img: "/images/beads.jpg", title: "Beaded Decor" },
              { img: "/images/fashion.jpg", title: "Wall Decor" },
              { img: "/images/candle.jpg", title: "Ceramic Vase" },
              { img: "/images/platesss.jpg", title: "Terracotta Pot" },
            ].map((deal, i) => (
              <div
                key={i}
                className="bg-white shadow rounded-md p-3 h-48 flex flex-col"
              >
                <p className="font-medium text-sm">Limited-time Deal</p>
                <p className="text-emerald-700 text-xs">Ends in 12:3{i + 1}</p>
                <img
                  src={deal.img}
                  alt={deal.title}
                  className="mt-2 h-32 w-full object-cover rounded flex-grow"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Editorial */}
        <section>
          <SectionHeader title="Artisan Stories" />
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                img: "/images/craft art (1).jpg",
                title: "Craft from Rajasthan",
                description:
                  "Traditional pottery techniques passed down through generations.",
              },
              {
                img: "/images/craft art (2).jpg",
                title: "Madhubani Artisans",
                description:
                  "Preserving ancient painting traditions with modern creativity.",
              },
            ].map((story, i) => (
              <div
                key={i}
                className="bg-white shadow rounded-md overflow-hidden h-80"
              >
                <img
                  src={story.img}
                  alt={story.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <p className="font-medium">{story.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {story.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer SEO text */}
        <section className="text-sm text-gray-600">
          <p>
            Explore Madhubani, Warli, Tanjore and eco-friendly home decor
            crafted by local artisans.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
