

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded-full w-3/4" />
        <div className="h-4 bg-gray-200 rounded-full w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 rounded-full w-24" />
          <div className="h-6 bg-gray-200 rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-40 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-gray-200 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded-full w-3/4" />
          <div className="h-6 bg-gray-200 rounded-full w-32" />
          <div className="h-10 bg-gray-200 rounded-full w-40 mt-4" />
          <div className="space-y-2 pt-4">
            <div className="h-4 bg-gray-200 rounded-full w-full" />
            <div className="h-4 bg-gray-200 rounded-full w-full" />
            <div className="h-4 bg-gray-200 rounded-full w-5/6" />
            <div className="h-4 bg-gray-200 rounded-full w-4/6" />
          </div>
          <div className="h-12 bg-gray-200 rounded-xl w-full mt-6" />
          <div className="h-12 bg-gray-200 rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
          <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-48" />
            <div className="h-3 bg-gray-200 rounded w-24" />
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-24" />
          <div className="h-10 bg-gray-200 rounded-lg w-24" />
        </div>
      ))}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );
}
