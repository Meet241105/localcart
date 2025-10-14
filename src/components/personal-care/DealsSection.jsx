export function DealsSection({ title, description, buttonText, images }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl overflow-hidden bg-emerald-50 p-6 shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-800">
          {title}
          <br />
          {description}
        </h3>
        <button className="mt-4 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition">
          {buttonText}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Deal ${index + 1}`}
            className="h-24 w-full object-cover rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  );
}
