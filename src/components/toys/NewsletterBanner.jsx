export function NewsletterBanner({
  title,
  description,
  placeholder,
  buttonText,
}) {
  return (
    <section className="rounded-2xl overflow-hidden bg-[#efe9e2]">
      <div className="p-6 sm:p-10 grid sm:grid-cols-2 items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-700 mt-2">{description}</p>
        </div>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder={placeholder}
            className="flex-1 border rounded-md px-3 py-2"
          />
          <button className="bg-emerald-600 text-white px-4 rounded-md hover:bg-emerald-700 transition">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
