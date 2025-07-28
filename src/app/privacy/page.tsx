export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <div className="max-w-3xl bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
        <p className="text-gray-600 mb-4">
          <strong>Effective Date:</strong> July 27, 2025
        </p>        
        </p>

        <section className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            GoPace.run values your privacy. This Privacy Policy explains how we
            collect, use, and protect your information when you use our website.
          </p>

          <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
          <p>
            We do not collect personally identifiable information unless you
            voluntarily provide it (e.g., email signup). We may collect
            non-identifiable information such as browser type, pages visited,
            and general usage data (via analytics tools).
          </p>

          <h2 className="text-xl font-semibold mt-6">2. How We Use Your Information</h2>
          <p>
            We use data to improve the website and user experience, and to
            display relevant ads and affiliate recommendations.
          </p>

          <h2 className="text-xl font-semibold mt-6">3. Cookies</h2>
          <p>
            GoPace.run uses cookies to enable functionality, track analytics,
            and display relevant ads (via Google AdSense). You can disable
            cookies in your browser settings.
          </p>

          <h2 className="text-xl font-semibold mt-6">4. Third-Party Services</h2>
          <p>
            Google AdSense and affiliate networks may use cookies to serve ads
            based on your interests.
          </p>

          <h2 className="text-xl font-semibold mt-6">5. Data Security</h2>
          <p>
            We implement standard security measures but cannot guarantee 100%
            security.
          </p>

          <h2 className="text-xl font-semibold mt-6">6. Contact</h2>
          <p>
            If you have questions about this policy, contact us at:{" "}
            <a href="mailto:support@gopace.run" className="text-blue-600 underline">
              support@gopace.run
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
