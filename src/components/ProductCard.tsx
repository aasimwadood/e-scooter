import { Link } from "react-router-dom";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const inStock = product.stock > 0;

  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              New
            </span>
          )}
          {product.isOnSale && product.salePrice !== null && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Sale
            </span>
          )}
        </div>
        {/* Brand badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            product.brand === "Eveons"
              ? "bg-violet-500/90 text-white"
              : "bg-amber-500/90 text-white"
          }`}>
            {product.brand}
          </span>
        </div>
        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              inStock
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">
          {product.description.slice(0, 100)}...
        </p>
        <div className="flex items-center gap-3 mt-4">
          {product.isOnSale && product.salePrice !== null ? (
            <>
              <span className="text-xl font-bold text-red-600">
                ${product.salePrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full ml-auto">
                -
                {Math.round(
                  ((product.price - product.salePrice) / product.price) * 100
                )}
                %
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
