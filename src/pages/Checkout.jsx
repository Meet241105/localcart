"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { auth, db } from "@/server/firebase/config" // adjust if your path differs
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useCart } from "@/contexts/CartContext" // adjust import path
import { toast } from "react-toastify"

export default function Checkout({ darkMode }) {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const [loading, setLoading] = useState(false)

  const subtotal = getCartTotal()
  const shipping = 50
  const total = subtotal + shipping

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async () => {
    const user = auth.currentUser
    if (!user) {
      alert("Please log in before placing an order.")
      navigate("/login")
      return
    }

    if (!formData.name || !formData.address || !formData.city || !formData.postalCode) {
      toast.warn("Please fill in all required fields.")
      return
    }

    try {
      setLoading(true)

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,
        shippingInfo: formData,
        items: cartItems.map(({ id, name, price, quantity }) => ({
          id,
          name,
          price,
          quantity,
        })),
        subtotal,
        shipping,
        total,
        createdAt: serverTimestamp(),
      })

      clearCart()
      //toast
      toast.success("Order placed successfully!")
      setTimeout(() => navigate("/"), 1500)
    } catch (error) {
      console.error("Error placing order:", error)
      //toast error
      toast.error("Something went wrong while placing your order.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen px-6 py-10 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-600">
          Checkout
        </h1>

        <Card
          className={`p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-md rounded-lg`}
        >
          <CardContent className="space-y-6">
            <div>
              <h2 className="font-semibold mb-2 text-lg">Shipping Information</h2>
              <form className="grid gap-4 md:grid-cols-2">
                <input name="name" type="text" placeholder="Full Name" className="border rounded-md px-3 py-2 w-full"
                  value={formData.name} onChange={handleChange} />
                <input name="phone" type="text" placeholder="Phone Number" className="border rounded-md px-3 py-2 w-full"
                  value={formData.phone} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" className="border rounded-md px-3 py-2 w-full md:col-span-2"
                  value={formData.email} onChange={handleChange} />
                <input name="address" type="text" placeholder="Address" className="border rounded-md px-3 py-2 w-full md:col-span-2"
                  value={formData.address} onChange={handleChange} />
                <input name="city" type="text" placeholder="City" className="border rounded-md px-3 py-2 w-full"
                  value={formData.city} onChange={handleChange} />
                <input name="postalCode" type="text" placeholder="Postal Code" className="border rounded-md px-3 py-2 w-full"
                  value={formData.postalCode} onChange={handleChange} />
              </form>
            </div>

            <div>
              <h2 className="font-semibold mb-2 text-lg">Order Summary</h2>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
              onClick={handlePlaceOrder}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => navigate("/cart")}
            className="hover:bg-emerald-100 dark:hover:bg-gray-700"
          >
            Back to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
