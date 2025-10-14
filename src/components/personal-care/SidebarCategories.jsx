export function SidebarCategories({ categories, title = "Categories" }) {
  return (
    <aside className="hidden sm:block col-span-3 bg-white rounded-xl border shadow-sm">
      <div className="p-3">
        <h4 className="font-semibold text-gray-800 mb-3">{title}</h4>
        <ul className="text-sm space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              className="py-1 px-2 rounded hover:bg-emerald-50 cursor-pointer transition"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

