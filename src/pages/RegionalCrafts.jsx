import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureRow } from "@/components/common/FeatureRow";
import { DealCard } from "@/components/common/DealCard";
import { StateGrid } from "@/components/regional-crafts/StateGrid";
import { TechniqueGrid } from "@/components/regional-crafts/TechniqueGrid";
import { ArtisanStory } from "@/components/regional-crafts/ArtisanStory";
import {
  Heart,
  Users,
  Award,
  Clock,
  MapPin,
  Sparkles,
  Hand,
  Layers,
  Palette,
  Package,
  Hammer,
  Scissors,
  Flame,
  Ruler,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function RegionalCrafts() {
  const [activeStateTab, setActiveStateTab] = useState("Rajasthan");
  const [activeTechniqueTab, setActiveTechniqueTab] = useState("All");

  // Handle scroll to section when page loads with hash
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  // Hero Images
  const heroImages = ["/images/handicraft.jpg", "/images/rajastahn art.jpg"];

  // Features for artisan support
  const features = [
    { icon: Heart, label: "Supporting 500+ Artisans" },
    { icon: Award, label: "Award-Winning Crafts" },
    { icon: Hand, label: "100% Handmade" },
    { icon: MapPin, label: "Pan-India Crafts" },
    { icon: Sparkles, label: "Authentic & Unique" },
  ];

  // State-wise crafts
  const stateCategories = [
    {
      t: "Rajasthan",
      s: "Block Prints • Bandhani • Blue Pottery",
      img: "/images/rajastahn art.jpg",
      artisans: 120,
    },
    {
      t: "West Bengal",
      s: "Kantha Stitch • Terracotta • Dokra",
      img: "/images/cloth.jpg",
      artisans: 85,
    },
    {
      t: "Gujarat",
      s: "Bandhani • Patola • Mirror Work",
      img: "/images/duppata.jpg",
      artisans: 95,
    },
    {
      t: "Kashmir",
      s: "Pashmina • Paper Mache • Carpets",
      img: "/images/wool.jpeg",
      artisans: 70,
    },
    {
      t: "Tamil Nadu",
      s: "Kanjeevaram Silk • Bronze • Tanjore Art",
      img: "/images/saree.jpg",
      artisans: 110,
    },
    {
      t: "Uttar Pradesh",
      s: "Chikankari • Zardozi • Brass Work",
      img: "/images/purse.jpg",
      artisans: 130,
    },
  ];

  // Technique-based categories
  const techniqueCategories = [
    {
      id: 1,
      name: "Hand Weaving",
      description: "Traditional looms creating intricate patterns",
      icon: Layers,
      craftTime: "15-30 days",
      img: "/images/wool2.jpg",
    },
    {
      id: 2,
      name: "Block Printing",
      description: "Centuries-old wooden block stamping",
      icon: Palette,
      craftTime: "7-14 days",
      img: "/images/rajastahn art.jpg",
    },
    {
      id: 3,
      name: "Pottery & Ceramics",
      description: "Hand-molded clay masterpieces",
      icon: Package,
      craftTime: "10-20 days",
      img: "/images/handmadevase.jpeg",
    },
    {
      id: 4,
      name: "Metal Craft",
      description: "Brass, copper, and bronze artistry",
      icon: Hammer,
      craftTime: "20-40 days",
      img: "/images/traditional cookaware.jpg",
    },
    {
      id: 5,
      name: "Embroidery",
      description: "Thread work with precision and passion",
      icon: Scissors,
      craftTime: "12-25 days",
      img: "/images/purse1.jpg",
    },
    {
      id: 6,
      name: "Wood Carving",
      description: "Sculpting stories in timber",
      icon: Flame,
      craftTime: "25-45 days",
      img: "/images/wooden.jpg",
    },
  ];

  // Products organized by type
  const productsByType = {
    Rajasthan: [
      {
        id: 1,
        name: "Blue Pottery Vase",
        price: 1299,
        img: "/images/handmadevase.jpeg",
        artisan: "Mukesh Sharma",
        craftTime: "12 hours",
        location: "Jaipur",
      },
      {
        id: 2,
        name: "Bandhani Dupatta",
        price: 899,
        img: "/images/duppata.jpg",
        artisan: "Geeta Devi",
        craftTime: "20 hours",
        location: "Jodhpur",
      },
      {
        id: 3,
        name: "Block Print Wall Hanging",
        price: 1599,
        img: "/images/wallhanging.jpg",
        artisan: "Ramesh Kumar",
        craftTime: "8 hours",
        location: "Sanganer",
      },
      {
        id: 4,
        name: "Rajasthani Art Plate",
        price: 749,
        img: "/images/platesss.jpg",
        artisan: "Lakshmi Artisans",
        craftTime: "6 hours",
        location: "Jaipur",
      },
    ],
    "West Bengal": [
      {
        id: 5,
        name: "Kantha Cloth Purse",
        price: 599,
        img: "/images/purse.jpg",
        artisan: "Anjali Das",
        craftTime: "15 hours",
        location: "Shantiniketan",
      },
      {
        id: 6,
        name: "Terracotta Decorative Pot",
        price: 449,
        img: "/images/pot.jpeg",
        artisan: "Somnath Pal",
        craftTime: "10 hours",
        location: "Bankura",
      },
      {
        id: 7,
        name: "Bengali Textile Art",
        price: 1199,
        img: "/images/cloth.jpg",
        artisan: "Priya Collective",
        craftTime: "25 hours",
        location: "Kolkata",
      },
      {
        id: 8,
        name: "Handwoven Fabric",
        price: 999,
        img: "/images/wool.jpg",
        artisan: "Suresh Weaver",
        craftTime: "30 hours",
        location: "Murshidabad",
      },
    ],
    Gujarat: [
      {
        id: 9,
        name: "Mirror Work Potli",
        price: 699,
        img: "/images/potli.jpeg",
        artisan: "Kiran Patel",
        craftTime: "14 hours",
        location: "Kutch",
      },
      {
        id: 10,
        name: "Bandhani Saree",
        price: 2499,
        img: "/images/saree.jpg",
        artisan: "Vimla Ben",
        craftTime: "40 hours",
        location: "Bhuj",
      },
      {
        id: 11,
        name: "Traditional Potli Bag",
        price: 549,
        img: "/images/potli2.jpeg",
        artisan: "Meera Crafts",
        craftTime: "10 hours",
        location: "Ahmedabad",
      },
      {
        id: 12,
        name: "Embroidered Potli",
        price: 649,
        img: "/images/potli3.jpeg",
        artisan: "Rajesh Artisan",
        craftTime: "12 hours",
        location: "Kutch",
      },
    ],
  };

  // Artisan Stories
  const artisanStories = [
    {
      id: 1,
      name: "Geeta Devi",
      craft: "Bandhani Specialist",
      location: "Jodhpur, Rajasthan",
      experience: "35 years",
      story:
        "Every tie and dye tells a story of desert blooms and royal heritage. I learned this art from my grandmother.",
      img: "/images/duppata.jpg",
      productsCreated: "2,000+",
    },
    {
      id: 2,
      name: "Mukesh Sharma",
      craft: "Blue Pottery Artist",
      location: "Jaipur, Rajasthan",
      experience: "22 years",
      story:
        "The ancient Persian technique flows through my hands, creating pieces that blend tradition with contemporary design.",
      img: "/images/handmadevase.jpeg",
      productsCreated: "1,500+",
    },
    {
      id: 3,
      name: "Anjali Das",
      craft: "Kantha Embroidery Expert",
      location: "Shantiniketan, West Bengal",
      experience: "28 years",
      story:
        "Each stitch is a meditation, each pattern a prayer. Kantha is not just craft, it's our living heritage.",
      img: "/images/purse.jpg",
      productsCreated: "3,200+",
    },
  ];

  // Special Collections
  const curatedCollections = [
    {
      title: "Heritage Revival Collection",
      desc: "Rare crafts preserved by master artisans",
      discount: "20% Off",
      code: "HERITAGE20",
    },
    {
      title: "Festival Special",
      desc: "Handpicked festive crafts • Limited Edition",
      expires: "48:00:00",
    },
    {
      title: "Artisan Support Initiative",
      desc: "Direct impact • 100% proceeds to artisans",
      code: "SUPPORT",
    },
  ];

  // All products for showcase
  const allProducts = [
    ...productsByType.Rajasthan,
    ...productsByType["West Bengal"],
    ...productsByType.Gujarat,
  ];

  // Crafting phases with icons
  const craftingPhases = [
    { hours: "2-5", stage: "Design & Planning", Icon: Ruler },
    { hours: "5-15", stage: "Material Preparation", Icon: Layers },
    { hours: "10-40", stage: "Crafting Process", Icon: Hand },
    { hours: "2-8", stage: "Detailing & Finishing", Icon: Sparkles },
    { hours: "1-3", stage: "Quality Check", Icon: CheckCircle },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-emerald-50 via-white to-green-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-16">
          {/* HERO SECTION */}
          <HeroSection
            variant="split"
            subtitle="Regional & Cultural Crafts"
            title="Stories Woven by Hand, Heritage Crafted with Heart"
            description="Discover India's living heritage through authentic handmade crafts. Each piece carries the soul of an artisan, the legacy of centuries, and the promise of sustainable futures."
            primaryButtonText="Explore Collection"
            secondaryButtonText="Meet Our Artisans"
            backgroundColor="bg-gradient-to-br from-emerald-100 via-green-50 to-teal-50"
            images={heroImages}
          />

          {/* FEATURES ROW */}
          <section>
            <FeatureRow features={features} />
          </section>

          {/* IMPACT BANNER */}
          <section className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold">500+</div>
                <div className="text-emerald-100 text-sm mt-2">
                  Active Artisans
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold">15</div>
                <div className="text-emerald-100 text-sm mt-2">
                  Indian States
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold">30+</div>
                <div className="text-emerald-100 text-sm mt-2">
                  Traditional Techniques
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold">₹2.5Cr</div>
                <div className="text-emerald-100 text-sm mt-2">
                  Artisan Income Generated
                </div>
              </div>
            </div>
          </section>

          {/* EXPLORE BY STATE */}
          <section id="by-state" className="scroll-mt-20">
            <SectionHeader
              title="Explore by State"
              subtitle="Journey Through India's Craft Heartlands"
              centered
            />
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6">
              {stateCategories.map((state) => (
                <div
                  key={state.t}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  onClick={() => setActiveStateTab(state.t)}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={state.img}
                      alt={state.t}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{state.t}</h3>
                    <p className="text-sm text-emerald-200 mb-3">{state.s}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Users size={14} />
                      <span>{state.artisans} Artisans</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-emerald-600">
                      Featured
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* STATE SPECIFIC PRODUCTS */}
          <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Treasures from {activeStateTab}
                </h2>
                <p className="text-gray-600 mt-2">
                  Each piece tells a story of tradition and craftsmanship
                </p>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {Object.keys(productsByType).map((state) => (
                  <button
                    key={state}
                    onClick={() => setActiveStateTab(state)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      activeStateTab === state
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {productsByType[activeStateTab]?.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <div className="bg-emerald-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                        <Clock size={12} />
                        {product.craftTime}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                      <MapPin size={12} />
                      <span>{product.location}</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-3 italic">
                      By {product.artisan}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-emerald-600 font-bold text-lg">
                        ₹{product.price}
                      </div>
                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXPLORE BY TECHNIQUE */}
          <section id="by-technique" className="scroll-mt-20">
            <SectionHeader
              title="Explore by Craft Technique"
              subtitle="Mastery Passed Through Generations"
              centered
            />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {techniqueCategories.map((technique) => {
                const IconComponent = technique.icon;
                return (
                  <div
                    key={technique.id}
                    className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={technique.img}
                        alt={technique.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 text-emerald-600">
                        <IconComponent size={36} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {technique.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {technique.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-emerald-600">
                          <Clock size={16} />
                          <span className="font-medium">
                            {technique.craftTime}
                          </span>
                        </div>
                        <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                          Explore →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ARTISAN STORIES */}
          <section
            id="artisan-stories"
            className="scroll-mt-20 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12"
          >
            <SectionHeader
              title="Meet the Artisans"
              subtitle="The Hands Behind the Heritage"
              centered
            />
            <div className="mt-10 grid md:grid-cols-3 gap-8">
              {artisanStories.map((artisan) => (
                <div
                  key={artisan.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={artisan.img}
                      alt={artisan.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {artisan.name}
                    </h3>
                    <p className="text-emerald-600 font-medium text-sm mb-2">
                      {artisan.craft}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MapPin size={14} />
                      <span>{artisan.location}</span>
                    </div>
                    <p className="text-gray-700 text-sm italic mb-4 leading-relaxed">
                      "{artisan.story}"
                    </p>
                    <div className="border-t pt-4 grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="font-bold text-emerald-600">
                          {artisan.experience}
                        </div>
                        <div className="text-xs text-gray-500">Experience</div>
                      </div>
                      <div>
                        <div className="font-bold text-emerald-600">
                          {artisan.productsCreated}
                        </div>
                        <div className="text-xs text-gray-500">
                          Products Created
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CURATED COLLECTIONS & DEALS */}
          <section>
            <SectionHeader
              title="Special Collections"
              subtitle="Limited Time Offerings"
            />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {curatedCollections.map((collection, idx) => (
                <DealCard key={idx} deal={collection} />
              ))}
            </div>
          </section>

          {/* PRODUCT SHOWCASE BY CATEGORY */}
          <section>
            <SectionHeader
              title="Handpicked Masterpieces"
              subtitle="Curated with Love"
              centered
            />

            {/* Category Pills */}
            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              {[
                "All",
                "Textiles",
                "Pottery",
                "Metal Work",
                "Wood Craft",
                "Jewelry",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTechniqueTab(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTechniqueTab === cat
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              {allProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddClick={(p) => console.log("Added to cart:", p)}
                  showBadge={false}
                />
              ))}
            </div>
          </section>

          {/* CRAFTING HOURS TIMELINE */}
          <section className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold text-center mb-4">
              The Journey of Creation
            </h2>
            <p className="text-emerald-100 text-center mb-10 max-w-2xl mx-auto">
              From raw materials to finished masterpiece - witness the
              dedication and time invested by our artisans
            </p>

            <div className="grid md:grid-cols-5 gap-6">
              {craftingPhases.map((phase, idx) => {
                const PhaseIcon = phase.Icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="flex justify-center mb-3">
                      <PhaseIcon size={48} strokeWidth={1.5} />
                    </div>
                    <div className="text-2xl font-bold mb-2">
                      {phase.hours}h
                    </div>
                    <div className="text-emerald-100 text-sm">
                      {phase.stage}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg font-medium">
                Average total crafting time:{" "}
                <span className="text-3xl font-bold">20-70 hours</span> per
                piece
              </p>
            </div>
          </section>

          {/* SUSTAINABILITY & IMPACT */}
          <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Our Commitment
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Crafting a Sustainable Future
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Fair Wages",
                      desc: "Artisans receive 60-70% of product price directly",
                      Icon: Heart,
                    },
                    {
                      title: "Eco-Friendly Materials",
                      desc: "100% natural, biodegradable, and sustainable materials",
                      Icon: Sparkles,
                    },
                    {
                      title: "Skill Preservation",
                      desc: "Training programs for next generation artisans",
                      Icon: Award,
                    },
                    {
                      title: "Community Development",
                      desc: "Healthcare and education support for artisan families",
                      Icon: Users,
                    },
                  ].map((item, idx) => {
                    const ItemIcon = item.Icon;
                    return (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 text-emerald-600">
                          <ItemIcon size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/handicraft.jpg"
                  alt="Artisan at work"
                  className="rounded-2xl shadow-lg col-span-2 h-64 object-cover"
                />
                <img
                  src="/images/pot.jpeg"
                  alt="Craft detail"
                  className="rounded-2xl shadow-lg h-40 object-cover"
                />
                <img
                  src="/images/wool2.jpg"
                  alt="Craft detail"
                  className="rounded-2xl shadow-lg h-40 object-cover"
                />
              </div>
            </div>
          </section>

          {/* CALL TO ACTION */}
          <section className="text-center bg-gradient-to-br from-emerald-100 to-green-100 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Be Part of the Heritage Story
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Every purchase preserves a tradition, supports a family, and keeps
              India's cultural heritage alive for generations to come.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl">
                Start Exploring
              </button>
              <button className="bg-white hover:bg-gray-50 text-emerald-600 px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl border border-emerald-200">
                Become a Patron
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
