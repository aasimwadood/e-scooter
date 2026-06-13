import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  adminGetProducts,
  adminUpdateStock,
  adminAddProduct,
  getAuthToken,
  removeAuthToken,
  getFinancialSummary,
} from "../api";
import { TableSkeleton } from "../components/LoadingSkeleton";
import type { Product } from "../data/products";
import type { FinancialSummary } from "../api";

type SortField = "name" | "price" | "stock" | "brand" | "value";
type SortDir = "asc" | "desc";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [finances, setFinances] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stockInputs, setStockInputs] = useState<Record<string, string>>({});
  const [updating, setUpdating] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [stockFilter, setStockFilter] = useState<"all" | "instock" | "outofstock" | "lowstock">("all");

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    isNewArrival: false,
    isOnSale: false,
    salePrice: "",
    brand: "Eveons",
  });

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminGetProducts(getAuthToken());
      setProducts(data);
      setFinances(getFinancialSummary());
      const inputs: Record<string, string> = {};
      data.forEach((p) => {
        inputs[p._id] = String(p.stock);
      });
      setStockInputs(inputs);
    } catch {
      setError("Failed to load products. You may need to login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleUpdateStock = async (productId: string) => {
    const newStock = parseInt(stockInputs[productId]);
    if (isNaN(newStock) || newStock < 0) {
      setError("Please enter a valid stock number");
      return;
    }

    setUpdating(productId);
    setError(null);
    setSuccessMsg(null);

    try {
      await adminUpdateStock(getAuthToken(), productId, newStock);
      const productName = products.find((p) => p._id === productId)?.name;
      setSuccessMsg(`Stock updated for ${productName} → ${newStock} units`);
      await loadProducts();
    } catch {
      setError("Failed to update stock. Please try again.");
    } finally {
      setUpdating(null);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const slug = newProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      await adminAddProduct(getAuthToken(), {
        name: newProduct.name,
        slug,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        salePrice: newProduct.isOnSale && newProduct.salePrice ? parseFloat(newProduct.salePrice) : null,
        stock: parseInt(newProduct.stock),
        images: ["/images/bike-1.jpg"],
        isNewArrival: newProduct.isNewArrival,
        isOnSale: newProduct.isOnSale,
        brand: newProduct.brand,
        specs: {
          topSpeed: "20 mph",
          range: "25 miles",
          battery: "36V 10Ah",
          motor: "500W Hub Motor",
          weight: "30 lbs",
          maxLoad: "220 lbs",
          chargingTime: "5 hours",
          tireSize: "8.5",
          brakes: "Disc Brakes",
          waterproofRating: "IP54",
        },
      });

      setSuccessMsg(`"${newProduct.name}" added successfully!`);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        isNewArrival: false,
        isOnSale: false,
        salePrice: "",
        brand: "Eveons",
      });
      setShowAddForm(false);
      await loadProducts();
    } catch {
      setError("Failed to add product. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    navigate("/");
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sortedProducts = useMemo(() => {
    let filtered = [...products];

    if (stockFilter === "instock") {
      filtered = filtered.filter((p) => p.stock > 0);
    } else if (stockFilter === "outofstock") {
      filtered = filtered.filter((p) => p.stock === 0);
    } else if (stockFilter === "lowstock") {
      filtered = filtered.filter((p) => p.stock > 0 && p.stock <= 5);
    }

    filtered.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "price":
          cmp = (a.salePrice || a.price) - (b.salePrice || b.price);
          break;
        case "stock":
          cmp = a.stock - b.stock;
          break;
        case "brand":
          cmp = a.brand.localeCompare(b.brand);
          break;
        case "value":
          cmp = a.stock * (a.salePrice || a.price) - b.stock * (b.salePrice || b.price);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return filtered;
  }, [products, sortField, sortDir, stockFilter]);

  // Inventory calculations
  const totalInventoryValue = products.reduce(
    (sum, p) => sum + p.stock * (p.salePrice || p.price),
    0
  );
  const totalRetailValue = products.reduce(
    (sum, p) => sum + p.stock * p.price,
    0
  );
  const totalUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const eveonsValue = products
    .filter((p) => p.brand === "Eveons")
    .reduce((sum, p) => sum + p.stock * (p.salePrice || p.price), 0);
  const eveeValue = products
    .filter((p) => p.brand === "Evee")
    .reduce((sum, p) => sum + p.stock * (p.salePrice || p.price), 0);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span className="text-gray-300 ml-1">↕</span>;
    }
    return <span className="text-emerald-600 ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-gray-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              📦 Stock Management
            </h1>
            <p className="text-gray-500 mt-1">
              E-Scooter Kohat — Manage bike inventory and stock levels
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/admin/history"
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Stock History
            </Link>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Messages */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {successMsg}
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-500 hover:text-emerald-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
              </svg>
              {error}
            </div>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Financial Summary Cards */}
        {finances && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
              <div className="text-xs font-medium text-emerald-100 uppercase tracking-wider">Total Money</div>
              <div className="text-2xl font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ${finances.totalMoney.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-100 mt-1">{finances.totalSales} sales</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Stock Cost</div>
              <div className="text-2xl font-bold text-amber-600 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ${Math.round(finances.totalStockCost).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 mt-1">{totalUnits} units @ 55% cost</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Cash in Hand</div>
              <div className={`text-2xl font-bold mt-1 ${finances.cashInHand >= 0 ? "text-emerald-600" : "text-red-600"}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ${Math.round(finances.cashInHand).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 mt-1">Money - Stock Cost</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Avg Order Value</div>
              <div className="text-2xl font-bold text-violet-600 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ${Math.round(finances.avgOrderValue).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 mt-1">{finances.totalUnitsSold} units sold</div>
            </div>
          </div>
        )}

        {/* Inventory Value Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Inventory Value</div>
            <div className="text-2xl font-bold text-gray-900 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ${totalInventoryValue.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">{totalUnits} units in stock</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Retail Value</div>
            <div className="text-2xl font-bold text-gray-900 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ${totalRetailValue.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">Before discounts</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Eveons Value</div>
            <div className="text-2xl font-bold text-violet-600 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ${eveonsValue.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {products.filter((p) => p.brand === "Eveons").reduce((s, p) => s + p.stock, 0)} units
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Evee Value</div>
            <div className="text-2xl font-bold text-amber-600 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ${eveeValue.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {products.filter((p) => p.brand === "Evee").reduce((s, p) => s + p.stock, 0)} units
            </div>
          </div>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Eveons Urban Glide"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Eveons">Eveons Electric Bikes</option>
                  <option value="Evee">Evee Electric Bikes</option>
                </select>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={newProduct.isNewArrival}
                    onChange={(e) => setNewProduct({ ...newProduct, isNewArrival: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded accent-emerald-500"
                  />
                  New Arrival
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={newProduct.isOnSale}
                    onChange={(e) => setNewProduct({ ...newProduct, isOnSale: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded accent-emerald-500"
                  />
                  On Sale
                </label>
              </div>
              {newProduct.isOnSale && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.salePrice}
                    onChange={(e) => setNewProduct({ ...newProduct, salePrice: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="799"
                  />
                </div>
              )}
              <div className="sm:col-span-2 flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={addLoading}
                  className="px-6 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {addLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2.5 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Stock filter:</span>
            {[
              { key: "all", label: "All" },
              { key: "instock", label: "In Stock" },
              { key: "outofstock", label: "Out of Stock" },
              { key: "lowstock", label: "Low Stock (≤5)" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setStockFilter(f.key as typeof stockFilter)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  stockFilter === f.key
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Showing {sortedProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <TableSkeleton rows={6} />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th
                      className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-emerald-600 transition-colors"
                      onClick={() => handleSort("name")}
                    >
                      Product <SortIcon field="name" />
                    </th>
                    <th
                      className="text-left px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-emerald-600 transition-colors"
                      onClick={() => handleSort("brand")}
                    >
                      Brand <SortIcon field="brand" />
                    </th>
                    <th
                      className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-emerald-600 transition-colors"
                      onClick={() => handleSort("price")}
                    >
                      Price <SortIcon field="price" />
                    </th>
                    <th
                      className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-emerald-600 transition-colors"
                      onClick={() => handleSort("stock")}
                    >
                      Stock <SortIcon field="stock" />
                    </th>
                    <th
                      className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-emerald-600 transition-colors"
                      onClick={() => handleSort("value")}
                    >
                      Total Value <SortIcon field="value" />
                    </th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sortedProducts.map((product) => {
                    const unitPrice = product.salePrice || product.price;
                    const totalValue = product.stock * unitPrice;
                    const stockStatus = product.stock === 0 ? "out" : product.stock <= 5 ? "low" : "ok";

                    return (
                      <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <Link to={`/product/${product._id}`} className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                                {product.name}
                              </Link>
                              <div className="flex items-center gap-2 mt-0.5">
                                {product.isNewArrival && (
                                  <span className="text-[10px] bg-emerald-100 text-emerald-600 font-bold px-1.5 py-0.5 rounded">NEW</span>
                                )}
                                {product.isOnSale && (
                                  <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded">SALE</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            product.brand === "Eveons"
                              ? "bg-violet-100 text-violet-700"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {product.brand}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {product.isOnSale && product.salePrice ? (
                            <div>
                              <span className="font-bold text-red-600">${product.salePrice.toLocaleString()}</span>
                              <span className="text-xs text-gray-400 line-through block">${product.price.toLocaleString()}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-gray-900">${product.price.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              stockStatus === "ok" ? "bg-emerald-500" : stockStatus === "low" ? "bg-amber-500" : "bg-red-500"
                            }`} />
                            <span className={`text-lg font-bold ${
                              stockStatus === "ok" ? "text-gray-900" : stockStatus === "low" ? "text-amber-600" : "text-red-600"
                            }`}>
                              {product.stock}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-gray-900">${totalValue.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <input
                              type="number"
                              min="0"
                              value={stockInputs[product._id] || ""}
                              onChange={(e) => setStockInputs({ ...stockInputs, [product._id]: e.target.value })}
                              className="w-20 px-2 py-1.5 text-center bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <button
                              onClick={() => handleUpdateStock(product._id)}
                              disabled={updating === product._id}
                              className="px-3 py-1.5 bg-violet-100 text-violet-700 font-medium rounded-lg hover:bg-violet-200 transition-colors text-xs disabled:opacity-50"
                            >
                              {updating === product._id ? "..." : "Update"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {sortedProducts.map((product) => {
                const unitPrice = product.salePrice || product.price;
                const totalValue = product.stock * unitPrice;
                return (
                  <div key={product._id} className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            product.brand === "Eveons" ? "bg-violet-100 text-violet-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {product.brand}
                          </span>
                          <span className="text-sm text-gray-500">${unitPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="text-xs text-gray-400">Stock</div>
                        <div className={`font-bold ${product.stock === 0 ? "text-red-600" : product.stock <= 5 ? "text-amber-600" : "text-gray-900"}`}>
                          {product.stock}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="text-xs text-gray-400">Value</div>
                        <div className="font-bold text-gray-900">${totalValue.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={stockInputs[product._id] || ""}
                        onChange={(e) => setStockInputs({ ...stockInputs, [product._id]: e.target.value })}
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="New stock"
                      />
                      <button
                        onClick={() => handleUpdateStock(product._id)}
                        disabled={updating === product._id}
                        className="px-4 py-2 bg-violet-500 text-white font-medium rounded-lg hover:bg-violet-600 transition-colors text-sm disabled:opacity-50"
                      >
                        {updating === product._id ? "..." : "Update"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Summary */}
        {!loading && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
              <div className="text-2xl font-bold text-gray-900">{products.length}</div>
              <div className="text-xs text-gray-500 mt-1">Total Products</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
              <div className="text-2xl font-bold text-emerald-600">{products.filter((p) => p.stock > 0).length}</div>
              <div className="text-xs text-gray-500 mt-1">In Stock</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
              <div className="text-2xl font-bold text-red-600">{products.filter((p) => p.stock === 0).length}</div>
              <div className="text-xs text-gray-500 mt-1">Out of Stock</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
              <div className="text-2xl font-bold text-amber-600">{products.filter((p) => p.stock > 0 && p.stock <= 5).length}</div>
              <div className="text-xs text-gray-500 mt-1">Low Stock</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
