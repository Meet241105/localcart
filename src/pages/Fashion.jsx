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
import { useState } from "react";

export default function Fashion() {
  const [activeTab, setActiveTab] = useState("Trending");

  const topTabs = ["Trending", "New", "Sarees", "Khadi", "Fusion"];
  const cats = ["Clothing", "Accessories", "Western Wear", "Footwear"];
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
  const items = [
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

  const flashItems = [
    {
      name: "Potli Bag Set",
      img: "/images/potli2.jpeg",
      price: 899,
      originalPrice: 1199,
    },
    {
      name: "Fashion Accessory",
      img: "/images/fashion2.jpg",
      price: 999,
      originalPrice: 1299,
    },
    {
      name: "Woolen Scarf",
      img: "/images/wool2.jpg",
      price: 1099,
      originalPrice: 1399,
    },
    {
      name: "Designer Purse",
      img: "/images/purse1.jpg",
      price: 1199,
      originalPrice: 1499,
    },
  ];

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
          backgroundImage="/images/fashion.jpg"
        />

        {/* Utility badges */}
        <UtilityBadges badges={quick} />

        {/* Category icons row */}
        <CategoryChips categories={cats} />

        {/* Flash Sale */}
        <div>
          <FlashSale items={flashItems} />
        </div>

        {/* Popular subcategories tiles */}
        <section id="popular-categories">
          <SectionHeader title="Popular Categories" />
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {subs.map((category, i) => (
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
            {items.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddClick={(product) => console.log("Added to cart:", product)}
              />
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
