import Header from '../components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Beyond Booking
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4">
            Booking to Experiencing
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Smart Digital Tourism Experience Platform for Tamil Nadu
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-8">
            Discover, plan, and experience complete travel journeys beyond traditional bookings.
            Connect with authentic local experiences, stays, and cultural activities across Tamil Nadu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/discover" className="bg-blue-600 !text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              🌟 Discover Destinations
            </Link>
            <Link href="/itinerary-planner" className="bg-purple-600 !text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              🗺️ Plan Your Trip
            </Link>
            <Link href="/operator/signup" className="bg-green-600 !text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              🏪 Join as Operator
            </Link>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Experience-First Tourism</h3>
            <p className="text-gray-600">
              Go beyond accommodation bookings to discover complete travel experiences including culture, wellness, and local activities.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Planning</h3>
            <p className="text-gray-600">
              Get personalized itinerary suggestions based on your interests, season, and location preferences.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Local Operator Support</h3>
            <p className="text-gray-600">
              Empower small tourism businesses with digital tools, demand insights, and direct tourist connections.
            </p>
          </div>
        </div>

        {/* Key Stats */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Tamil Nadu Tourism Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold">286M+</div>
              <div className="text-blue-100">Annual Domestic Tourists</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1.17M</div>
              <div className="text-blue-100">Foreign Tourists</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15,000+</div>
              <div className="text-blue-100">Local Experiences Available</div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-3xl mb-3">👩‍💼</div>
                <h4 className="font-semibold text-gray-900 mb-2">Priya Sharma</h4>
                <p className="text-sm text-gray-600 mb-3">Tourist from Delhi</p>
                <p className="text-gray-700">"Found authentic local experiences in Tamil Nadu that I couldn't find anywhere else!"</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-3xl mb-3">👨‍🍳</div>
                <h4 className="font-semibold text-gray-900 mb-2">Chef Kumar</h4>
                <p className="text-sm text-gray-600 mb-3">Local Operator</p>
                <p className="text-gray-700">"Beyond Booking helped me reach international tourists directly!"</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-3xl mb-3">🏔️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Mike Johnson</h4>
                <p className="text-sm text-gray-600 mb-3">Tourist from USA</p>
                <p className="text-gray-700">"Connected directly with local guides for an authentic adventure!"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience Beyond Booking?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the tourism revolution in Tamil Nadu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/discover" className="bg-green-600 !text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
              Start Exploring Now
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            © 2026 Beyond Booking - TN Tourism Innovation Hackathon
          </p>
          <p className="text-xs text-gray-600">
            Images courtesy of Tamil Nadu Tourism Department - <a href="https://www.tamilnadutourism.tn.gov.in/" className="text-blue-400 hover:text-blue-300">www.tamilnadutourism.tn.gov.in</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
