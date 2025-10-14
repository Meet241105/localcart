import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { InfoCard } from "@/components/toys/InfoCard";
import { StoryGallery } from "@/components/toys/StoryGallery";
import { CollectionsGrid } from "@/components/toys/CollectionsGrid";
import { NewsletterBanner } from "@/components/toys/NewsletterBanner";

export default function Toys() {
  const popular = [
    {
      id: 1,
      name: "Popular Toy 1",
      price: 399,
      img: "/images/t12.jpeg",
    },
    {
      id: 2,
      name: "Popular Toy 2",
      price: 469,
      img: "/images/t13.jpeg",
    },
    {
      id: 3,
      name: "Popular Toy 3",
      price: 539,
      img: "/images/t14.jpeg",
    },
    {
      id: 4,
      name: "Popular Toy 4",
      price: 609,
      img: "/images/t15.jpeg",
    },
    {
      id: 5,
      name: "Popular Toy 5",
      price: 679,
      img: "/images/t16.jpeg",
    },
    {
      id: 6,
      name: "Popular Toy 6",
      price: 749,
      img: "/images/t1.jpeg",
    },
    {
      id: 7,
      name: "Popular Toy 7",
      price: 819,
      img: "/images/t2.jpeg",
    },
    {
      id: 8,
      name: "Popular Toy 8",
      price: 889,
      img: "/images/t3.jpeg",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-12">
        {/* Hero - rounded banner */}
        <HeroSection
          variant="split"
          subtitle="Play • Learn • Create"
          title="Decorate Your Dream Space With Our Finest Collection"
          description="Explore curated educational and handcrafted toys that spark creativity and hands-on learning."
          primaryButtonText="Explore Collection"
          primaryButtonOnClick={() => {
            const element = document.getElementById("most-popular");
            element?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          secondaryButtonText="Learn More"
          backgroundColor="bg-[#efe9e2]"
          images={["/images/t1.jpeg", "/images/t2.jpeg"]}
        />

        {/* About Us + Story + Collections grid */}
        <section className="grid sm:grid-cols-3 gap-4">
          <InfoCard
            title="About Us"
            description="We source toys and DIY kits from Indian artisans and makers, focusing on quality, sustainability, and joyful learning."
            image="/images/t3.jpeg"
          />
          <InfoCard
            title="Our Story"
            description="From heritage wooden toys to modern DIY craft kits, our collection inspires creativity for all ages."
          >
            <StoryGallery
              images={[
                "/images/t4.jpeg",
                "/images/t5.jpeg",
                "/images/t6.jpeg",
                "/images/t7.jpeg",
              ]}
            />
          </InfoCard>
          <InfoCard title="Collections" description="">
            <CollectionsGrid
              images={[
                "/images/t8.jpeg",
                "/images/t9.jpeg",
                "/images/t10.jpeg",
                "/images/t11.jpeg",
              ]}
            />
          </InfoCard>
        </section>

        {/* Newsletter banner */}
        <NewsletterBanner
          title="Stay in the Loop for Exclusive Offers"
          description="Get updates on new DIY kits and traditional toys."
          placeholder="Your email"
          buttonText="Subscribe"
        />

        {/* Most Popular */}
        <section id="most-popular">
          <SectionHeader title="Most Popular" />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {popular.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddClick={(product) => console.log("Added to cart:", product)}
                showBadge={false}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
