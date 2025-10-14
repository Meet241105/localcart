export function SidebarWidget({ title, image, description, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border p-4 shadow-sm ${className}`}>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <img
        src={image}
        alt={title}
        className="mt-3 w-full h-28 object-cover rounded-md shadow"
      />
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
}
