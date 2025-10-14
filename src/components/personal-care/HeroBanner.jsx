export function HeroBanner({ title, image, buttons }) {
  return (
    <div className="mt-4 rounded-2xl overflow-hidden bg-[#efe9e2]">
      <div className="relative h-48 sm:h-64 flex items-center justify-center text-center">
        <img
          src={image}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          alt="Hero background"
        />
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {title}
          </h1>
          <div className="mt-3 flex gap-3 justify-center">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`${
                  button.primary
                    ? "bg-emerald-600 text-white"
                    : "border text-gray-700"
                } text-sm px-4 py-2 rounded-md hover:opacity-90 transition`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
