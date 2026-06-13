import { Link, useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  const handleBrandClick = (brand: string) => {
    navigate(`/?brand=${brand}&filter=all`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.pexels.com/photos/6900869/pexels-photo-6900869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            About{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              E-Scooter Kohat
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Kohat's premier destination for Eveons and Evee electric bikes.
            Bringing sustainable, powerful, and affordable e-mobility to our community.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Our Story
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Powering Kohat's{" "}
              <span className="text-emerald-600">green revolution</span>
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
              <p>
                E-Scooter Kohat was founded with a simple mission: to make electric
                mobility accessible to everyone in our city. As the authorized dealer
                for Eveons Electric Bikes and Evee Electric Bikes, we bring world-class
                e-bike technology directly to the people of Kohat and surrounding areas.
              </p>
              <p>
                We understand the unique needs of Pakistani commuters — from navigating
                busy city streets to tackling hilly terrain. That is why we carefully
                curate our selection to include models that perform exceptionally well
                in local conditions, with robust frames, powerful motors, and long-lasting
                batteries.
              </p>
              <p>
                Every bike we sell comes with local warranty support, spare parts
                availability, and expert servicing right here in Kohat. We do not just
                sell bikes — we build lasting relationships with our riders.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white text-center">
              <div className="text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>500+</div>
              <div className="text-emerald-100 text-sm mt-2">Bikes Sold</div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>4.9</div>
              <div className="text-gray-500 text-sm mt-2">Customer Rating</div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2</div>
              <div className="text-gray-500 text-sm mt-2">Premium Brands</div>
            </div>
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 text-white text-center">
              <div className="text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1yr</div>
              <div className="text-violet-100 text-sm mt-2">Warranty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Our Brands
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We are proud to be the authorized dealer for two of the most trusted names in electric cycling.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              onClick={() => handleBrandClick("Eveons")}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-left hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                Eveons Electric Bikes →
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Eveons is renowned for its cutting-edge e-bike technology, premium build quality,
                and innovative designs. From urban commuters to rugged trail bikes, Eveons delivers
                performance you can feel with every pedal stroke.
              </p>
            </button>
            <button
              onClick={() => handleBrandClick("Evee")}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-left hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-4">🚲</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                Evee Electric Bikes →
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Evee Electric Bikes combines affordability with reliability. Designed for everyday
                riders, Evee bikes offer exceptional value without compromising on quality, comfort,
                or range. Perfect for students, professionals, and families alike.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Why Choose Us
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Local Service
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Full-service center right here in Kohat. Warranty repairs, spare parts,
              and maintenance — no need to ship your bike anywhere.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Best Prices
            </h3>
            <p className="text-gray-600 leading-relaxed">
              As an authorized dealer, we offer competitive pricing with genuine
              products. No grey imports, no hidden costs.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Warranty Support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every bike comes with a manufacturer-backed warranty and our
              commitment to keeping you on the road.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold text-gray-900"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Ready to Ride?
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Visit our showroom or browse our collection online to find your perfect electric bike.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25 text-lg"
          >
            Shop All Bikes
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
