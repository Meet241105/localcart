"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%25' height='100%25' fill='%23e5e7eb'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'>No Image</text></svg>";

export default function Cart({ darkMode }) {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const normalizedItems = cartItems.map((item) => ({
    ...item,
    cartId: item.productId || item.id,
    imageSrc: item.image || item.img || "/images/placeholder-product.png",
  }));

  const handleUpdateQuantity = async (id, delta) => {
    const item = normalizedItems.find((it) => it.cartId === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      await updateQuantity(id, newQuantity);
    }
  };

  const total = getCartTotal();

  return (
    <div
      className={`min-h-screen px-6 py-10 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-600">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-lg mt-10">
            Your cart is empty.
            <Button
              onClick={() => navigate("/")}
              className="ml-3 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Shop Now
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {normalizedItems.map((item) => (
                <Card
                  key={item.cartId}
                  className={`p-4 sm:p-5 rounded-2xl border transition ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                    }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={item.imageSrc}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-gray-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <h2 className="font-semibold text-base sm:text-lg truncate">{item.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          ₹{item.price}
                        </p>
                        <div className="flex items-center mt-3 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-lg"
                            onClick={() => handleUpdateQuantity(item.cartId, -1)}
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-lg"
                            onClick={() => handleUpdateQuantity(item.cartId, 1)}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <p className="font-bold text-lg">
                        ₹{item.price * item.quantity}
                      </p>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="rounded-lg"
                        onClick={() => removeFromCart(item.cartId)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div
              className={`mt-10 p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"
                }`}
            >
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="hover:bg-emerald-100 dark:hover:bg-gray-700"
                >
                  Continue Shopping
                </Button>
                <Button
                  onClick={() => navigate("/checkout")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
