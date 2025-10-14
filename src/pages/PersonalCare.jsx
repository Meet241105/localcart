import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CategoryStrip } from "@/components/personal-care/CategoryStrip";
import { HeroBanner } from "@/components/personal-care/HeroBanner";
import { SidebarCategories } from "@/components/personal-care/SidebarCategories";
import { DealsSection } from "@/components/personal-care/DealsSection";
import { SidebarWidget } from "@/components/personal-care/SidebarWidget";

export default function PersonalCare() {
  const strip = [
    { t: "Skincare", img: "/images/b1.jpeg" },
    { t: "Haircare", img: "/images/b2.jpeg" },
    { t: "Wellness", img: "/images/b3.jpeg" },
    { t: "Soaps", img: "/images/b4.jpeg" },
    { t: "Tees", img: "/images/p5.jpg" },
  ];

  const deals = [
    {
      id: 1,
      name: "Deal 1",
      price: 299,
      img: "/images/b1.jpeg",
    },
    {
      id: 2,
      name: "Deal 2",
      price: 349,
      img: "/images/b2.jpeg",
    },
    {
      id: 3,
      name: "Deal 3",
      price: 399,
      img: "/images/b3.jpeg",
    },
  ];

  const leftCats = [
    "Traditional Wear",
    "Western Wear",
    "Swim & Beachwear",
    "Winter & Seasonal Wear",
    "Beauty & Grooming",
    "Jewellery",
    "Personal care Appliances",
    "International Brands",
    "Foot Wear",
    "Watches",
    "Accessories",
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-12">
        {/* Pastel category strip + hero */}
        <section>
          <CategoryStrip categories={strip} />
          <HeroBanner
            title="Personal Care & Wellness"
            image="/images/b4.jpeg"
            buttons={[
              { text: "Shop Women", primary: true },
              { text: "Shop Men", primary: false },
            ]}
          />
        </section>

        {/* Dashboard grid: left categories, center promos, right sidebar */}
        <section className="grid grid-cols-12 gap-4">
          {/* Left */}
          <SidebarCategories categories={leftCats} />

          {/* Center */}
          <div className="col-span-12 sm:col-span-6 grid gap-4">
            <DealsSection
              title="More Deals Inside"
              description="Up to 50% Off"
              buttonText="Wishlist Now"
              images={[
                "/images/p5.jpg",
                "/images/p6.jpg",
                "/images/b1.jpeg",
                "/images/b2.jpeg",
              ]}
            />
          </div>

          {/* Right sidebar */}
          <aside className="hidden sm:block col-span-3 space-y-4">
            <SidebarWidget title="Recently Viewed" image="/images/b3.jpeg" />
            <SidebarWidget
              title="Suggestions for You"
              image="/images/p6.jpg"
              description="Watch more"
            />
          </aside>
        </section>

        {/* Deals of the Day */}
        <section>
          <div className="flex items-center justify-between">
            <SectionHeader title="Deals of the Day" />
            <span className="text-sm text-red-600">20 : 45 : 12 Left</span>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {deals.map((d) => (
              <ProductCard
                key={d.id}
                product={d}
                showBadge={false}
                onAddClick={(product) => console.log("Added to cart:", product)}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
