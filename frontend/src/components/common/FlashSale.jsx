export function FlashSale({ items, endTime = "08:17:56" }) {
  return (
    <section className="bg-white shadow rounded-xl p-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Flash Sale</p>
        <span className="text-xs text-emerald-700">Ends in {endTime}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-md overflow-hidden border">
            <img
              src={item.img || item.image}
              alt={item.name}
              className="w-full h-28 object-cover"
            />
            <div className="p-2 text-sm">
              <p className="font-medium">{item.name}</p>
              <p className="text-emerald-700">
                ₹{item.price}{" "}
                {item.originalPrice && (
                  <span className="text-gray-400 line-through ml-1">
                    ₹{item.originalPrice}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
