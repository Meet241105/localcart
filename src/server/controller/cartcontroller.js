import express from "express";
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config.js";

const router = express.Router();

// ✅ Get user cart
router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const docRef = doc(collection(db, "carts"), uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return res.status(200).json([]);

    res.status(200).json(docSnap.data().items || []);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Error fetching cart" });
  }
});

// ✅ Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { uid, product } = req.body;
    const cartRef = doc(collection(db, "carts"), uid);
    const cartSnap = await getDoc(cartRef);

    let cart = cartSnap.exists() ? cartSnap.data().items || [] : [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    await setDoc(cartRef, { items: cart });
    res.status(200).json({ message: "Added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Error adding to cart" });
  }
});

// ✅ Remove item from cart
router.delete("/:uid/:productId", async (req, res) => {
  try {
    const { uid, productId } = req.params;
    const cartRef = doc(collection(db, "carts"), uid);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists())
      return res.status(404).json({ message: "Cart not found" });

    const newItems = cartSnap
      .data()
      .items.filter((item) => item.id !== productId);

    await updateDoc(cartRef, { items: newItems });
    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ error: "Error removing item" });
  }
});

export default router;
