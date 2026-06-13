import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isAuthenticated, removeAuthToken } from "../api";

interface NavbarProps {
  onSearch?: (term: string) => void;
  onFilterChange?: (filter: string) => void;
  currentFilter?: string;
}

export default function Navbar({ onSearch, onFilterChange, currentFilter = "all" }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [location]);

  const isHomePage = location.pathname === "/";
  const isAbout = location.pathname === "/about";
  const isAdmin = location.pathname.startsWith("/admin");

  const activeFilter = isAbout ? "about" : isAdmin ? "admin" : currentFilter;

  const handleFilterClick = useCallback((filter: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/?filter=${filter}`);
    } else {
      onFilterChange?.(filter);
    }
  }, [location.pathname, navigate, onFilterChange]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/?search=${encodeURIComponent(searchTerm)}&filter=${currentFilter}`);
    } else {
      onSearch?.(searchTerm);
    }
  }, [searchTerm, location.pathname, navigate, currentFilter, onSearch]);

  const handleLogout = () => {
    removeAuthToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  const navLinks = [
    { label: "New Arrivals", filter: "new", icon: "✨" },
    { label: "Shop All", filter: "all", icon: "🚲" },
    { label: "Sale", filter: "sale", icon: "🏷️" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => onFilterChange?.("all")}>
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5.5" cy="17.5" r="3.5"/>
                <circle cx="18.5" cy="17.5" r="3.5"/>
                <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
              </svg>
            </div>
            <div className="leading-tight">
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                E-Scooter
              </span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] -mt-0.5 block">Kohat</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.filter}
                onClick={() => handleFilterClick(link.filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === link.filter && isHomePage
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.label}
              </button>
            ))}
            <Link
              to="/about"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isAbout
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span className="mr-1.5">ℹ️</span>
              About
            </Link>
          </nav>

          {/* Search + Admin */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center relative">
              <input
                type="text"
                placeholder="Search bikes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 lg:w-56 pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all"
              />
              <svg
                className="absolute left-3 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>

            {/* Admin Link */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    isAdmin ? "bg-violet-100 text-violet-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Admin
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-1">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex items-center relative mb-3 sm:hidden">
              <input
                type="text"
                placeholder="Search bikes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <svg className="absolute left-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>

            {navLinks.map((link) => (
              <button
                key={link.filter}
                onClick={() => handleFilterClick(link.filter)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === link.filter && isHomePage
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </button>
            ))}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isAbout ? "bg-emerald-100 text-emerald-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">ℹ️</span>
              About
            </Link>
            <div className="border-t border-gray-100 pt-2 mt-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    ⚙️ Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  👤 Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
