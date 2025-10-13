import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"    

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">LocalKart</h2>
          <p className="text-sm text-gray-600 mb-4">
            Discover unique hand-crafted items made by local artisans across India. 
            Every purchase supports creativity and craftsmanship.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-900"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gray-900"><Instagram size={20} /></a>
            <a href="#" className="hover:text-gray-900"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Shop Categories */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Shop by Category</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-900">Home & Decor</a></li>
            <li><a href="#" className="hover:text-gray-900">Fashion & Apparel</a></li>
            <li><a href="#" className="hover:text-gray-900">Jewelry & Accessories</a></li>
            <li><a href="#" className="hover:text-gray-900">Handicrafts & Gifts</a></li>
            <li><a href="#" className="hover:text-gray-900">Personal Care & Wellness</a></li>
            <li><a href="#" className="hover:text-gray-900">Toys</a></li>
            <li><a href="#" className="hover:text-gray-900">Kitchen & Dining</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-900">About Us</a></li>
            <li><a href="#" className="hover:text-gray-900">Contact</a></li>
            <li><a href="#" className="hover:text-gray-900">FAQs</a></li>
            <li><a href="#" className="hover:text-gray-900">Return Policy</a></li>
            <li><a href="#" className="hover:text-gray-900">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Get in Touch</h3>
          <p className="flex items-center text-sm mb-2">
            <Mail className="mr-2" size={16} /> support@localkart.com
          </p>
          <p className="flex items-center text-sm mb-4">
            <Phone className="mr-2" size={16} /> +91 98765 43210
          </p>
          <p className="text-sm text-gray-600">
            Made with ❤️ by artisans across India.
          </p>
        </div>
      </div>

      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LocalKart — All Rights Reserved.
      </div>
    </footer>
  )
}
