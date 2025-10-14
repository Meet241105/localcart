"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function Cart({ darkMode }) {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleUpdateQuantity = (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      updateQuantity(id, newQuantity);
    }
  };

  const total = getCartTotal();

  return (
    <div
      className={`min-h-screen px-6 py-10 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
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
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className={`flex items-center justify-between p-4 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.img || item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ₹{item.price}
                      </p>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="mx-3">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div
              className={`mt-10 p-6 rounded-lg shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between text-lg font-semibold mb-4">
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
