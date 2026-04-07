import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/contexts/UserContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);
  const { user, token } = useUser();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${token || localStorage.getItem("userToken")}`,
    },
  });

  const loadGuestCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  };

  const loadUserCart = async () => {
    const { data } = await axios.get(`${API_URL}/cart`, getAuthConfig());
    setCartItems(data.items || []);
  };

  const syncGuestCartToUser = async () => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return;

    try {
      const items = JSON.parse(savedCart);
      if (!items.length) return;

      const payload = items.map((item) => ({
        productId: item.productId || item.id,
        name: item.name,
        price: item.price,
        image: item.image || item.img,
        quantity: item.quantity,
      }));

      const { data } = await axios.put(
        `${API_URL}/cart`,
        { items: payload },
        getAuthConfig()
      );
      setCartItems(data.items || []);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserCart().then(syncGuestCartToUser).catch(() => setCartItems([]));
    } else {
      loadGuestCart();
    }
  }, [user]);

  // Save cart to localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product) => {
    if (user) {
      const { data } = await axios.post(`${API_URL}/cart/add`, {
        product: {
          productId: product.productId || product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.img,
          quantity: 1,
        },
      }, getAuthConfig());
      setCartItems(data.items || []);
      showNotification(`${product.name} added to cart!`);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        showNotification(`${product.name} quantity updated in cart!`);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      showNotification(`${product.name} added to cart!`);
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = async (productId) => {
    if (user) {
      const { data } = await axios.delete(
        `${API_URL}/cart/item/${productId}`,
        getAuthConfig()
      );
      setCartItems(data.items || []);
      showNotification("Item removed from cart");
      return;
    }

    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
    showNotification("Item removed from cart");
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (user) {
      const { data } = await axios.patch(`${API_URL}/cart/update`, {
        productId,
        quantity,
      }, getAuthConfig());
      setCartItems(data.items || []);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    if (user) {
      const { data } = await axios.delete(`${API_URL}/cart/clear`, getAuthConfig());
      setCartItems(data.items || []);
      showNotification("Cart cleared");
      return;
    }

    setCartItems([]);
    showNotification("Cart cleared");
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        notification,
      }}
    >
      {children}
      {notification && <Notification message={notification} />}
    </CartContext.Provider>
  );
}

function Notification({ message }) {
  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
      <div className="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

