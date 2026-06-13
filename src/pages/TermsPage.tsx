export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Terms of Service
          </h1>
          <p className="mt-3 text-emerald-100">
            Last updated: January 2025
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using the E-Scooter Kohat website and services, you agree to be bound
              by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Products and Pricing</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>All prices are listed in Pakistani Rupees (PKR) unless otherwise stated.</li>
              <li>Prices are subject to change without prior notice.</li>
              <li>We reserve the right to limit quantities of any product.</li>
              <li>Product images are for illustration purposes and may differ slightly from the actual product.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Orders and Payment</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>All orders are subject to availability and confirmation of payment.</li>
              <li>We accept cash on delivery, bank transfer, and mobile wallet payments.</li>
              <li>Orders may be cancelled by us if the product is unavailable or pricing errors occur.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Delivery</h2>
            <p className="text-gray-600 leading-relaxed">
              We deliver within Kohat city and surrounding areas. Delivery times are estimates
              and may vary based on location and availability. Customers are responsible for
              providing accurate delivery information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Returns and Refunds</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Products may be returned within 7 days of delivery if defective or damaged.</li>
              <li>Products must be in original packaging with all accessories included.</li>
              <li>Refunds will be processed within 14 business days of receiving the returned item.</li>
              <li>Sale items are non-refundable unless defective.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Warranty</h2>
            <p className="text-gray-600 leading-relaxed">
              All electric bikes come with a manufacturer warranty as detailed on our Warranty page.
              Warranty claims must be made at our authorized service center in Kohat with proof of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              E-Scooter Kohat shall not be liable for any indirect, incidental, or consequential
              damages arising from the use of our products or services. Our total liability shall
              not exceed the amount paid for the product in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the
              laws of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of
              the courts in Kohat, KPK.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For any questions regarding these terms, please contact us at{" "}
              <a href="mailto:info@escooter-kohat.com" className="text-emerald-600 hover:underline">
                info@escooter-kohat.com
              </a>{" "}
              or call +92 333 1234567.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
