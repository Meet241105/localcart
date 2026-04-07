import { ProductCard } from "@/components/common/ProductCard";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/productsApi";

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  const fallbackProducts = [
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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({ tag: "Featured", limit: 8 });
        setProducts(data);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      }
    };

    loadProducts();
  }, []);

  const displayProducts = products.length ? products : fallbackProducts;

  return (
    <section id="featured-products" className="py-12">
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4 sm:px-8">
        {displayProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} isSpecial={true} />
        ))}
      </div>
    </section>
  );
}
