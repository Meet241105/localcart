export function TabFilter({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange && onTabChange(tab)}
          className={`text-sm border px-3 py-1 rounded-full transition ${
            activeTab === tab
              ? "bg-emerald-700 text-white border-emerald-700"
              : "hover:bg-emerald-50"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
