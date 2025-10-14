import { CategoryCard } from "@/components/common/CategoryCard";

export function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
      {categories.map((category) => (
        <CategoryCard key={category.t} category={category} variant="overlay" />
      ))}
    </div>
  );
}
