export function HeroSection({
  title,
  subtitle,
  description,
  primaryButtonText = "Shop Now",
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  backgroundImage,
  backgroundColor = "bg-gradient-to-r from-emerald-50 via-white to-emerald-50",
  images = [], // for multi-image layouts
  variant = "default", // default, split, overlay
}) {
  if (variant === "overlay") {
    return (
      <section
        className={`relative rounded-2xl overflow-hidden ${
          backgroundImage ? `bg-[url('${backgroundImage}')]` : backgroundColor
        } bg-cover bg-center`}
      >
        <div className="bg-white/70 backdrop-blur-sm p-10 sm:p-16 md:w-1/2">
          {subtitle && (
            <p className="text-xs tracking-wider uppercase text-gray-600">
              {subtitle}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight mt-2">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-gray-700 text-base sm:text-lg">
              {description}
            </p>
          )}
          <div className="mt-6 flex gap-4">
            {primaryButtonText && (
              <button
                onClick={onPrimaryClick}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition"
              >
                {primaryButtonText}
              </button>
            )}
            {secondaryButtonText && (
              <button
                onClick={onSecondaryClick}
                className="border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-5 py-2.5 rounded-md text-sm font-medium transition"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section
        className={`relative rounded-2xl overflow-hidden ${backgroundColor}`}
      >
        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div className="p-6 sm:p-10">
            {subtitle && (
              <p className="text-xs uppercase tracking-wider text-gray-600">
                {subtitle}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight mt-2">
              {title}
            </h1>
            {description && (
              <p className="text-gray-700 mt-3 max-w-xl">{description}</p>
            )}
            <div className="mt-5 flex gap-3">
              {primaryButtonText && (
                <button
                  onClick={onPrimaryClick}
                  className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-md hover:bg-emerald-700"
                >
                  {primaryButtonText}
                </button>
              )}
              {secondaryButtonText && (
                <button
                  onClick={onSecondaryClick}
                  className="border text-sm px-4 py-2 rounded-md hover:bg-emerald-50"
                >
                  {secondaryButtonText}
                </button>
              )}
            </div>
          </div>
          {images.length > 1 ? (
            <div className="relative min-h-[240px] sm:min-h-[300px]">
              <img
                src={images[0]}
                alt="Hero"
                className="absolute right-6 top-6 w-44 sm:w-64 h-44 sm:h-64 object-cover rounded-xl shadow"
              />
              <img
                src={images[1]}
                alt="Alt"
                className="absolute right-28 sm:right-44 bottom-6 w-28 sm:w-40 h-28 sm:h-40 object-cover rounded-xl shadow"
              />
            </div>
          ) : backgroundImage ? (
            <div
              className={`h-48 sm:h-full bg-[url('${backgroundImage}')] bg-cover bg-center`}
            />
          ) : null}
        </div>
      </section>
    );
  }

  // default variant
  return (
    <section className={`rounded-xl overflow-hidden ${backgroundColor}`}>
      <div className="grid sm:grid-cols-3">
        <div className="sm:col-span-2 p-6 sm:p-10">
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            {title}
          </h1>
          {description && <p className="text-gray-600 mt-2">{description}</p>}
          {primaryButtonText && (
            <div
              onClick={onPrimaryClick}
              className="mt-4 inline-block bg-emerald-600 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-emerald-700"
            >
              {primaryButtonText}
            </div>
          )}
        </div>
        {backgroundImage && (
          <div
            className={`h-40 sm:h-full bg-[url('${backgroundImage}')] bg-cover bg-center`}
          />
        )}
      </div>
    </section>
  );
}
