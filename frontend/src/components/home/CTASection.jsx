export function CTASection() {
 return (
    <section className="py-12 text-center bg-emerald-600 text-white">
      <h2 className="text-2xl font-bold mb-4">Stay Updated!</h2>
      <p className="mb-6">
        Subscribe to get the latest handmade product updates and offers.
      </p>
      <div className="flex justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-l-md focus:outline-none text-gray-800 bg-white"
        />
        <button className="bg-yellow-400 px-4 py-2 rounded-r-md font-semibold text-gray-900 hover:bg-yellow-300 transition">
          Subscribe
        </button>
      </div>
    </section>
  )
}