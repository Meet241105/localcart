import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const statusColorMap = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
};

const paymentStatusColorMap = {
    created: "bg-yellow-100 text-yellow-800",
    paid: "bg-emerald-100 text-emerald-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-purple-100 text-purple-800",
};

const formatDate = (value) => {
    if (!value) return "Not available";
    return new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function MyOrders() {
    const navigate = useNavigate();
    const { user, token } = useUser();
    const [orders, setOrders] = useState([]);
    const [expandedId, setExpandedId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    useEffect(() => {
        const loadOrders = async () => {
            if (!user) {
                navigate("/login");
                return;
            }

            setLoading(true);
            setError("");

            try {
                const authToken = token || localStorage.getItem("userToken");
                const { data } = await axios.get(`${API_URL}/orders/my-orders`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setOrders(data?.orders || []);
            } catch (fetchError) {
                console.error("Failed to fetch orders:", fetchError);
                setError(fetchError?.response?.data?.message || "Failed to load your orders.");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [user, token, navigate]);

    const downloadReceipt = async (orderId) => {
        try {
            const authToken = token || localStorage.getItem("userToken");
            const response = await axios.get(`${API_URL}/orders/${orderId}/receipt`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                responseType: "blob",
            });

            const receiptBlobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = receiptBlobUrl;
            link.setAttribute("download", `receipt-${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(receiptBlobUrl);
        } catch (downloadError) {
            console.error("Receipt download failed:", downloadError);
        }
    };

    return (
        <>
            <Navbar />
            <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 min-h-[70vh] space-y-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-600 mt-1">Track status, expected delivery date, and item details.</p>
                </div>

                {loading ? (
                    <div className="text-gray-500">Loading your orders...</div>
                ) : error ? (
                    <div className="text-red-600">{error}</div>
                ) : orders.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-600">
                        You have not placed any orders yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white border border-gray-200 rounded-xl shadow-sm">
                                <div className="p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Order ID</p>
                                            <p className="font-semibold text-gray-900">{order._id}</p>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="text-sm text-gray-500">Order Date</p>
                                            <p className="font-medium text-gray-800">{formatDate(order.createdAt)}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                                        <div>
                                            <p className="text-xs text-gray-500">Total Amount</p>
                                            <p className="font-semibold text-emerald-700">Rs {Number(order.total || 0).toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Order Status</p>
                                            <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${statusColorMap[order.status] || "bg-gray-100 text-gray-700"}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Payment Status</p>
                                            <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${paymentStatusColorMap[order.paymentStatus] || "bg-gray-100 text-gray-700"}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Expected Delivery</p>
                                            <p className="font-medium text-gray-800">{formatDate(order.expectedDeliveryDate)}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setExpandedId(expandedId === order._id ? "" : order._id)}
                                            className="text-sm px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            {expandedId === order._id ? "Hide Details" : "View Details"}
                                        </button>

                                        {order.paymentStatus === "paid" && (
                                            <button
                                                type="button"
                                                onClick={() => downloadReceipt(order._id)}
                                                className="text-sm px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                                            >
                                                Download Receipt
                                            </button>
                                        )}
                                    </div>

                                    {expandedId === order._id && (
                                        <div className="mt-5 border-t border-gray-200 pt-4 space-y-4">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Shipping Details</h3>
                                                <p className="text-sm text-gray-700">{order.shippingInfo?.name || "-"}</p>
                                                <p className="text-sm text-gray-700">{order.shippingInfo?.address || "-"}, {order.shippingInfo?.city || "-"}</p>
                                                <p className="text-sm text-gray-700">PIN: {order.shippingInfo?.postalCode || "-"}</p>
                                                <p className="text-sm text-gray-700">Phone: {order.shippingInfo?.phone || "-"}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Items</h3>
                                                <div className="space-y-2">
                                                    {(order.items || []).map((item, index) => (
                                                        <div key={`${item.productId}-${index}`} className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-md">
                                                            <div>
                                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                                <p className="text-gray-500">Qty: {item.quantity}</p>
                                                            </div>
                                                            <p className="font-semibold text-gray-900">Rs {Number(item.price * item.quantity).toLocaleString()}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
