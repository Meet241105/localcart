import { ProductCard } from "@/components/common/ProductCard";

export function FeaturedProducts() {
  const products = [
    {
      id: "featured-1",
      name: "Handmade Vase",
      price: 200,
      img: "/images/handmadevase.jpeg",
    },
    {
      id: "featured-2",
      name: "Wool Scarf",
      price: 150,
      img: "/images/wool.jpeg",
    },
    {
      id: "featured-3",
      name: "Beaded Necklace",
      price: 240,
      img: "/images/beads.jpg",
    },
    { id: "featured-4", name: "Clay Pot", price: 18, img: "/images/pot.jpeg" },
  ];

  return (
    <section id="featured-products" className="py-12">
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4 sm:px-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isSpecial={true} />
        ))}
      </div>
    </section>
  );
}
