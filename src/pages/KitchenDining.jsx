import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureRow } from "@/components/common/FeatureRow";
import { CategoryGrid } from "@/components/kitchen-dining/CategoryGrid";
import { DealsGrid } from "@/components/kitchen-dining/DealsGrid";
import { ClassyProducts } from "@/components/kitchen-dining/ClassyProducts";
import { Leaf, Hand, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

export default function KitchenDining() {
  const [activeTab, setActiveTab] = useState("New");

  const tiles = [
    {
      t: "Serveware & Utensils",
      s: "Hand-painted Ceramics",
      img: "/images/d7.jpg",
    },
    {
      t: "Wooden & Stone Cookware",
      s: "Handcrafted Kitchen Tools",
      img: "/images/pot.jpeg",
    },
    {
      t: "Textiles & Dining Decor",
      s: "Embroidered Linens",
      img: "/images/d2.jpeg",
    },
    {
      t: "Crochet Coasters & Mats",
      s: "Placemats & more",
      img: "/images/d1.jpeg",
    },
    {
      t: "Artisanal Food & Beverages",
      s: "Spices, Teas & Pickles",
      img: "/images/food.jpg",
    },
    {
      t: "Traditional Cookware",
      s: "Brass • Copper • Clay",
      img: "/images/traditional cookaware.jpg",
    },
  ];

  const classy = [
    {
      id: 1,
      name: "Editor's Pick 1",
      price: 699,
      img: "/images/d1.jpeg",
    },
    {
      id: 2,
      name: "Editor's Pick 2",
      price: 819,
      img: "/images/d2.jpeg",
    },
    {
      id: 3,
      name: "Editor's Pick 3",
      price: 939,
      img: "/images/d3.jpeg",
    },
    {
      id: 4,
      name: "Editor's Pick 4",
      price: 1059,
      img: "/images/d4.jpeg",
    },
    {
      id: 5,
      name: "Editor's Pick 5",
      price: 1179,
      img: "/images/d5.jpeg",
    },
    {
      id: 6,
      name: "Editor's Pick 6",
      price: 1299,
      img: "/images/d6.jpg",
    },
    {
      id: 7,
      name: "Editor's Pick 7",
      price: 1419,
      img: "/images/d7.jpg",
    },
    {
      id: 8,
      name: "Editor's Pick 8",
      price: 1539,
      img: "/images/d8.jpg",
    },
  ];

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

  const features = [
    { icon: Leaf, label: "Natural Materials" },
    { icon: Hand, label: "Handcrafted" },
    { icon: Truck, label: "Fast Delivery" },
    { icon: ShieldCheck, label: "Trusted Quality" },
    { icon: Sparkles, label: "Easy Care" },
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-12">
        {/* Hero Section */}
        <HeroSection
          variant="split"
          subtitle="Kitchen & Dining"
          title="Modern Artistry for Every Table"
          description="Handcrafted essentials and contemporary cookware that blend tradition with modern living — each piece tells a story."
          primaryButtonText="Explore Collection"
          primaryButtonOnClick={() => {
            const element = document.getElementById("classy-products");
            element?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          backgroundColor="bg-[#f1e8dd]"
          images={["/images/d7.jpg", "/images/d8.jpg"]}
        />

        {/* Features Row */}
        <section>
          <FeatureRow features={features} />
        </section>

        {/* Category Grid */}
        <section>
          <CategoryGrid categories={tiles} />
        </section>

        {/* Deals & Specials */}
        <section>
          <SectionHeader title="Deals of the Day" onViewAllClick={() => {}} />
          <DealsGrid deals={deals} />
        </section>

        {/* Classy Products */}
        <ClassyProducts
          title="Classy Products"
          subtitle="Our Pick"
          products={classy}
          tabs={["New", "Trending", "Best Sellers"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddClick={(product) => console.log("Added to cart:", product)}
        />
      </main>
      <Footer />
    </>
  );
}
