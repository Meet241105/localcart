import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Package, Users, DollarSign, TrendingUp, RefreshCw } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const CHART_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#14b8a6"];

export default function AdminDashboard() {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    totalValue: 0,
    revenue: 0,
    growthPercent: 0,
  });
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [charts, setCharts] = useState({
    monthlyTrend: [],
    categoryBreakdown: [],
    topSellingProducts: [],
  });
  const [lastUpdated, setLastUpdated] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    } else {
      fetchStats();
    }
  }, [isAuthenticated, navigate]);

  const fetchStats = async (manualRefresh = false) => {
    if (manualRefresh) {
      setRefreshing(true);
    }

    try {
      const { data } = await axios.get(`${API_URL}/admin/analytics`);
      setStats({
        products: data?.totals?.products || 0,
        categories: data?.totals?.categories || 0,
        totalValue: data?.finance?.inventoryValue || 0,
        revenue: data?.finance?.revenue || 0,
        growthPercent: data?.growth?.percent || 0,
      });
      setActivity(data?.activity || []);
      setCharts({
        monthlyTrend: data?.charts?.monthlyTrend || [],
        categoryBreakdown: data?.charts?.categoryBreakdown || [],
        topSellingProducts: data?.charts?.topSellingProducts || [],
      });
      setLastUpdated(new Date());
      if (manualRefresh) {
        toast.success("Analytics refreshed");
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      if (manualRefresh) {
        toast.error(error.response?.data?.message || "Failed to refresh analytics");
      }
    } finally {
      setLoading(false);
      if (manualRefresh) {
        setRefreshing(false);
      }
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const statsCards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: Users,
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
    },
    {
      title: "Inventory Value",
      value: `₹${stats.totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-purple-500",
      textColor: "text-purple-600",
    },
    {
      title: "Growth",
      value: `${stats.growthPercent >= 0 ? "+" : ""}${stats.growthPercent}%`,
      icon: TrendingUp,
      color: "bg-orange-500",
      textColor: "text-orange-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to LocalKart Admin Panel</p>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">Last updated: {lastUpdated.toLocaleTimeString()}</p>
          )}
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading stats...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/admin/products/new")}
              className="p-4 border-2 border-dashed border-emerald-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition text-emerald-600 font-medium"
            >
              + Add New Product
            </button>
            <button
              onClick={() => navigate("/admin/products")}
              className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-blue-600 font-medium"
            >
              📦 Manage Products
            </button>
            <button
              type="button"
              onClick={() => fetchStats(true)}
              disabled={refreshing}
              className="p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-purple-600 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="inline-flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh Analytics"}
              </span>
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Orders and Revenue Trend (Last 6 Months)</h2>
            <div className="h-80">
              {charts.monthlyTrend.length === 0 ? (
                <p className="text-sm text-gray-500">No trend data available.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={charts.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} name="Orders" />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue (Rs)" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Category Distribution</h2>
            <div className="h-80">
              {charts.categoryBreakdown.length === 0 ? (
                <p className="text-sm text-gray-500">No category data available.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={charts.categoryBreakdown}
                      dataKey="count"
                      nameKey="category"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                    >
                      {charts.categoryBreakdown.map((entry, index) => (
                        <Cell key={`category-${entry.category}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
          <div className="h-80">
            {charts.topSellingProducts.length === 0 ? (
              <p className="text-sm text-gray-500">No sales data available yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.topSellingProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-12} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantitySold" fill="#6366f1" name="Quantity Sold" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {activity.length === 0 ? (
            <p className="text-sm text-gray-500">No recent activity found.</p>
          ) : (
            <div className="space-y-3">
              {activity.map((item, index) => (
                <div key={`${item.type}-${item.createdAt}-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full ${item.type === "order" ? "bg-blue-500" : "bg-emerald-500"}`}
                  ></div>
                  <p className="text-sm text-gray-700">{item.message}</p>
                  <span className="ml-auto text-xs text-gray-500">{formatTimeAgo(item.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
