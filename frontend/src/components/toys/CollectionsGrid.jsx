export function CollectionsGrid({ images }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {images.map((image, index) => (
        <div key={index} className="rounded-lg overflow-hidden">
          <img
            src={image}
            alt={`Collection ${index + 1}`}
            className="h-28 w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

