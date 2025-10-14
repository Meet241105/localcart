export function InfoCard({
  title,
  description,
  image,
  children,
  className = "",
}) {
  return (
    <div className={`bg-white rounded-xl shadow p-5 ${className}`}>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}
      {image && (
        <img
          src={image}
          alt={title}
          className="mt-4 w-full h-36 object-cover rounded-lg"
        />
      )}
      {children}
    </div>
  );
}
