export function FeaturedProducts() {
  const products = [
    { name: "Handmade Vase", price: "$20", image: "/images/handmadevase.jpeg" },
    { name: "Wool Scarf", price: "$15", image: "/images/wool.jpeg" },
    { name: "Beaded Necklace", price: "$25", image: "/images/beads.jpg" },
    { name: "Clay Pot", price: "$18", image: "/images/pot.jpeg" },
  ];

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4 sm:px-8">
        {products.map((product) => (
          <div
            key={product.name}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-h-60 object-cover "
            />
            <div className="p-3">
              <p className="font-semibold">{product.name}</p>
              <p className="text-emerald-600 font-medium">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
