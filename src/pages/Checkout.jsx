"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export default function Checkout({ darkMode }) {
  const navigate = useNavigate()

  const handlePlaceOrder = () => {
    alert("Order placed successfully!")
    navigate("/")
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
              <h2 className="font-semibold mb-2 text-lg">
                Shipping Information
              </h2>
              <form className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border rounded-md px-3 py-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border rounded-md px-3 py-2 w-full"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded-md px-3 py-2 w-full md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="border rounded-md px-3 py-2 w-full md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="border rounded-md px-3 py-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="border rounded-md px-3 py-2 w-full"
                />
              </form>
            </div>

            <div>
              <h2 className="font-semibold mb-2 text-lg">Order Summary</h2>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹1797</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹50</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹1847</span>
              </div>
            </div>

            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
              onClick={handlePlaceOrder}
            >
              Place Order
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
