export function CategoryChips({ categories }) {
  return (
    <section className="flex gap-3 overflow-x-auto pb-1">
      {categories.map((category) => (
        <span
          key={category}
          className="border px-3 py-2 rounded-md text-sm whitespace-nowrap bg-white shadow-sm hover:bg-emerald-50 transition"
        >
          {category}
        </span>
      ))}
    </section>
  );
}
