import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TabFilter } from "@/components/common/TabFilter";

export function ClassyProducts({
  title,
  subtitle,
  products,
  tabs,
  activeTab,
  onTabChange,
  onAddClick,
}) {
  return (
    <section id="classy-products">
      <SectionHeader title={title} subtitle={subtitle} centered />
      <div className="mt-6 flex items-center justify-center gap-2 text-sm">
        <TabFilter
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddClick={onAddClick}
            showBadge={false}
          />
        ))}
      </div>
    </section>
  );
}
