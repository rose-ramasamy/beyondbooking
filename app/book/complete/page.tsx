'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';

export default function BookingCompletePage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Retrieve completed booking data from session storage
    const data = sessionStorage.getItem('completedBooking');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      // If no completed booking data, redirect to home
      router.push('/');
    }
  }, [router]);

  const calculateTotal = () => {
    if (!bookingData) return 0;

    const { additionalExperiences, selectedAccommodation, participants, selectedDarshan, itemType } = bookingData;

    // Base price calculation
    const basePrice = itemType === 'experience' ? (selectedDarshan ? selectedDarshan.price : 0) : 0;
    const additionalTotal = additionalExperiences?.reduce((sum: number, exp: any) => sum + exp.price, 0) || 0;
    let total = (basePrice + additionalTotal) * participants;

    // Add accommodation cost if selected
    if (selectedAccommodation && bookingData.date) {
      if (bookingData.endDate) {
        // Multi-night stay
        const startDate = new Date(bookingData.date);
        const endDate = new Date(bookingData.endDate);
        const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        if (nights > 0) {
          total += selectedAccommodation.price * nights;
        }
      } else {
        // Single night stay
        total += selectedAccommodation.price * 1;
      }
    }

    return total;
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking confirmation...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
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
            <li className="text-slate-900 font-medium">Booking Confirmed</li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
            <div className="text-center">
              <div className="text-7xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-green-100 text-lg">Your Tamil Nadu adventure is all set</p>
            </div>
          </div>

          <div className="p-8">
            {/* Booking ID and Status */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-green-800 mb-2">Booking #{bookingData.bookingId}</h2>
                  <p className="text-green-700">Payment completed successfully • {new Date(bookingData.paymentTime).toLocaleString('en-IN')}</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Summary */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Destination/Experience:</span>
                    <span className="font-semibold text-gray-900">{bookingData.item}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Travel Date:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(bookingData.date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {bookingData.endDate && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">End Date:</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(bookingData.endDate).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Participants:</span>
                    <span className="font-semibold text-gray-900">{bookingData.participants}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Tourist Name:</span>
                    <span className="font-semibold text-gray-900">{bookingData.touristName}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="font-semibold text-gray-900">{bookingData.touristEmail}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="font-semibold text-gray-900">{bookingData.touristPhone}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Starting Place:</span>
                    <span className="font-semibold text-gray-900">{bookingData.startingPlace}</span>
                  </div>

                  {bookingData.selectedAccommodation && (
                    <div className="py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-700 mb-2">Accommodation:</div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="font-semibold">{bookingData.selectedAccommodation.name}</div>
                        <div className="text-sm text-gray-600">{bookingData.selectedAccommodation.type}</div>
                      </div>
                    </div>
                  )}

                  {bookingData.additionalExperiences && bookingData.additionalExperiences.length > 0 && (
                    <div className="py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-700 mb-2">Additional Experiences:</div>
                      <div className="space-y-2">
                        {bookingData.additionalExperiences.map((exp: any, index: number) => (
                          <div key={index} className="bg-green-50 p-2 rounded">
                            <span className="text-sm font-medium">{exp.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* What's Next & Actions */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h2>

                {/* Next Steps */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mt-1">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Check Your Email</h3>
                      <p className="text-gray-600 text-sm">Complete booking details and e-ticket sent to {bookingData.touristEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mt-1">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Save Booking ID</h3>
                      <p className="text-gray-600 text-sm">Keep booking #{bookingData.bookingId} for your records</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mt-1">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Prepare for Your Trip</h3>
                      <p className="text-gray-600 text-sm">Check weather, pack essentials, and review local guidelines</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mt-1">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Payment Completed</h3>
                      <p className="text-gray-600 text-sm">₹{calculateTotal().toLocaleString()} paid successfully via UPI</p>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Notes</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Carry a valid ID proof for verification</li>
                    <li>• Reach 30 minutes before scheduled time</li>
                    <li>• Contact our support for any changes</li>
                    <li>• Check local weather conditions</li>
                  </ul>
                </div>

                {/* AI Travel Recommendations */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🤖</div>
                    <h3 className="text-2xl font-bold text-purple-800 mb-2">AI Travel Recommendations</h3>
                    <p className="text-purple-600 mb-6">Get personalized suggestions for your journey from {bookingData?.startingPlace} to {bookingData?.item}</p>
                    <Link
                      href="/book/recommendations"
                      className="inline-block bg-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                    >
                      🚀 View AI Recommendations
                    </Link>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/dashboard"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center block"
                  >
                    📊 View My Bookings
                  </Link>

                  <Link
                    href="/discover"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors text-center block"
                  >
                    🏞️ Explore More Destinations
                  </Link>

                  <Link
                    href="/"
                    className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors text-center block"
                  >
                    🏠 Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}