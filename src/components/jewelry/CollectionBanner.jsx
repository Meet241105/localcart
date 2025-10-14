export function CollectionBanner({
  title,
  description,
  buttonText,
  backgroundImage,
}) {
  return (
    <div
      className="col-span-1 bg-cover bg-center rounded-2xl p-10 flex flex-col justify-end text-white"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <h3 className="text-3xl font-semibold mb-2">{title}</h3>
      <p className="text-sm mb-4 opacity-90">{description}</p>
      <button className="bg-white text-emerald-700 font-medium px-4 py-2 rounded-md text-sm hover:bg-emerald-50 transition">
        {buttonText}
      </button>
    </div>
  );
}

