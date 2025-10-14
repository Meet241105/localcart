import express from "express";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebase/config.js";

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// ✅ Add a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const docRef = await addDoc(collection(db, "products"), {
      ...newProduct,
      createdAt: new Date(),
    });
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Error adding product" });
  }
});

// ✅ Filter by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const q = query(
      collection(db, "products"),
      where("category", "==", category)
    );
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ error: "Error filtering products" });
  }
});

// ✅ Search products
router.get("/search/:term", async (req, res) => {
  try {
    const { term } = req.params;
    const snapshot = await getDocs(collection(db, "products"));
    const products = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((p) => p.name?.toLowerCase().includes(term.toLowerCase()));

    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Error searching products" });
  }
});

export default router;
