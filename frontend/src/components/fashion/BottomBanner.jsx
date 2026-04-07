export function BottomBanner({
  backgroundImage,
  brand,
  title,
  buttonText,
  onButtonClick,
}) {
  return (
    <section
      className="rounded-xl overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="bg-white/70 p-6 sm:p-10">
        <p className="text-xs text-gray-600">{brand}</p>
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <button
          onClick={onButtonClick}
          className="mt-3 inline-block bg-emerald-600 text-white text-sm px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}

