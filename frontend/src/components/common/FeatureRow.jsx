export function FeatureRow({ features }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-lg border shadow-sm px-4 py-3 flex items-center gap-2 text-xs sm:text-sm text-gray-700 hover:shadow-md transition"
          >
            {Icon && <Icon size={16} className="text-emerald-600" />}
            <span>{feature.label}</span>
          </div>
        );
      })}
    </div>
  );
}
