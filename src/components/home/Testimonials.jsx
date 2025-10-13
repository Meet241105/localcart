export function Testimonials() {
  const testimonials = [
    {
      name: "Aarav P.",
      comment: "Loved the handmade quality! Truly unique pieces.",
    },
    {
      name: "Neha S.",
      comment: "Great platform to support local artisans. Will buy again!",
    },
    {
      name: "Rahul K.",
      comment: "Fast delivery and eco-friendly packaging. Impressed!",
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-8">
        What Our Customers Say
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6 px-4 sm:px-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/3 text-center"
          >
            <p className="italic text-gray-600 mb-4">“{t.comment}”</p>
            <p className="font-semibold text-emerald-700">- {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
