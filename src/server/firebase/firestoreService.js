// src/firebase/firestoreService.js
import { db } from "./config";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


//  Save new user in Firestore after registration
export const saveUserToFirestore = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
    });
    console.log("✅ User saved to Firestore:", user.email);
  } catch (error) {
    console.error("❌ Error saving user:", error);
  }
};

// Get user data by UID
export const getUserFromFirestore = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.warn("⚠️ No user found in Firestore for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return null;
  }
};



//  Add new product
export const addProduct = async (productData) => {
  try {
    const productsRef = collection(db, "products");
    const docRef = await addDoc(productsRef, {
      ...productData,
      createdAt: new Date(),
    });
    console.log("✅ Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding product:", error);
  }
};

//  Get all products
export const getProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
};

//  Update product by ID
export const updateProduct = async (productId, updatedData) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedData);
    console.log("✅ Product updated:", productId);
  } catch (error) {
    console.error("❌ Error updating product:", error);
  }
};

//  Delete product by ID
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    console.log("🗑️ Product deleted:", productId);
  } catch (error) {
    console.error("❌ Error deleting product:", error);
  }
};
