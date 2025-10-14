export function CategoryStrip({ categories }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {categories.map((category) => (
        <div
          key={category.t}
          className="rounded-xl overflow-hidden border border-emerald-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <img
            src={category.img}
            alt={category.t}
            className="w-full h-20 object-cover"
          />
        </div>
      ))}
    </div>
  );
}
