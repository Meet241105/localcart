export function CategoryCard({ category, onClick, variant = "simple" }) {
  if (variant === "overlay") {
    return (
      <div
        onClick={onClick}
        className="relative rounded-xl overflow-hidden group border border-emerald-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
      >
        <img
          src={category.img || category.image}
          alt={category.t || category.title || category.name}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className="absolute inset-0 bg-emerald-900/30 group-hover:bg-emerald-900/20 transition" />
        <div className="absolute inset-0 p-4 text-white flex flex-col justify-end">
          {category.s && <p className="text-sm opacity-90">{category.s}</p>}
          <h3 className="text-lg font-semibold">
            {category.t || category.title || category.name}
          </h3>
        </div>
      </div>
    );
  }

  if (variant === "dark-overlay") {
    return (
      <div
        onClick={onClick}
        className="relative rounded-xl overflow-hidden group border border-emerald-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
      >
        <img
          src={category.img || category.image}
          alt={category.t || category.title || category.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition" />
        <div className="absolute inset-0 p-4 text-white flex items-end">
          <span className="text-sm font-medium">
            {category.t || category.title || category.name}
          </span>
        </div>
      </div>
    );
  }

  // simple variant
  return (
    <div
      onClick={onClick}
      className="bg-white shadow rounded-md overflow-hidden text-center cursor-pointer hover:shadow-md transition"
    >
      <img
        src={category.img || category.image}
        alt={category.t || category.title || category.name}
        className="w-full h-24 object-cover"
      />
      <p className="p-2 text-sm font-medium">
        {category.t || category.title || category.name}
      </p>
    </div>
  );
}
