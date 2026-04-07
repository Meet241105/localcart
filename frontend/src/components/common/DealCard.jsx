export function DealCard({ deal, variant = "default" }) {
  if (variant === "large") {
    return (
      <div className="col-span-1 sm:col-span-2 relative rounded-xl overflow-hidden bg-gradient-to-r from-emerald-100 via-white to-emerald-50 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{deal.title}</h3>
          <p className="text-gray-600 mt-1">{deal.desc}</p>
        </div>
        <button className="mt-4 self-start bg-emerald-700 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-800">
          Shop Now
        </button>
        {deal.expires && (
          <div className="absolute top-3 right-3 text-xs bg-emerald-700 text-white px-2 py-1 rounded-md">
            Expires in {deal.expires}
          </div>
        )}
      </div>
    );
  }

  // small variant
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border hover:border-emerald-300 transition-all">
      <h4 className="font-medium text-gray-800">{deal.title}</h4>
      <p className="text-gray-600 text-sm mt-1">{deal.desc}</p>
      {deal.code && (
        <div className="mt-3 flex items-center justify-between">
          <span className="bg-gray-100 px-2 py-1 text-xs font-mono rounded text-gray-700">
            {deal.code}
          </span>
          <button className="text-xs text-emerald-600 hover:underline">
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
