import { useState, useCallback } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import WarrantyPage from "./pages/WarrantyPage";
import ServicePage from "./pages/ServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import StockHistoryPage from "./pages/StockHistoryPage";

function AppContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter") || "all");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [brandFilter, setBrandFilter] = useState(searchParams.get("brand") || "");

  const handleFilterChange = useCallback(
    (newFilter: string) => {
      setFilter(newFilter);
      setBrandFilter("");
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("filter", newFilter);
        next.delete("brand");
        return next;
      });
    },
    [setSearchParams]
  );

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (term) {
          next.set("search", term);
        } else {
          next.delete("search");
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const handleBrandChange = useCallback(
    (brand: string) => {
      setBrandFilter(brand);
      setFilter("all");
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("brand", brand);
        next.set("filter", "all");
        return next;
      });
    },
    [setSearchParams]
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        currentFilter={filter}
      />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<HomePage filter={filter} searchTerm={searchTerm} brandFilter={brandFilter} onBrandChange={handleBrandChange} />}
          />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/warranty" element={<WarrantyPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/history"
            element={
              <ProtectedRoute>
                <StockHistoryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer onBrandChange={handleBrandChange} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
