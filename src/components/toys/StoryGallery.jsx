export function StoryGallery({ images }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Story ${index + 1}`}
          className="h-28 w-full object-cover rounded-md"
        />
      ))}
    </div>
  );
}
