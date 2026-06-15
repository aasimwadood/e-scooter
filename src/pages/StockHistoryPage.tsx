import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminGetStockHistory, removeAuthToken } from "../api";
import { TableSkeleton } from "../components/LoadingSkeleton";
import type { StockHistoryEntry } from "../api";

export default function StockHistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<StockHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "added" | "removed">("all");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminGetStockHistory();
      setHistory(data);
    } catch {
      setError("Failed to load stock history.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    navigate("/");
  };

  const filteredHistory = history.filter((entry) => {
    if (filter === "added") return entry.change > 0;
    if (filter === "removed") return entry.change < 0;
    return true;
  });

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalAdded = history.filter((h) => h.change > 0).reduce((s, h) => s + h.change, 0);
  const totalRemoved = history.filter((h) => h.change < 0).reduce((s, h) => s + Math.abs(h.change), 0);
  const netChange = totalAdded - totalRemoved;

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
              📜 Stock History
            </h1>
            <p className="text-gray-500 mt-1">
              Track all stock changes across your inventory
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors text-sm"
            >
              ← Back to Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Entries</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{history.length}</div>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-center">
            <div className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Stock Added</div>
            <div className="text-2xl font-bold text-emerald-700 mt-1">+{totalAdded}</div>
          </div>
          <div className="bg-red-50 rounded-2xl p-5 border border-red-100 text-center">
            <div className="text-xs font-medium text-red-600 uppercase tracking-wider">Stock Removed</div>
            <div className="text-2xl font-bold text-red-700 mt-1">-{totalRemoved}</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Net Change</div>
            <div className={`text-2xl font-bold mt-1 ${netChange >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {netChange >= 0 ? "+" : ""}{netChange}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Filter:</span>
          {[
            { key: "all", label: "All Changes" },
            { key: "added", label: "Stock Added" },
            { key: "removed", label: "Stock Removed" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filter === f.key
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* History Table */}
        {loading ? (
          <TableSkeleton rows={6} />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Old Stock</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">New Stock</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Change</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit Price</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredHistory.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(entry.timestamp)}
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-medium text-gray-900 text-sm">{entry.productName}</span>
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-500">{entry.oldStock}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-bold text-gray-900">{entry.newStock}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-sm font-bold px-2.5 py-0.5 rounded-full ${
                          entry.change > 0
                            ? "bg-emerald-100 text-emerald-700"
                            : entry.change < 0
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {entry.change > 0 ? "+" : ""}{entry.change}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-600">
                        ${entry.unitPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`text-sm font-bold ${
                          entry.stockValueChange > 0
                            ? "text-emerald-600"
                            : entry.stockValueChange < 0
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}>
                          {entry.stockValueChange > 0 ? "+" : ""}${entry.stockValueChange.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {filteredHistory.map((entry) => (
                <div key={entry.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 text-sm">{entry.productName}</span>
                    <span className="text-xs text-gray-400">{formatDate(entry.timestamp)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{entry.oldStock} → <strong className="text-gray-900">{entry.newStock}</strong></span>
                    <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                      entry.change > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                      {entry.change > 0 ? "+" : ""}{entry.change}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Unit: ${entry.unitPrice.toLocaleString()}</span>
                    <span className={`font-bold ${entry.stockValueChange > 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {entry.stockValueChange > 0 ? "+" : ""}${entry.stockValueChange.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredHistory.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-2">📭</div>
                <p className="text-gray-500 text-sm">No history entries found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
