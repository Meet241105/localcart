import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { searchProductsByName } from "@/lib/productsApi";

export default function SearchResults() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const query = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return (params.get("q") || "").trim();
    }, [location.search]);

    useEffect(() => {
        const loadResults = async () => {
            if (!query) {
                setProducts([]);
                setLoading(false);
                setError("");
                return;
            }

            setLoading(true);
            setError("");

            try {
                const data = await searchProductsByName(query);
                setProducts(data);
            } catch (fetchError) {
                console.error("Search failed:", fetchError);
                setError("Failed to fetch search results.");
            } finally {
                setLoading(false);
            }
        };

        loadResults();
    }, [query]);

    return (
        <>
            <Navbar />
            <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-6 min-h-[60vh]">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
                    {query ? (
                        <p className="text-gray-600 mt-1">
                            Showing results for <span className="font-semibold">"{query}"</span>
                        </p>
                    ) : (
                        <p className="text-gray-600 mt-1">Type something in search bar to find products.</p>
                    )}
                </div>

                {loading ? (
                    <div className="text-gray-500">Searching products...</div>
                ) : error ? (
                    <div className="text-red-600">{error}</div>
                ) : products.length === 0 ? (
                    <div className="text-gray-500">No products found for this search.</div>
                ) : (
                    <>
                        <p className="text-sm text-gray-600">{products.length} product(s) found</p>
                        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </section>
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}
