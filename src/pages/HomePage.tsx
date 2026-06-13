import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/LoadingSkeleton";
import { fetchProducts } from "../api";
import type { Product } from "../data/products";

interface HomePageProps {
  filter: string;
  searchTerm: string;
  brandFilter: string;
  onBrandChange: (brand: string) => void;
}

export default function HomePage({ filter, searchTerm, brandFilter, onBrandChange }: HomePageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts({
        search: searchTerm || undefined,
        filter: filter,
        brand: brandFilter || undefined,
      });
      setProducts(data);
    } catch {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filter, searchTerm, brandFilter]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filterLabels: Record<string, string> = {
    all: "All Electric Bikes",
    new: "New Arrivals",
    sale: "On Sale",
  };

  const filterDescriptions: Record<string, string> = {
    all: "Explore our complete collection of Eveons and Evee electric bikes",
    new: "Check out the latest electric bikes in our Kohat showroom",
    sale: "Do not miss these incredible deals on premium e-bikes",
  };

  const getPageTitle = () => {
    if (searchTerm) return `Results for "${searchTerm}"`;
    if (brandFilter) return `${brandFilter} Electric Bikes`;
    return filterLabels[filter] || "All Electric Bikes";
  };

  const getPageDescription = () => {
    if (searchTerm) return null;
    if (brandFilter) {
      return brandFilter === "Eveons"
        ? "Premium electric bikes engineered for performance and reliability"
        : "Affordable electric bikes designed for everyday riders";
    }
    return filterDescriptions[filter];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section (only show on 'all' filter with no search and no brand) */}
      {filter === "all" && !searchTerm && !brandFilter && (
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950">
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.pexels.com/photos/17871207/pexels-photo-17871207.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Authorized Dealer — Eveons & Evee
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ride the{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Future
                </span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-300">
                  in Kohat
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-lg">
                Premium Eveons and Evee electric bikes, now available at E-Scooter Kohat.
                Eco-friendly commuting with zero emissions and maximum comfort.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/?filter=new"
                  className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                >
                  Shop New Arrivals
                </Link>
                <Link
                  to="/?filter=sale"
                  className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
                >
                  View Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {getPageTitle()}
              </h2>
              {getPageDescription() && (
                <p className="text-gray-500 mt-1">
                  {getPageDescription()}
                </p>
              )}
            </div>
            {!loading && (
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {products.length} product{products.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Brand filter pills */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Filter by brand:</span>
            <button
              onClick={() => onBrandChange("")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                !brandFilter ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Brands
            </button>
            <button
              onClick={() => onBrandChange("Eveons")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                brandFilter === "Eveons" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Eveons
            </button>
            <button
              onClick={() => onBrandChange("Evee")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                brandFilter === "Evee" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Evee
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No bikes found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you are looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
