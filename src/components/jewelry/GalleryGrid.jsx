import { ProductCard } from "@/components/common/ProductCard";

export function GalleryGrid({ products }) {
  return (
    <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showBadge={false} />
      ))}
    </div>
  );
}
