import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CustomGiftingSection } from "@/components/gifts/CustomGiftingSection";
import { CategoryCard as GiftsCategoryCard } from "@/components/gifts/CategoryCard";
import { BackgroundPattern } from "@/components/gifts/BackgroundPattern";

export default function Gifts() {
  const featured = [
    {
      id: 1,
      name: "Handcrafted Wooden Frame",
      price: 1499,
      img: "/images/Handcrafted Wooden Frame.jpg",
    },
    {
      id: 2,
      name: "Resin Candle Holder",
      price: 999,
      img: "/images/Resin Candle Holder.jpg",
    },
    {
      id: 3,
      name: "Embroidered Gift Box",
      price: 1299,
      img: "/images/Embroidered Gift Box.jpeg",
    },
    {
      id: 4,
      name: "Artisanal Paper Journal",
      price: 899,
      img: "/images/Artisanal Paper Journal.jpeg",
    },
  ];

  const subs = [
    {
      title: "Decorative Items",
      desc: "Wooden Carvings & Toys • Candle Holders, Lamps • Resin Art Decor",
      img: "/images/Decorative Items.jpg",
    },
    {
      title: "Personalized Creations",
      desc: "Custom Embroidered Gifts",
      img: "/images/Personalized Creations.jpeg",
    },
    {
      title: "Stationery & Office",
      desc: "Handmade Journals / Notebooks • Upcycled Paper Products • Embossed Paper Crafts",
      img: "/images/Artisanal Paper Journal.jpeg",
    },
    {
      title: "Festive & Souvenir Gifts",
      desc: "Rakhi, Cultural Souvenirs, Wedding Gifts • Festive & Cultural Specials",
      img: "/images/Festive & Souvenir Gifts.jpeg",
    },
    {
      title: "Corporate Gifting",
      desc: "Eco Hampers • Artisanal Stationery",
      img: "/images/Corporate Gifting.jpeg",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="relative container mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-16">
        {/* Background Pattern */}
        <BackgroundPattern />
        {/* Hero Section */}
        <HeroSection
          variant="overlay"
          title="Handcrafted Gifts, Timeless Stories"
          description="Discover uniquely crafted gifts that celebrate culture, creativity, and care."
          primaryButtonText="Explore Collection"
          backgroundImage="/images/handicraft.jpg"
        />

        {/* Best Sellers */}
        <section className="relative z-10">
          <SectionHeader title="Best Sellers" centered />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {featured.map((p, index) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddClick={(product) => console.log("Added to cart:", product)}
                showBadge={false}
                isSpecial={index === 3}
              />
            ))}
          </div>
        </section>

        {/* Custom Gifting Section */}
        <CustomGiftingSection
          title="Custom Gifting for Every Occasion"
          description="From thoughtful personalized creations to sophisticated corporate hampers — make your gifts truly memorable. Every detail is crafted with heart."
          image="/images/Custom Gifting for Every Occasion.jpeg"
          buttons={[
            { text: "Personalized", primary: true },
            { text: "Corporate", primary: false },
          ]}
        />

        {/* Shop by Category */}
        <section className="relative z-10">
          <SectionHeader title="Shop by Category" centered />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subs.map((category, index) => (
              <GiftsCategoryCard
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
