import axios from "axios";
import { staticProductCatalog } from "@/lib/staticProductCatalog";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const normalizeProduct = (product) => ({
    ...product,
    id: product._id || product.id,
    image: product.image || product.img,
    img: product.img || product.image,
    badge: product.badge || product.tag || "",
});

export const fetchProducts = async (params = {}) => {
    const { data } = await axios.get(`${API_URL}/products`, { params });
    const list = data?.products || [];
    return list.map(normalizeProduct);
};

export const searchProductsByName = async (query) => {
    const normalizedQuery = (query || "").trim().toLowerCase();
    if (!normalizedQuery) return [];

    let apiProducts = [];

    try {
        apiProducts = await fetchProducts({ limit: 1000 });
    } catch (error) {
        console.error("Failed to fetch API products for search:", error);
    }

    const staticProducts = staticProductCatalog.map(normalizeProduct);
    const mergedByName = new Map();

    [...apiProducts, ...staticProducts].forEach((product) => {
        const key = (product.name || "").trim().toLowerCase();
        if (!key) return;
        if (!mergedByName.has(key)) {
            mergedByName.set(key, product);
        }
    });

    return Array.from(mergedByName.values()).filter((product) =>
        (product.name || "").toLowerCase().includes(normalizedQuery)
    );
};
