'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';

// Helper functions for AI recommendations
const getDistanceEstimate = (start: string, destination: string): number => {
  const distances: { [key: string]: { [key: string]: number } } = {
    'Chennai': {
      'Ooty': 560, 'Kodaikanal': 520, 'Madurai': 480, 'Kanyakumari': 700,
      'Rameswaram': 600, 'Mahabalipuram': 60, 'Thanjavur': 350, 'Kanchipuram': 80
    },
    'Bangalore': {
      'Ooty': 280, 'Kodaikanal': 380, 'Madurai': 430, 'Kanyakumari': 650,
      'Rameswaram': 550, 'Mahabalipuram': 350, 'Thanjavur': 380, 'Kanchipuram': 280
    },
    'Mumbai': {
      'Ooty': 1200, 'Kodaikanal': 1400, 'Madurai': 1350, 'Kanyakumari': 1580,
      'Rameswaram': 1480, 'Mahabalipuram': 1280, 'Thanjavur': 1180, 'Kanchipuram': 1200
    },
    'Delhi': {
      'Ooty': 2350, 'Kodaikanal': 2450, 'Madurai': 2400, 'Kanyakumari': 2630,
      'Rameswaram': 2530, 'Mahabalipuram': 2330, 'Thanjavur': 2230, 'Kanchipuram': 2250
    }
  };

  const startKey = start?.toLowerCase().includes('chen') ? 'Chennai' :
                  start?.toLowerCase().includes('bang') ? 'Bangalore' :
                  start?.toLowerCase().includes('mumb') ? 'Mumbai' :
                  start?.toLowerCase().includes('del') ? 'Delhi' : 'Chennai';

  return distances[startKey]?.[destination] || 500;
};

const getTravelTimeEstimate = (start: string, destination: string): string => {
  const distance = getDistanceEstimate(start, destination);
  const hours = Math.ceil(distance / 80);
  return `${hours} hours`;
};

const getRecommendedHotels = (destination: string) => {
  const hotels: { [key: string]: any[] } = {
    'Ooty': [
      { name: 'Hotel TamilNadu', type: 'Government Hotel', price: 2700, rating: 4.3, amenities: ['Mountain View', 'Restaurant', 'WiFi'] },
      { name: 'Lake View Resort', type: 'Resort', price: 3500, rating: 4.5, amenities: ['Lake View', 'Spa', 'Boating'] },
      { name: 'Colonial Homestay', type: 'Homestay', price: 2200, rating: 4.7, amenities: ['Heritage Building', 'Home-cooked Meals'] }
    ],
    'Kodaikanal': [
      { name: 'Hotel TamilNadu', type: 'Government Hotel', price: 2600, rating: 4.4, amenities: ['Lake View', 'Nature Trails', 'WiFi'] },
      { name: 'Lake Side Resort', type: 'Resort', price: 3200, rating: 4.5, amenities: ['Lake View', 'Boating', 'Spa'] },
      { name: 'Mountain View Homestay', type: 'Homestay', price: 1900, rating: 4.6, amenities: ['Mountain Views', 'Organic Food'] }
    ],
    'Madurai': [
      { name: 'Hotel TamilNadu', type: 'Government Hotel', price: 2300, rating: 4.5, amenities: ['Temple Proximity', 'Cultural Events', 'WiFi'] },
      { name: 'Temple View Grand Hotel', type: 'Hotel', price: 2500, rating: 4.3, amenities: ['Temple View', 'Business Center', 'Restaurant'] },
      { name: 'Traditional Chettinad Homestay', type: 'Homestay', price: 2000, rating: 4.8, amenities: ['Chettinad Architecture', 'Authentic Cuisine'] }
    ]
  };
  return hotels[destination] || [];
};

const getEnRouteAttractions = (start: string, destination: string): any[] => {
  const attractions: { [key: string]: any[] } = {
    'Ooty': [
      { name: 'Wellington Cantonment', description: 'British-era military cantonment with colonial architecture', distance: '50km from Ooty' },
      { name: 'Coonoor Tea Gardens', description: 'Beautiful tea plantations with scenic views', distance: '20km from Ooty' },
      { name: 'Doddabetta Peak', description: 'Highest peak in the Nilgiris with panoramic views', distance: '10km from Ooty' }
    ],
    'Kodaikanal': [
      { name: 'Poombarai Village', description: 'Tribal village showcasing local culture and traditions', distance: '15km from Kodaikanal' },
      { name: 'Pillar Rocks', description: 'Famous rock formation with breathtaking views', distance: '8km from Kodaikanal' },
      { name: 'Palani Temple', description: 'Ancient temple dedicated to Lord Murugan', distance: '60km from Kodaikanal' }
    ],
    'Madurai': [
      { name: 'Tiruchirappalli Rock Fort', description: 'Ancient fort built on a rock formation', distance: '130km from Madurai' },
      { name: 'Srirangam Temple', description: 'One of the largest temple complexes in India', distance: '15km from Madurai' },
      { name: 'Thanjavur Palace', description: 'Royal palace with architectural marvels', distance: '60km from Madurai' }
    ]
  };
  return attractions[destination] || [];
};

const getEntryFees = (destination: string): { name: string, amount: number, description: string }[] => {
  const fees: { [key: string]: { name: string, amount: number, description: string }[] } = {
    'Ooty': [
      { name: 'Botanical Gardens', amount: 50, description: 'Entry to the beautiful Government Botanical Gardens' },
      { name: 'Ooty Lake Boating', amount: 200, description: 'Pedal boat rental for 30 minutes' },
      { name: 'Doddabetta Peak', amount: 100, description: 'Entry to the viewpoint and observatory' }
    ],
    'Kodaikanal': [
      { name: 'Kodaikanal Lake', amount: 50, description: 'Entry to the lake area and walking paths' },
      { name: 'Pillar Rocks', amount: 100, description: 'Entry to the viewpoint area' },
      { name: 'Bear Shola Falls', amount: 50, description: 'Entry to the waterfall viewing area' }
    ],
    'Madurai': [
      { name: 'Meenakshi Temple', amount: 100, description: 'Entry to the main temple complex' },
      { name: 'Tirumalai Nayak Palace', amount: 150, description: 'Entry to the palace museum' },
      { name: 'Gandhi Museum', amount: 100, description: 'Entry to the museum and memorial' }
    ]
  };
  return fees[destination] || [];
};

const getWeatherInfo = (destination: string) => {
  const weather: { [key: string]: { temp: string, condition: string, bestTime: string } } = {
    'Ooty': { temp: '15-25°C', condition: 'Cool and misty', bestTime: 'October to May' },
    'Kodaikanal': { temp: '12-22°C', condition: 'Pleasant and cool', bestTime: 'October to May' },
    'Madurai': { temp: '25-35°C', condition: 'Warm and humid', bestTime: 'October to March' }
  };
  return weather[destination] || { temp: '20-30°C', condition: 'Pleasant', bestTime: 'October to March' };
};

export default function RecommendationsPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const data = sessionStorage.getItem('completedBooking');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      router.push('/');
    }
  }, [router]);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading recommendations...</p>
          </div>
        </div>
      </div>
    );
  }

  const distance = getDistanceEstimate(bookingData.startingPlace, bookingData.item);
  const travelTime = getTravelTimeEstimate(bookingData.startingPlace, bookingData.item);
  const hotels = getRecommendedHotels(bookingData.item);
  const attractions = getEnRouteAttractions(bookingData.startingPlace, bookingData.item);
  const entryFees = getEntryFees(bookingData.item);
  const weather = getWeatherInfo(bookingData.item);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-3 text-sm">
            <li>
              <Link href="/" className="text-slate-500 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <span>🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <Link href="/book/complete" className="text-slate-500 hover:text-blue-600 transition-colors">
                Booking Complete
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-medium">AI Recommendations</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl shadow-xl mb-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h1 className="text-4xl font-bold mb-2">AI Travel Recommendations</h1>
            <p className="text-purple-100 text-lg">
              Personalized suggestions for your journey from {bookingData.startingPlace} to {bookingData.item}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">📍 {distance}km Distance</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">⏱️ {travelTime} Travel</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🌤️ {weather.condition}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-1 mb-8">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'travel', label: 'Travel & Route', icon: '🚗' },
              { id: 'hotels', label: 'Hotels', icon: '🏨' },
              { id: 'attractions', label: 'Attractions', icon: '🎭' },
              { id: 'fees', label: 'Entry Fees', icon: '🎫' },
              { id: 'tips', label: 'Travel Tips', icon: '💡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Route Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🗺️</span>
                  Route Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium">From:</span>
                    <span className="text-lg font-semibold text-blue-600">{bookingData.startingPlace}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium">To:</span>
                    <span className="text-lg font-semibold text-green-600">{bookingData.item}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium">Distance:</span>
                    <span className="text-lg font-semibold">{distance} km</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium">Travel Time:</span>
                    <span className="text-lg font-semibold">{travelTime}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium">Weather:</span>
                    <span className="text-lg font-semibold">{weather.temp} • {weather.condition}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📈</span>
                  Trip Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{bookingData.participants}</div>
                    <div className="text-sm text-gray-600">Travelers</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">₹{Math.round(distance * 8)}</div>
                    <div className="text-sm text-gray-600">Est. Travel Cost</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{hotels.length}</div>
                    <div className="text-sm text-gray-600">Hotel Options</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{attractions.length}</div>
                    <div className="text-sm text-gray-600">En-route Attractions</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Travel & Route Tab */}
          {activeTab === 'travel' && (
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🗺️</span>
                  Route Map
                </h3>
                <div className="bg-gradient-to-br from-blue-100 to-green-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-gray-600">Interactive Route Map</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {bookingData.startingPlace} → {bookingData.item} ({distance}km)
                    </p>
                  </div>
                </div>
              </div>

              {/* Travel Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-4xl mb-4">🚗</div>
                  <h4 className="font-bold text-lg mb-2">Car Travel</h4>
                  <p className="text-gray-600 text-sm mb-3">Recommended for flexibility and comfort</p>
                  <div className="text-2xl font-bold text-green-600">₹{Math.round(distance * 8)}</div>
                  <div className="text-sm text-gray-500">Estimated cost</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-4xl mb-4">🚌</div>
                  <h4 className="font-bold text-lg mb-2">Bus Travel</h4>
                  <p className="text-gray-600 text-sm mb-3">Budget-friendly option with AC coaches</p>
                  <div className="text-2xl font-bold text-blue-600">₹{Math.round(distance * 2)}</div>
                  <div className="text-sm text-gray-500">Estimated cost</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-4xl mb-4">🚂</div>
                  <h4 className="font-bold text-lg mb-2">Train Travel</h4>
                  <p className="text-gray-600 text-sm mb-3">Scenic journey with onboard facilities</p>
                  <div className="text-2xl font-bold text-purple-600">₹{Math.round(distance * 1.5)}</div>
                  <div className="text-sm text-gray-500">Estimated cost</div>
                </div>
              </div>

              {/* Food & Rest Stops */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🍽️</span>
                  Food & Rest Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌅</div>
                    <h4 className="font-bold mb-2">Breakfast</h4>
                    <p className="text-sm text-gray-600">Traditional South Indian breakfast</p>
                    <p className="text-sm font-medium text-orange-600 mt-2">Idli, Dosa, Pongal</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-3">☀️</div>
                    <h4 className="font-bold mb-2">Lunch</h4>
                    <p className="text-sm text-gray-600">Highway restaurant or dhabas</p>
                    <p className="text-sm font-medium text-orange-600 mt-2">Vegetarian Thali</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌙</div>
                    <h4 className="font-bold mb-2">Snacks</h4>
                    <p className="text-sm text-gray-600">Fresh fruits and local delicacies</p>
                    <p className="text-sm font-medium text-orange-600 mt-2">Banana, Mango, Sweets</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hotels Tab */}
          {activeTab === 'hotels' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">🏨</span>
                Recommended Hotels in {bookingData.item}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center">
                      <span className="text-3xl">🏨</span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg mb-1">{hotel.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{hotel.type}</p>
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm ml-1">{hotel.rating}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {hotel.amenities.slice(0, 2).map((amenity: string, idx: number) => (
                          <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">₹{hotel.price}</span>
                        <span className="text-sm text-gray-500">per night</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attractions Tab */}
          {activeTab === 'attractions' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">🎭</span>
                En-Route Attractions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {attractions.map((attraction, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="font-bold text-lg mb-2">{attraction.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{attraction.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">📍</span>
                      {attraction.distance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Entry Fees Tab */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">🎫</span>
                Entry Fees & Permits
              </h3>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  {entryFees.map((fee, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
                      <div>
                        <h4 className="font-medium">{fee.name}</h4>
                        <p className="text-sm text-gray-600">{fee.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">₹{fee.amount}</div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 p-4">
                  <p className="text-sm text-green-700 flex items-center">
                    <span className="mr-2">💡</span>
                    Book online in advance for discounted rates and skip-the-line access
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Travel Tips Tab */}
          {activeTab === 'tips' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">💡</span>
                AI Travel Assistant Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <span className="text-xl mr-2">🎒</span>
                      Packing Essentials
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Light clothing and comfortable walking shoes</li>
                      <li>• Sunscreen, hat, and sunglasses</li>
                      <li>• Reusable water bottle and snacks</li>
                      <li>• Valid ID proof and travel documents</li>
                      <li>• Power bank and universal adapter</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <span className="text-xl mr-2">📱</span>
                      Digital Preparation
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Download offline maps of the route</li>
                      <li>• Keep phone charged and have backup power</li>
                      <li>• Download translation apps if needed</li>
                      <li>• Save emergency contact numbers</li>
                      <li>• Enable location sharing with family</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <span className="text-xl mr-2">⏰</span>
                      Timing & Planning
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Arrive early to avoid crowds</li>
                      <li>• Visit during cooler hours (early morning/late afternoon)</li>
                      <li>• Plan for traffic and road conditions</li>
                      <li>• Check weather forecasts regularly</li>
                      <li>• Keep buffer time for unexpected delays</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <span className="text-xl mr-2">🛡️</span>
                      Safety & Health
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Stay hydrated throughout the journey</li>
                      <li>• Carry basic medicines and first aid</li>
                      <li>• Respect local customs and traditions</li>
                      <li>• Keep valuables secure and be aware of surroundings</li>
                      <li>• Have travel insurance coverage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            📊 View My Bookings
          </Link>
          <Link
            href="/discover"
            className="bg-green-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-green-700 transition-colors text-center"
          >
            🏞️ Explore More Destinations
          </Link>
          <Link
            href="/"
            className="bg-gray-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center"
          >
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}