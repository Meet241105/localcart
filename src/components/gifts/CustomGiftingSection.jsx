export function CustomGiftingSection({ title, description, image, buttons }) {
  return (
    <section className="relative z-10 grid sm:grid-cols-2 gap-8 items-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-100">
      <div className="rounded-xl overflow-hidden">
        <img
          src={image}
          alt="Custom Gifts"
          className="w-full h-64 sm:h-72 object-cover"
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
        <div className="flex gap-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`${
                button.primary
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
              } px-5 py-2 rounded-md transition`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

