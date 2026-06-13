export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-3 text-emerald-100">
            Last updated: January 2025
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              E-Scooter Kohat ("we", "our", or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or purchase our products.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery address.</li>
              <li><strong>Payment Information:</strong> We do not store credit card details. All payments are processed through secure third-party gateways.</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on site, and browsing behavior.</li>
              <li><strong>Device Information:</strong> IP address, browser type, and operating system.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your purchases and inquiries</li>
              <li>To improve our website and customer experience</li>
              <li>To send promotional offers (only with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell or rent your personal information to third parties. We may share
              your information with trusted service providers (such as delivery partners and
              payment processors) solely for the purpose of fulfilling your orders.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your
              personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:info@escooter-kohat.com" className="text-emerald-600 hover:underline">
                info@escooter-kohat.com
              </a>{" "}
              or visit our showroom at Main Bazaar Road, Kohat.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
