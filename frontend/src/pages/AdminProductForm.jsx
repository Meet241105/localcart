import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save, ArrowLeft, Upload } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminProductForm() {
  const { id } = useParams();
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const API_BASE_URL = API_URL.replace(/\/api\/?$/, "");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "home-decor",
    subCategory: "",
    image: "",
    tag: "",
    stock: "",
    artisan: "",
    region: "",
    material: "",
  });

  const categories = [
    { value: "home-decor", label: "Home & Decor" },
    { value: "fashion", label: "Fashion & Apparel" },
    { value: "jewelry", label: "Jewelry & Accessories" },
    { value: "gifts", label: "Handicrafts & Gifts" },
    { value: "kitchen-dining", label: "Kitchen & Dining" },
    { value: "toys", label: "Toys" },
    { value: "personal-care", label: "Personal Care" },
    { value: "regional-crafts", label: "Regional Crafts" },
  ];

  const tags = [
    { value: "", label: "No Tag" },
    { value: "Best", label: "Best" },
    { value: "New", label: "New" },
    { value: "Eco", label: "Eco" },
    { value: "Sale", label: "Sale" },
    { value: "Hot", label: "Hot" },
    { value: "Featured", label: "Featured" },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    } else if (id) {
      fetchProduct();
    }
  }, [isAuthenticated, id]);

  const resolveImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      try {
        const parsed = new URL(url);
        parsed.pathname = parsed.pathname.replace(/\/+/g, "/");
        return parsed.toString();
      } catch {
        return url;
      }
    }
    if (url.startsWith("data:")) {
      return url;
    }
    if (url.startsWith("/uploads/")) {
      return `${API_BASE_URL.replace(/\/+$/, "")}${url}`;
    }
    return url;
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/products/${id}`);
      setFormData({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        originalPrice: data.originalPrice || "",
        category: data.category || "home-decor",
        subCategory: data.subCategory || "",
        image: data.image || "",
        tag: data.tag || "",
        stock: data.stock || "",
        artisan: data.artisan || "",
        region: data.region || "",
        material: data.material || "",
      });
      setImagePreview(resolveImageUrl(data.image || ""));
    } catch (error) {
      toast.error("Failed to fetch product");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Show instant in-place preview while upload is in progress.
    const localPreviewUrl = URL.createObjectURL(file);
    setImagePreview(localPreviewUrl);

    setUploadingImage(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      const { data } = await axios.post(`${API_URL}/products/upload`, uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedImage = resolveImageUrl(data?.image || "");

      if (!uploadedImage) {
        throw new Error("Image upload failed");
      }

      setFormData((prev) => ({
        ...prev,
        image: uploadedImage,
      }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload image");
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files?.[0];
    await handleImageUpload(file);
    e.target.value = "";
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    await handleImageUpload(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.description || !formData.image) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stock: Number(formData.stock) || 0,
      };

      if (id) {
        // Update existing product
        await axios.put(`${API_URL}/products/${id}`, productData);
        toast.success("Product updated successfully!");
      } else {
        // Create new product
        await axios.post(`${API_URL}/products`, productData);
        toast.success("Product created successfully!");
      }

      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {id ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-gray-600 mt-1">
              {id ? "Update product information" : "Create a new product in your inventory"}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="e.g., Handwoven Cotton Saree"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="Detailed product description..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing & Category */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Pricing & Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="1299"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="1999"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub Category
                </label>
                <input
                  type="text"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="e.g., Sarees, Kurtas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag
                </label>
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  {tags.map((tag) => (
                    <option key={tag.value} value={tag.value}>
                      {tag.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="50"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Product Image</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                  }}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition min-h-56 flex items-center justify-center ${isDragging
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/40"
                    }`}
                >
                  {imagePreview ? (
                    <div className="w-full">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full max-h-72 object-contain rounded-lg border border-gray-200 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-2">Click or drop another image to replace</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-800">
                        {uploadingImage ? "Uploading image..." : "Drag and drop an image here"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        or click to select file (JPG, PNG, WEBP up to 5MB)
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your image will be uploaded and attached to this product automatically.
                </p>
                {formData.image && (
                  <p className="text-xs text-gray-500 mt-1 break-all">Uploaded URL: {formData.image}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Artisan Name
                </label>
                <input
                  type="text"
                  name="artisan"
                  value={formData.artisan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="e.g., Rama Textile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region
                </label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="e.g., Varanasi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="e.g., Pure Cotton"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? "Saving..." : id ? "Update Product" : "Create Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
