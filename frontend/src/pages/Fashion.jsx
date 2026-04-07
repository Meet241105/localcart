import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { ProductCard } from "@/components/common/ProductCard";
import { CategoryCard } from "@/components/common/CategoryCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FlashSale } from "@/components/common/FlashSale";
import { TabFilter } from "@/components/common/TabFilter";
import { UtilityBadges } from "@/components/fashion/UtilityBadges";
import { CategoryChips } from "@/components/fashion/CategoryChips";
import { BottomBanner } from "@/components/fashion/BottomBanner";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/productsApi";

export default function Fashion() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [items, setItems] = useState([]);

  const quick = [
    "Free Delivery",
    "Support 24/7",
    "Easy Return",
    "Secure Pay",
    "Big Saving",
  ];
  const subs = [
    { name: "Handloom Sarees", img: "/images/saree.jpg" },
    { name: "Dupattas", img: "/images/duppata.jpg" },
    { name: "Khadi", img: "/images/khadi.jpg" },
    { name: "Woolen", img: "/images/wool.jpg" },
  ];
  const fallbackItems = [
    {
      id: 1,
      name: "Elegant Saree",
      price: 1299,
      tag: "Best",
      img: "/images/saree.jpg",
    },
    {
      id: 2,
      name: "Cotton Kurta",
      price: 1379,
      tag: "New",
      img: "/images/cloth.jpg",
    },
    {
      id: 3,
      name: "Khadi Set",
      price: 1459,
      tag: "Eco",
      img: "/images/khadi.jpg",
    },
    {
      id: 4,
      name: "Woolen Shawl",
      price: 1539,
      tag: "Best",
      img: "/images/wool.jpg",
    },
    {
      id: 5,
      name: "Designer Dupatta",
      price: 1619,
      tag: "New",
      img: "/images/duppata.jpg",
    },
    {
      id: 6,
      name: "Fashion Top",
      price: 1699,
      tag: "Eco",
      img: "/images/fashion.jpg",
    },
    {
      id: 7,
      name: "Handbag",
      price: 1779,
      tag: "Best",
      img: "/images/purse.jpg",
    },
    {
      id: 8,
      name: "Pearl Necklace",
      price: 1859,
      tag: "New",
      img: "/images/pearl.jpeg",
    },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({ category: "fashion", limit: 24 });
        setItems(data);
      } catch (error) {
        console.error("Failed to load fashion products:", error);
      }
    };

    loadProducts();
  }, []);

  const displayItems = items.length ? items : fallbackItems;

  const toLabel = (value) => {
    if (!value) return "";
    return value
      .toString()
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const topTabs = [
    "All",
    ...Array.from(
      new Set(
        displayItems
          .map((item) => item.tag || item.badge)
          .filter(Boolean)
          .map((tag) => toLabel(tag))
      )
    ),
  ];

  const cats = [
    "All",
    ...Array.from(
      new Set(
        displayItems
          .map((item) => item.subCategory || item.category)
          .filter(Boolean)
          .map((cat) => toLabel(cat))
      )
    ),
  ];

  const filteredItems = displayItems.filter((item) => {
    const itemTag = toLabel(item.tag || item.badge);
    const itemCategory = toLabel(item.subCategory || item.category);
    const tagMatch = activeTab === "All" || itemTag === activeTab;
    const categoryMatch = activeCategory === "All" || itemCategory === activeCategory;
    return tagMatch && categoryMatch;
  });

  const flashItems = filteredItems.slice(0, 4).map((item) => ({
    name: item.name,
    img: item.img || item.image,
    price: item.price,
    originalPrice: item.originalPrice || Math.round(item.price * 1.25),
  }));

  const dynamicSubs = Array.from(
    new Map(
      filteredItems.map((item) => {
        const key = toLabel(item.subCategory || item.category || item.name);
        return [
          key,
          {
            name: key,
            img: item.img || item.image || "/images/fashion.jpg",
          },
        ];
      })
    ).values()
  ).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-12">
        {/* Hero */}
        <HeroSection
          subtitle="Big Fashion Sale"
          title="Up to 50% OFF"
          description="Redefine your everyday style"
          primaryButtonText="Shop Deals"
          onPrimaryClick={() => {
            const element = document.getElementById("popular-categories");
            element?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          backgroundImage="/images/fashion.jpg"
        />

        {/* Utility badges */}
        <UtilityBadges badges={quick} />

        {/* Category icons row */}
        <CategoryChips
          categories={cats}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Flash Sale */}
        <div>
          <FlashSale items={flashItems} />
        </div>

        {/* Popular subcategories tiles */}
        <section id="popular-categories">
          <SectionHeader title="Popular Categories" />
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(dynamicSubs.length ? dynamicSubs : subs).map((category) => (
              <CategoryCard
                key={category.name}
                category={{
                  name: category.name,
                  img: category.img,
                }}
              />
            ))}
          </div>
        </section>

        {/* Tabs + grid */}
        <section>
          <TabFilter
            tabs={topTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Bottom banner */}
        <BottomBanner
          backgroundImage="/images/fashion3.jpg"
          brand="Studio.w"
          title="Collections to mix & match"
          buttonText="Explore Looks"
          onButtonClick={() => {
            const element = document.getElementById("popular-categories");
            element?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      </main>
      <Footer />
    </>
  );
}
