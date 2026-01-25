'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';

export default function TouristProfile() {
  const [activeTab, setActiveTab] = useState('bookings');

  // Mock user bookings data
  const mockBookings = [
    {
      id: 'BK001',
      type: 'experience',
      title: 'Heritage Temple Tour',
      location: 'Mahabalipuram',
      operator: 'Dr. Archaeological Society',
      date: '2024-01-25',
      status: 'confirmed',
      amount: 2000,
      participants: 4,
      bookingDate: '2024-01-15',
      specialRequests: 'Vegetarian meals preferred',
    },
    {
      id: 'BK002',
      type: 'experience',
      title: 'Ayurvedic Wellness Retreat',
      location: 'Kodaikanal',
      operator: 'Siddha Wellness Center',
      date: '2024-02-10',
      status: 'confirmed',
      amount: 3500,
      participants: 2,
      bookingDate: '2024-01-18',
      specialRequests: 'Allergic to nuts',
    },
    {
      id: 'BK003',
      type: 'destination',
      title: 'Ooty Hill Station Visit',
      location: 'Ooty',
      operator: 'Local Guide Services',
      date: '2024-02-15',
      status: 'pending',
      amount: 0, // Custom pricing
      participants: 6,
      bookingDate: '2024-01-20',
      specialRequests: 'Need transportation from Coimbatore',
    },
  ];

  const mockFavorites = [
    {
      id: 'fav1',
      type: 'destination',
      name: 'Mahabalipuram',
      image: '🏛️',
      rating: 4.5,
    },
    {
      id: 'fav2',
      type: 'experience',
      title: 'Hill Station Trekking',
      location: 'Ooty',
      rating: 4.7,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your bookings and preferences</p>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
              👤
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">John Smith</h2>
              <p className="text-gray-600">john.smith@email.com</p>
              <p className="text-sm text-gray-500">Tourist since January 2024</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'bookings'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'favorites'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Favorites
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Your Bookings</h3>
                  <Link href="/discover" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Book New Experience
                  </Link>
                </div>

                <div className="space-y-6">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{booking.title}</h4>
                          <p className="text-gray-600">{booking.location}</p>
                          <p className="text-sm text-gray-500">Operator: {booking.operator}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Experience Date</p>
                          <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Participants</p>
                          <p className="font-medium">{booking.participants} people</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="font-medium">
                            {booking.amount > 0 ? `₹${booking.amount.toLocaleString()}` : 'Custom pricing'}
                          </p>
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Special Requests</p>
                          <p className="text-sm bg-white p-2 rounded border">{booking.specialRequests}</p>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                        </p>
                        <div className="flex space-x-2">
                          {booking.status === 'confirmed' && (
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              View Details
                            </button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <button className="text-red-600 hover:text-red-800 text-sm">
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {mockBookings.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-4">Start exploring amazing experiences in Tamil Nadu</p>
                    <Link href="/discover" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                      Discover Experiences
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Favorite Places & Experiences</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockFavorites.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-4xl mb-3">{item.image || '🎯'}</div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {item.name || item.title}
                      </h4>
                      {item.location && (
                        <p className="text-sm text-gray-600 mb-2">{item.location}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-500 text-sm">⭐ {item.rating}</span>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Reviews</h3>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">🏛️</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Heritage Temple Tour</h4>
                        <p className="text-sm text-gray-600 mb-2">Mahabalipuram • January 25, 2024</p>
                        <div className="flex items-center mb-2">
                          <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                          <span className="text-sm text-gray-600 ml-2">Excellent experience!</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          "Amazing tour with knowledgeable guides. Learned so much about the ancient temples and their history. Highly recommended!"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold text-gray-900">{mockBookings.length}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{mockBookings.reduce((sum, booking) => sum + booking.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-gray-900">{mockFavorites.length}</div>
            <div className="text-sm text-gray-600">Favorites</div>
          </div>
        </div>
      </div>
    </div>
  );
}