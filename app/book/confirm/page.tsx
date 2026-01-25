'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';

export default function BookingConfirmPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Retrieve booking data from session storage
    const data = sessionStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      // If no booking data, redirect to book page
      router.push('/book');
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

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Store booking data for completion page
      sessionStorage.setItem('completedBooking', JSON.stringify({
        ...bookingData,
        bookingId: 'TN' + Date.now(),
        paymentStatus: 'completed',
        paymentTime: new Date().toISOString()
      }));

      // Clear the booking data
      sessionStorage.removeItem('bookingData');

      // Navigate to completion page
      router.push('/book/complete');
    }, 2000);
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking details...</p>
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
            <li>
              <Link href="/discover" className="text-slate-500 hover:text-blue-600 transition-colors">
                Discover
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <Link href="/book" className="text-slate-500 hover:text-blue-600 transition-colors">
                Book
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-medium">Confirm</li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold mb-2">Confirm Your Booking</h1>
              <p className="text-green-100">Please review your details and complete payment</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Details</h2>

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
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-semibold">{bookingData.selectedAccommodation.name}</div>
                        <div className="text-sm text-gray-600">{bookingData.selectedAccommodation.type}</div>
                        <div className="text-sm text-gray-600">₹{bookingData.selectedAccommodation.price}/night</div>
                      </div>
                    </div>
                  )}

                  {bookingData.additionalExperiences && bookingData.additionalExperiences.length > 0 && (
                    <div className="py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-700 mb-2">Additional Experiences:</div>
                      <div className="space-y-2">
                        {bookingData.additionalExperiences.map((exp: any, index: number) => (
                          <div key={index} className="bg-blue-50 p-2 rounded flex justify-between">
                            <span className="text-sm">{exp.title}</span>
                            <span className="text-sm font-medium">₹{exp.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingData.specialRequests && (
                    <div className="py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-700 mb-2">Special Requests:</div>
                      <div className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {bookingData.specialRequests}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Details</h2>

                {/* Price Breakdown */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">Price Breakdown</h3>

                  <div className="space-y-3">
                    {bookingData.itemType === 'experience' && bookingData.selectedDarshan && (
                      <div className="flex justify-between">
                        <span>Base Experience:</span>
                        <span>₹{(bookingData.selectedDarshan.price * bookingData.participants).toLocaleString()}</span>
                      </div>
                    )}

                    {bookingData.additionalExperiences && bookingData.additionalExperiences.length > 0 && (
                      <div className="flex justify-between">
                        <span>Additional Experiences:</span>
                        <span>₹{bookingData.additionalExperiences.reduce((sum: number, exp: any) => sum + exp.price, 0) * bookingData.participants}</span>
                      </div>
                    )}

                    {bookingData.selectedAccommodation && (
                      <div className="flex justify-between">
                        <span>Accommodation:</span>
                        <span>
                          {bookingData.endDate ? (
                            (() => {
                              const startDate = new Date(bookingData.date);
                              const endDate = new Date(bookingData.endDate);
                              const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                              return `₹${(bookingData.selectedAccommodation.price * nights).toLocaleString()} (${nights} nights)`;
                            })()
                          ) : (
                            `₹${bookingData.selectedAccommodation.price} (1 night)`
                          )}
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3 flex justify-between font-bold text-lg text-green-600">
                      <span>Total Amount:</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* UPI QR Code */}
                <div className="bg-white border-2 border-dashed border-gray-300 p-6 rounded-xl text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">Scan to Pay</h3>
                  <div className="bg-gray-100 p-8 rounded-lg mb-4 inline-block">
                    <div className="text-6xl">📱</div>
                    <p className="text-sm text-gray-600 mt-2">UPI QR Code</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Scan this QR code with any UPI app to pay ₹{calculateTotal().toLocaleString()}
                  </p>
                  <div className="text-xs text-gray-500">
                    UPI ID: tn-tourism@upi
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>💳</span>
                        <span>Complete Payment</span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/book"
                    className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors text-center block"
                  >
                    ← Back to Booking
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