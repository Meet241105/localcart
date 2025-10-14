export function ProductCard({
  product,
  onAddClick,
  showBadge = true,
  showAddButton = true,
  isSpecial = false,
}) {
  const handleAddToCart = () => {
    if (onAddClick) {
      onAddClick(product);
    } else {
      // Default cart functionality if no custom handler provided
      console.log("Added to cart:", product);
      // You can implement default cart logic here
    }
  };

  return (
    <div
      className={`bg-white shadow rounded-md overflow-hidden hover:shadow-md transition ${
        isSpecial ? "ring-2 ring-emerald-200" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${isSpecial ? "h-48" : "h-40"}`}
      >
        <img
          src={product.img || product.image}
          alt={product.name}
          className={`w-full ${
            isSpecial ? "h-full" : "h-40"
          } object-cover transition-transform duration-300 hover:scale-105`}
        />
        {isSpecial && (
          <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Featured
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm sm:text-base">{product.name}</p>
          {showBadge && product.badge && (
            <span className="text-[10px] sm:text-xs border px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
          {showBadge && product.tag && (
            <span className="text-[10px] border px-2 py-0.5 rounded-full">
              {product.tag}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-emerald-600 text-sm sm:text-base">
            ₹{product.price}
          </p>
          {showAddButton && (
            <button
              onClick={handleAddToCart}
              className="text-xs bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
