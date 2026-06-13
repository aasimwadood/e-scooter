export default function WarrantyPage() {
  const warrantyItems = [
    {
      title: "Frame & Fork",
      period: "2 Years",
      description: "The bicycle frame and fork are covered against manufacturing defects in materials and workmanship for 2 years from the date of purchase.",
      icon: "🔩",
    },
    {
      title: "Motor",
      period: "1 Year",
      description: "The electric motor (hub or mid-drive) is covered against defects and premature failure under normal use conditions for 1 year.",
      icon: "⚡",
    },
    {
      title: "Battery",
      period: "1 Year",
      description: "The lithium-ion battery pack is covered against defects and capacity degradation below 70% of rated capacity within the warranty period.",
      icon: "🔋",
    },
    {
      title: "Controller & Display",
      period: "1 Year",
      description: "The electronic controller, LCD display, and wiring harness are covered against electrical and manufacturing defects.",
      icon: "📟",
    },
    {
      title: "Brakes & Drivetrain",
      period: "6 Months",
      description: "Brake calipers, levers, rotors, derailleurs, and shifters are covered against manufacturing defects. Wear items like brake pads and chains are excluded.",
      icon: "🛑",
    },
    {
      title: "Tires & Tubes",
      period: "3 Months",
      description: "Tires and inner tubes are covered against manufacturing defects. Punctures, cuts, and normal wear are not covered.",
      icon: "🛞",
    },
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
            Warranty Information
          </h1>
          <p className="mt-4 text-emerald-100 text-lg max-w-xl mx-auto">
            Peace of mind with every ride. Here is what is covered on your Eveons and Evee electric bikes.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Warranty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warrantyItems.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{item.icon}</div>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                  {item.period}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* What's Not Covered */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2
            className="text-xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            What Is Not Covered
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Normal wear and tear (tires, brake pads, chains, grips)",
              "Damage caused by accidents, crashes, or misuse",
              "Unauthorized modifications or repairs",
              "Water damage beyond the IP rating (submersion)",
              "Cosmetic damage (scratches, dents from normal use)",
              "Damage from using non-genuine parts or accessories",
              "Commercial use (rental, delivery, shared fleets)",
              "Loss or theft of the bicycle or components",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                <span className="text-gray-600 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Claim */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2
            className="text-xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            How to Make a Warranty Claim
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm">
                Call or visit our showroom with your proof of purchase and describe the issue.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Inspection</h3>
              <p className="text-gray-600 text-sm">
                Our technicians will inspect the bike to confirm the defect and warranty eligibility.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Repair or Replace</h3>
              <p className="text-gray-600 text-sm">
                We will repair or replace the defective part at no cost. Most repairs are completed within 3–5 days.
              </p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-amber-800 text-sm">Important Note</h4>
              <p className="text-amber-700 text-sm mt-1">
                Warranty is valid only for the original purchaser and requires proof of purchase (receipt or invoice).
                All warranty claims must be made at our authorized service center in Kohat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
