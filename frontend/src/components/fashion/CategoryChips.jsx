export function CategoryChips({ categories, activeCategory, onCategoryChange }) {
  return (
    <section className="flex gap-3 overflow-x-auto pb-1">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange && onCategoryChange(category)}
          className={`border px-3 py-2 rounded-md text-sm whitespace-nowrap shadow-sm transition ${activeCategory === category
              ? "bg-emerald-700 text-white border-emerald-700"
              : "bg-white hover:bg-emerald-50"
            }`}
        >
          {category}
        </button>
      ))}
    </section>
  );
}

