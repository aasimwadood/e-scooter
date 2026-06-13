import { Link, useNavigate } from "react-router-dom";

interface FooterProps {
  onBrandChange?: (brand: string) => void;
}

export default function Footer({ onBrandChange }: FooterProps) {
  const navigate = useNavigate();

  const handleBrandClick = (brand: string) => {
    onBrandChange?.(brand);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="5.5" cy="17.5" r="3.5"/>
                  <circle cx="18.5" cy="17.5" r="3.5"/>
                  <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
                </svg>
              </div>
              <div className="leading-tight">
                <span className="text-base font-bold text-white block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>E-Scooter</span>
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.2em] block">Kohat</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted destination for Eveons and Evee electric bikes in Kohat. Ride green, ride smart.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/?filter=all" className="hover:text-emerald-400 transition-colors">All Bikes</Link></li>
              <li><Link to="/?filter=new" className="hover:text-emerald-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/?filter=sale" className="hover:text-emerald-400 transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Brands</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleBrandClick("Eveons")}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Eveons Electric Bikes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleBrandClick("Evee")}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Evee Electric Bikes
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/warranty" className="hover:text-emerald-400 transition-colors">Warranty</Link></li>
              <li><Link to="/service" className="hover:text-emerald-400 transition-colors">Service Center</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 E-Scooter Kohat. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
