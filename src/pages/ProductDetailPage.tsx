import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api";
import { ProductDetailSkeleton } from "../components/LoadingSkeleton";
import type { Product } from "../data/products";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lazy-loaded technical specs
  const [showSpecs, setShowSpecs] = useState(false);
  const [specsVisible, setSpecsVisible] = useState(false);
  const specsRef = useRef<HTMLDivElement>(null);

  // Fetch product on mount (primary lazy load)
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((data) => {
        if (!data) {
          setError("Product not found");
        } else {
          setProduct(data);
        }
      })
      .catch(() => {
        setError("Failed to load product details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Intersection Observer for lazy loading specs section
  useEffect(() => {
    if (!showSpecs || !specsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Simulate loading specs data
          setTimeout(() => {
            setSpecsVisible(true);
          }, 400);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(specsRef.current);
    return () => observer.disconnect();
  }, [showSpecs]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {error || "Product not found"}
        </h2>
        <p className="text-gray-500 mb-6">
          We couldn't find the bike you're looking for.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const inStock = product.stock > 0;
  const discount =
    product.isOnSale && product.salePrice
      ? Math.round(
          ((product.price - product.salePrice) / product.price) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/" className="hover:text-emerald-600 transition-colors">
            Shop
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="relative aspect-square">
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewArrival && (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    New Arrival
                  </span>
                )}
                {product.isOnSale && product.salePrice !== null && (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {discount}% Off
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                product.brand === "Eveons"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {product.brand}
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-center gap-4">
              {product.isOnSale && product.salePrice !== null ? (
                <>
                  <span className="text-3xl font-bold text-red-600">
                    ${product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">
                    Save ${(product.price - product.salePrice).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-5">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  inStock
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    inStock ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {inStock
                  ? `In Stock — ${product.stock} available`
                  : "Out of Stock"}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="text-gray-600 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Quick specs highlights */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Top Speed</div>
                <div className="text-lg font-bold text-gray-900 mt-1">{product.specs.topSpeed}</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Range</div>
                <div className="text-lg font-bold text-gray-900 mt-1">{product.specs.range}</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Weight</div>
                <div className="text-lg font-bold text-gray-900 mt-1">{product.specs.weight}</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Motor</div>
                <div className="text-lg font-bold text-gray-900 mt-1">{product.specs.motor}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 space-y-3">
              <button
                disabled={!inStock}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  inStock
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>

        {/* Technical Specs Section — Lazy loaded */}
        <div className="mt-12 sm:mt-16">
          {!showSpecs ? (
            <button
              onClick={() => setShowSpecs(true)}
              className="w-full bg-white border-2 border-dashed border-gray-200 rounded-2xl py-8 text-center hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
            >
              <div className="text-3xl mb-2">📋</div>
              <span className="text-lg font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors">
                Show Technical Specifications
              </span>
              <p className="text-sm text-gray-400 mt-1">
                Click to load detailed specs for this bike
              </p>
            </button>
          ) : (
            <div ref={specsRef} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2
                  className="text-xl font-bold text-gray-900"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Technical Specifications
                </h2>
              </div>
              {!specsVisible ? (
                <div className="p-6 animate-pulse space-y-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50">
                      <div className="h-4 bg-gray-200 rounded w-32" />
                      <div className="h-4 bg-gray-200 rounded w-40" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="mt-10 pb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all bikes
          </Link>
        </div>
      </div>
    </div>
  );
}
