export default function ServicePage() {
  const services = [
    {
      title: "General Tune-Up",
      price: "PKR 1,500",
      description: "Complete inspection, brake adjustment, gear tuning, chain lubrication, tire pressure check, and bolt tightening.",
      duration: "1–2 hours",
      icon: "🔧",
    },
    {
      title: "Battery Health Check",
      price: "PKR 800",
      description: "Full diagnostic of battery voltage, capacity, cell balance, and charging system. Includes a detailed health report.",
      duration: "30–45 min",
      icon: "🔋",
    },
    {
      title: "Motor Diagnostics",
      price: "PKR 1,200",
      description: "Comprehensive motor testing including hall sensor check, winding resistance, and controller communication test.",
      duration: "45–60 min",
      icon: "⚡",
    },
    {
      title: "Brake Service",
      price: "PKR 1,000",
      description: "Brake pad replacement, rotor truing, hydraulic bleed (if applicable), and cable replacement for mechanical brakes.",
      duration: "1 hour",
      icon: "🛑",
    },
    {
      title: "Flat Tire Repair",
      price: "PKR 500",
      description: "Inner tube replacement or puncture patch, tire inspection, and proper inflation. Tubeless sealant refresh available.",
      duration: "30 min",
      icon: "🛞",
    },
    {
      title: "Electrical System Repair",
      price: "From PKR 2,000",
      description: "Display replacement, wiring harness repair, controller replacement, sensor calibration, and throttle repair.",
      duration: "1–3 hours",
      icon: "📟",
    },
  ];

  const spareParts = [
    { name: "Brake Pads (per pair)", price: "PKR 800" },
    { name: "Inner Tube (20–27.5)", price: "PKR 600" },
    { name: "Chain (KMC / Shimano)", price: "PKR 1,200" },
    { name: "Battery Charger (36V)", price: "PKR 4,500" },
    { name: "Battery Charger (48V)", price: "PKR 5,500" },
    { name: "Throttle / Display", price: "PKR 3,500" },
    { name: "Brake Rotor (160mm)", price: "PKR 1,000" },
    { name: "Kickstand", price: "PKR 700" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Service Center
          </h1>
          <p className="mt-4 text-emerald-100 text-lg max-w-xl mx-auto">
            Professional repair and maintenance for all Eveons and Evee electric bikes, right here in Kohat.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Why Service With Us */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-3">👨‍🔧</div>
            <h3 className="font-bold text-gray-900">Certified Technicians</h3>
            <p className="text-gray-600 text-sm mt-2">
              Our mechanics are factory-trained on Eveons and Evee electric bike systems.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900">Genuine Parts</h3>
            <p className="text-gray-600 text-sm mt-2">
              We use only original manufacturer parts to keep your warranty valid.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold text-gray-900">Fast Turnaround</h3>
            <p className="text-gray-600 text-sm mt-2">
              Most services completed same day or within 24–48 hours.
            </p>
          </div>
        </div>

        {/* Service Menu */}
        <h2
          className="text-2xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Service Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{service.icon}</span>
                  <h3 className="font-bold text-gray-900">{service.title}</h3>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-sm font-bold px-3 py-1 rounded-full shrink-0">
                  {service.price}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{service.description}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Estimated time: {service.duration}
              </div>
            </div>
          ))}
        </div>

        {/* Spare Parts */}
        <h2
          className="text-2xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Spare Parts Price List
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="hidden sm:grid sm:grid-cols-2 bg-gray-50 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Part Name</span>
            <span className="text-right">Price</span>
          </div>
          <div className="divide-y divide-gray-50">
            {spareParts.map((part) => (
              <div
                key={part.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900 font-medium">{part.name}</span>
                <span className="text-emerald-600 font-bold mt-1 sm:mt-0">{part.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Tips */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2
            className="text-xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Maintenance Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-emerald-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Charge Regularly</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Keep your battery between 20% and 80% for optimal lifespan. Avoid leaving it fully discharged for long periods.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-emerald-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Keep It Clean</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Wipe down your bike after rides, especially the chain and drivetrain. Do not use a pressure washer on electrical components.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-emerald-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Check Tire Pressure</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Maintain proper tire pressure (marked on the tire sidewall) for better range, comfort, and to prevent pinch flats.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-emerald-600 font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Service Every 3 Months</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Bring your bike in for a tune-up every 3 months or 500 km of riding to keep everything running smoothly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need to book a service? Call us or visit our showroom.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+923331234567"
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25"
            >
              📞 Call +92 333 1234567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
