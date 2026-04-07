export function SectionHeader({
  title,
  subtitle,
  viewAllText = "View All",
  onViewAllClick,
  centered = false,
}) {
  if (centered) {
    return (
      <div className="text-center">
        {subtitle && (
          <p className="text-xs tracking-wider text-gray-500 uppercase">
            {subtitle}
          </p>
        )}
        <h2 className="mt-1 text-2xl font-semibold text-gray-800">{title}</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        {subtitle && (
          <p className="text-xs tracking-wider text-gray-500 uppercase">
            {subtitle}
          </p>
        )}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {title}
        </h2>
      </div>
      {onViewAllClick && (
        <button
          onClick={onViewAllClick}
          className="text-sm text-emerald-700 hover:underline font-medium"
        >
          {viewAllText}
        </button>
      )}
    </div>
  );
}
