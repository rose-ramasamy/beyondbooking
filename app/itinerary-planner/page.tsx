'use client';

import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ItineraryDay {
  day: number;
  date: string;
  destinations: any[];
  experiences: any[];
  accommodation?: any;
  notes: string;
}

interface TripPreferences {
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  interests: string[];
  pace: 'relaxed' | 'moderate' | 'intense';
}

export default function ItineraryPlannerPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<TripPreferences>({
    startDate: '',
    endDate: '',
    budget: 5000,
    travelers: 2,
    interests: [],
    pace: 'moderate'
  });
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIItinerary = async () => {
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      const mockItinerary: ItineraryDay[] = [
        {
          day: 1,
          date: preferences.startDate,
          destinations: [{ name: 'Chennai', type: 'city' }],
          experiences: [
            { title: 'Marina Beach Sunrise', category: 'nature', duration: '2 hours' },
            { title: 'Kapaleeshwarar Temple Visit', category: 'religious', duration: '1 hour' }
          ],
          accommodation: { name: 'Heritage Hotel', type: 'boutique', pricePerNight: 3000 },
          notes: 'Start your Tamil Nadu journey with the vibrant capital city'
        },
        {
          day: 2,
          date: new Date(new Date(preferences.startDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          destinations: [{ name: 'Mahabalipuram', type: 'heritage' }],
          experiences: [
            { title: 'Shore Temple Exploration', category: 'heritage', duration: '3 hours' },
            { title: 'Stone Carving Workshop', category: 'artisan', duration: '2 hours' }
          ],
          accommodation: { name: 'Beach Resort', type: 'resort', pricePerNight: 2500 },
          notes: 'UNESCO World Heritage site with ancient rock-cut temples'
        },
        {
          day: 3,
          date: new Date(new Date(preferences.startDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          destinations: [{ name: 'Kanchipuram', type: 'religious' }],
          experiences: [
            { title: 'Silk Weaving Demonstration', category: 'artisan', duration: '2 hours' },
            { title: 'Temple Architecture Tour', category: 'heritage', duration: '3 hours' }
          ],
          accommodation: { name: 'Heritage Home', type: 'homestay', pricePerNight: 2000 },
          notes: 'The city of 1000 temples and famous silk sarees'
        }
      ];

      setItinerary(mockItinerary);
      setIsGenerating(false);
    }, 2000);
  };

  const totalCost = itinerary.reduce((total, day) => {
    const experienceCost = day.experiences.length * 1500; // Average experience cost
    const accommodationCost = day.accommodation ? day.accommodation.pricePerNight : 0;
    return total + experienceCost + accommodationCost;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🗺️ AI Itinerary Planner</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create your perfect Tamil Nadu journey with our AI-powered planner that considers your preferences,
            budget, and the best seasonal experiences.
          </p>
        </div>

        {/* Preferences Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Tell us about your trip</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input
                type="date"
                value={preferences.startDate}
                onChange={(e) => setPreferences({...preferences, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                value={preferences.endDate}
                onChange={(e) => setPreferences({...preferences, endDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Travelers</label>
              <select
                value={preferences.travelers}
                onChange={(e) => setPreferences({...preferences, travelers: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Budget per day (₹)</label>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={preferences.budget}
                onChange={(e) => setPreferences({...preferences, budget: parseInt(e.target.value)})}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600 mt-1">₹{preferences.budget}</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Travel Pace</label>
              <select
                value={preferences.pace}
                onChange={(e) => setPreferences({...preferences, pace: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="relaxed">Relaxed (2-3 activities/day)</option>
                <option value="moderate">Moderate (3-4 activities/day)</option>
                <option value="intense">Intense (4+ activities/day)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Interests</label>
              <div className="space-y-2">
                {['heritage', 'food', 'adventure', 'wellness', 'culture', 'nature'].map(interest => (
                  <label key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.interests.includes(interest)}
                      onChange={(e) => {
                        const newInterests = e.target.checked
                          ? [...preferences.interests, interest]
                          : preferences.interests.filter(i => i !== interest);
                        setPreferences({...preferences, interests: newInterests});
                      }}
                      className="mr-2"
                    />
                    {interest.charAt(0).toUpperCase() + interest.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={generateAIItinerary}
              disabled={isGenerating || !preferences.startDate || !preferences.endDate}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? '🤖 Generating Your Perfect Itinerary...' : '🚀 Generate AI Itinerary'}
            </button>
          </div>
        </div>

        {/* Generated Itinerary */}
        {itinerary.length > 0 && (
          <div className="space-y-6">
            {/* Itinerary Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Your AI-Generated Itinerary</h2>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Estimated Total Cost</div>
                  <div className="text-2xl font-bold text-green-600">₹{totalCost.toLocaleString()}</div>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{itinerary.length}</div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {itinerary.reduce((sum, day) => sum + day.destinations.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {itinerary.reduce((sum, day) => sum + day.experiences.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Experiences</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{preferences.travelers}</div>
                  <div className="text-sm text-gray-600">Travelers</div>
                </div>
              </div>
            </div>

            {/* Day by Day Itinerary */}
            <div className="space-y-4">
              {itinerary.map((day) => (
                <div key={day.day} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                    <h3 className="text-xl font-bold">Day {day.day}: {new Date(day.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                    <p className="text-blue-100">{day.notes}</p>
                  </div>

                  <div className="p-6">
                    {/* Destinations */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        📍 Destinations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {day.destinations.map((dest, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {dest.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Experiences */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        🎯 Experiences
                      </h4>
                      <div className="space-y-2">
                        {day.experiences.map((exp, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                            <div>
                              <span className="font-medium">{exp.title}</span>
                              <span className="text-sm text-gray-600 ml-2">({exp.category})</span>
                            </div>
                            <span className="text-sm text-gray-600">{exp.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Accommodation */}
                    {day.accommodation && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          🏨 Accommodation
                        </h4>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium text-green-900">{day.accommodation.name}</span>
                              <span className="text-sm text-green-700 ml-2">({day.accommodation.type})</span>
                            </div>
                            <span className="font-semibold text-green-600">₹{day.accommodation.pricePerNight}/night</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                        📝 Customize Day
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                        🛒 Book All for Day {day.day}
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm">
                        📋 Add Notes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Ready to start your Tamil Nadu adventure?</h3>
              <div className="flex justify-center gap-4">
                <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700">
                  🛒 Book Entire Itinerary
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50">
                  💾 Save Itinerary
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50">
                  📤 Share Itinerary
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}