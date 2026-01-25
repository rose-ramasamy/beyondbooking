'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Link from 'next/link';

// Mock analytics data for AI-driven insights
const analyticsData = {
  monthlyTrends: [
    { month: 'Jan', bookings: 45, revenue: 125000, occupancy: 78 },
    { month: 'Feb', bookings: 52, revenue: 142000, occupancy: 82 },
    { month: 'Mar', bookings: 38, revenue: 98000, occupancy: 65 },
    { month: 'Apr', bookings: 67, revenue: 189000, occupancy: 91 },
    { month: 'May', bookings: 73, revenue: 201000, occupancy: 95 },
    { month: 'Jun', bookings: 41, revenue: 112000, occupancy: 72 },
  ],
  seasonalInsights: {
    peakSeason: 'April-May (Summer holidays)',
    lowSeason: 'March (Pre-monsoon)',
    recommendedPricing: {
      peak: '₹2,500-3,000',
      offPeak: '₹1,800-2,200'
    },
    demandDrivers: ['School holidays', 'Summer vacations', 'Festival season']
  },
  competitorAnalysis: {
    avgRating: 4.3,
    avgPrice: 2200,
    marketPosition: 'Premium segment',
    opportunities: ['Weekend packages', 'Family discounts']
  },
  visitorDemographics: {
    domestic: 78,
    international: 22,
    ageGroups: { '18-25': 35, '26-35': 28, '36-50': 22, '50+': 15 },
    interests: ['Culture', 'Heritage', 'Wellness', 'Adventure']
  }
};

export default function OperatorDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [notifications] = useState([
    { id: 1, type: 'booking', message: 'New booking for Heritage Temple Tour', time: '2 hours ago', urgent: true },
    { id: 2, type: 'payment', message: 'Payment received: ₹2,000', time: '5 hours ago', urgent: false },
    { id: 3, type: 'review', message: 'New 5-star review received', time: '1 day ago', urgent: false },
  ]);

  // Mock operator data - in real app this would come from authentication/user context
  const operatorData = {
    name: 'Rajesh Kumar',
    businessName: 'Tamil Nadu Heritage Tours',
    location: 'Chennai, Tamil Nadu',
    memberSince: '2022',
    specialization: 'Cultural & Heritage Experiences',
    avatar: '👨‍💼'
  };

  const mockStats = {
    totalBookings: 312,
    monthlyRevenue: 856000,
    averageRating: 4.7,
    activeExperiences: 5,
    pendingBookings: 8,
    todaysRevenue: 28500,
    occupancyRate: 82,
    avgBookingValue: 2740,
    repeatCustomers: 34,
    cancellationRate: 8.2
  };

  const mockBookings = [
    {
      id: 'BK001',
      customerName: 'John Smith',
      experience: 'Heritage Temple Tour',
      date: '2024-01-15',
      status: 'confirmed',
      amount: 2000,
      participants: 4,
    },
    {
      id: 'BK002',
      customerName: 'Sarah Johnson',
      experience: 'Ayurvedic Wellness Retreat',
      date: '2024-01-18',
      status: 'pending',
      amount: 3500,
      participants: 2,
    },
    {
      id: 'BK003',
      customerName: 'Mike Davis',
      experience: 'Hill Station Trekking',
      date: '2024-01-20',
      status: 'confirmed',
      amount: 2500,
      participants: 6,
    },
  ];

  const mockExperiences = [
    {
      id: 'EXP001',
      title: 'Heritage Temple Tour',
      category: 'heritage',
      price: 2000,
      bookings: 15,
      rating: 4.8,
      status: 'active',
    },
    {
      id: 'EXP002',
      title: 'Ayurvedic Wellness Retreat',
      category: 'wellness',
      price: 3500,
      bookings: 8,
      rating: 4.9,
      status: 'active',
    },
    {
      id: 'EXP003',
      title: 'Hill Station Trekking',
      category: 'adventure',
      price: 2500,
      bookings: 22,
      rating: 4.6,
      status: 'active',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Personalized Header with Operator Details */}
        <div className="flex justify-between items-center mb-10">
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                {operatorData.avatar}
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Welcome back, {operatorData.name}!
                </h1>
                <p className="text-slate-600 text-lg font-medium">{operatorData.businessName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <span className="flex items-center space-x-1">
                <span>📍</span>
                <span>{operatorData.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>⭐</span>
                <span>{operatorData.specialization}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>👥</span>
                <span>Member since {operatorData.memberSince}</span>
              </span>
            </div>
            <p className="text-slate-700 text-lg font-medium max-w-2xl">
              Here's what's happening with your {operatorData.specialization.toLowerCase()} today. You have {mockStats.pendingBookings} pending bookings and ₹{mockStats.todaysRevenue.toLocaleString('en-IN')} in today's revenue.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            {/* Status Indicator */}
            <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">Online</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Business Hours</p>
            </div>

            {/* Enhanced Notification Bell */}
            <div className="relative group">
              <button className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105">
                <span className="text-2xl">🔔</span>
                {notifications.filter(n => n.urgent).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {notifications.filter(n => n.urgent).length}
                  </span>
                )}
              </button>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </div>

            {/* Enhanced Today's Date Card */}
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-white/20">
              <p className="text-sm text-slate-500 font-medium">Today</p>
              <p className="font-bold text-slate-800 text-lg">
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards with Elegant Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:scale-105 hover:-translate-y-2">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    {mockStats.totalBookings}
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-1"></span>
                    +12% from last month
                  </p>
                </div>
              </div>
              <p className="text-slate-600 font-semibold text-sm">Total Bookings</p>
            </div>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-b-3xl"></div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:scale-105 hover:-translate-y-2">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    ₹{mockStats.monthlyRevenue.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-1"></span>
                    +8% from last month
                  </p>
                </div>
              </div>
              <p className="text-slate-600 font-semibold text-sm">Monthly Revenue</p>
            </div>
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-b-3xl"></div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:scale-105 hover:-translate-y-2">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg">
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                    {mockStats.averageRating}
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-1"></span>
                    Excellent
                  </p>
                </div>
              </div>
              <p className="text-slate-600 font-semibold text-sm">Average Rating</p>
            </div>
            <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-b-3xl"></div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:scale-105 hover:-translate-y-2">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                    {mockStats.activeExperiences}
                  </p>
                  <p className="text-xs text-blue-600 font-semibold mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                    All performing well
                  </p>
                </div>
              </div>
              <p className="text-slate-600 font-semibold text-sm">Active Experiences</p>
            </div>
            <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-b-3xl"></div>
          </div>
        </div>

        {/* Enhanced Today's Highlights with Sophisticated Design */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <span className="text-3xl">💵</span>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold mb-1">₹{mockStats.todaysRevenue.toLocaleString('en-IN')}</p>
                  <p className="text-sm opacity-90">Today's Revenue</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium opacity-90">Revenue Generated</span>
                <div className="flex items-center space-x-1">
                  <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-xs opacity-75">Live</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-400"></div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <span className="text-3xl">⏳</span>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold mb-1">{mockStats.pendingBookings}</p>
                  <p className="text-sm opacity-90">Pending Bookings</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium opacity-90">Awaiting Confirmation</span>
                <div className="flex items-center space-x-1">
                  <span className="inline-block w-2 h-2 bg-amber-300 rounded-full animate-pulse"></span>
                  <span className="text-xs opacity-75">Action Required</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <span className="text-3xl">💬</span>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold mb-1">7</p>
                  <p className="text-sm opacity-90">New Messages</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium opacity-90">Customer Inquiries</span>
                <div className="flex items-center space-x-1">
                  <span className="inline-block w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                  <span className="text-xs opacity-75">Unread</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
          </div>
        </div>

        {/* Smart Analytics Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 mb-10 overflow-hidden">
          <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-slate-100/50">
            <nav className="flex px-2">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`relative px-8 py-5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'analytics'
                    ? 'text-slate-800 bg-white/80 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/40'
                }`}
              >
                📊 Analytics Dashboard
                {activeTab === 'analytics' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`relative px-8 py-5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'insights'
                    ? 'text-slate-800 bg-white/80 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/40'
                }`}
              >
                🧠 AI Insights
                {activeTab === 'insights' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('seasonal')}
                className={`relative px-8 py-5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'seasonal'
                    ? 'text-slate-800 bg-white/80 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/40'
                }`}
              >
                📅 Seasonal Trends
                {activeTab === 'seasonal' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`relative px-8 py-5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'recommendations'
                    ? 'text-slate-800 bg-white/80 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/40'
                }`}
              >
                💡 Smart Recommendations
                {activeTab === 'recommendations' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
              </button>
            </nav>
          </div>

          <div className="p-10">
            {activeTab === 'overview' && (
              <div className="space-y-10">
                {/* Personalized Welcome Message */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-200/40">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                      {operatorData.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {operatorData.name.split(' ')[0]}!</h3>
                      <p className="text-slate-600">Ready to make today amazing for your guests? Here's your business overview.</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Recent Notifications */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-3xl p-8 border border-slate-200/60">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                    <span className="mr-3">🔔</span>
                    Recent Notifications
                  </h3>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`group flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                        notification.urgent
                          ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 hover:border-red-300'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className={`text-2xl p-3 rounded-2xl ${
                            notification.urgent
                              ? 'bg-red-100 animate-pulse'
                              : 'bg-blue-100'
                          }`}>
                            {notification.type === 'booking' ? '📅' : notification.type === 'payment' ? '💰' : '⭐'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 group-hover:text-slate-900">{notification.message}</p>
                            <p className="text-sm text-slate-600">{notification.time}</p>
                          </div>
                        </div>
                        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Quick Insights */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 border border-emerald-200/60">
                    <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center">
                      <span className="mr-3">🏆</span>
                      Top Performing Experience
                    </h3>
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-emerald-200/40 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-bold text-slate-800 text-lg">Hill Station Trekking</p>
                          <p className="text-sm text-slate-600">22 bookings this month</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-600">₹55,000</p>
                          <p className="text-xs text-slate-600">revenue</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-2 bg-emerald-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <span className="text-xs font-medium text-emerald-600">88%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200/60">
                    <h3 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
                      <span className="mr-3">📅</span>
                      Upcoming Bookings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/60 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-amber-100 rounded-xl">
                            <span className="text-lg">🏛️</span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">Heritage Temple Tour</p>
                            <p className="text-sm text-slate-600">Tomorrow, 10:00 AM</p>
                          </div>
                        </div>
                        <span className="px-4 py-2 bg-amber-100 text-amber-800 text-sm rounded-xl font-medium">4 guests</span>
                      </div>
                      <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/60 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 rounded-xl">
                            <span className="text-lg">🧘</span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">Ayurvedic Wellness Retreat</p>
                            <p className="text-sm text-slate-600">Jan 18, 2:00 PM</p>
                          </div>
                        </div>
                        <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-xl font-medium">2 guests</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                  <div className="flex space-x-3">
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>All Status</option>
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Cancelled</option>
                    </select>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                      Export Data
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Booking ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Experience</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{booking.id}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">
                            <div>
                              <p className="font-medium">{booking.customerName}</p>
                              <p className="text-xs text-gray-500">{booking.participants} guests</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900">{booking.experience}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{booking.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">₹{booking.amount}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View
                              </button>
                              {booking.status === 'pending' && (
                                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                                  Confirm
                                </button>
                              )}
                              <button className="text-gray-600 hover:text-gray-800 text-sm">
                                Message
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'experiences' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Your Experiences</h3>
                  <Link href="/operator/experiences/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block">
                    Add New Experience
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockExperiences.map((experience) => (
                    <div key={experience.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900">{experience.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          experience.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {experience.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 capitalize">{experience.category}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-gray-900">₹{experience.price}</span>
                        <span className="text-yellow-500">⭐ {experience.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{experience.bookings} bookings this month</p>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Edit
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-10">
                {/* AI-Powered Analytics Header */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-200/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">📊 Smart Analytics Dashboard</h2>
                      <p className="text-slate-600">AI-driven insights to optimize your tourism business performance</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium"
                      >
                        <option value="1month">Last Month</option>
                        <option value="3months">Last 3 Months</option>
                        <option value="6months">Last 6 Months</option>
                        <option value="1year">Last Year</option>
                      </select>
                      <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                        🔄 Auto-updating
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Performance Metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <span className="text-2xl">📈</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-800">{mockStats.totalBookings}</p>
                        <p className="text-xs text-emerald-600 font-medium">+12% vs last period</p>
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium">Total Bookings</p>
                    <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-emerald-100 rounded-xl">
                        <span className="text-2xl">💰</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-800">₹{mockStats.monthlyRevenue.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-emerald-600 font-medium">+8% vs last period</p>
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium">Monthly Revenue</p>
                    <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <span className="text-2xl">🏨</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-800">{mockStats.occupancyRate}%</p>
                        <p className="text-xs text-emerald-600 font-medium">+5% vs last period</p>
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium">Occupancy Rate</p>
                    <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${mockStats.occupancyRate}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-amber-100 rounded-xl">
                        <span className="text-2xl">⭐</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-800">{mockStats.averageRating}</p>
                        <p className="text-xs text-emerald-600 font-medium">+0.2 vs last period</p>
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium">Average Rating</p>
                    <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Revenue Trends Chart */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200/60">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-800">📊 Revenue & Booking Trends</h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      <span>Revenue</span>
                      <span className="w-3 h-3 bg-emerald-500 rounded-full ml-4"></span>
                      <span>Bookings</span>
                    </div>
                  </div>
                  <div className="h-64 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl flex items-end justify-between p-6">
                    {analyticsData.monthlyTrends.map((month, index) => (
                      <div key={month.month} className="flex flex-col items-center space-y-2">
                        <div className="relative w-12">
                          <div
                            className="bg-emerald-500 rounded-t w-full transition-all duration-500 hover:bg-emerald-600"
                            style={{ height: `${(month.bookings / 80) * 100}%` }}
                          ></div>
                          <div
                            className="bg-blue-500 rounded-t w-full mt-1 transition-all duration-500 hover:bg-blue-600"
                            style={{ height: `${(month.revenue / 250000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-600">{month.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center text-sm text-slate-500">
                    Interactive chart showing seasonal patterns and growth trends
                  </div>
                </div>

                {/* AI Insights & Recommendations */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200/60">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                      <span className="mr-3">🎯</span>
                      AI Performance Insights
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white/80 p-4 rounded-2xl border border-blue-200/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-700">Peak Season Identified</span>
                          <span className="text-emerald-600 font-bold">April-May</span>
                        </div>
                        <p className="text-sm text-slate-600">Your bookings increase by 45% during summer holidays</p>
                      </div>
                      <div className="bg-white/80 p-4 rounded-2xl border border-blue-200/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-700">Optimal Pricing</span>
                          <span className="text-blue-600 font-bold">₹2,200-2,800</span>
                        </div>
                        <p className="text-sm text-slate-600">Based on demand elasticity and competitor analysis</p>
                      </div>
                      <div className="bg-white/80 p-4 rounded-2xl border border-blue-200/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-700">Customer Retention</span>
                          <span className="text-purple-600 font-bold">34%</span>
                        </div>
                        <p className="text-sm text-slate-600">Repeat customers driving 40% of revenue</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 border border-emerald-200/60">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                      <span className="mr-3">🚀</span>
                      Growth Opportunities
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-700">Weekend Packages</span>
                          <span className="text-emerald-600 font-bold">High Potential</span>
                        </div>
                        <p className="text-sm text-slate-600">Only 15% of bookings are weekend - opportunity to increase by 30%</p>
                      </div>
                      <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-700">Family Discounts</span>
                          <span className="text-blue-600 font-bold">Recommended</span>
                        </div>
                        <p className="text-sm text-slate-600">Families represent 35% of market but only 20% of your bookings</p>
                      </div>
                      <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-700">Digital Marketing</span>
                          <span className="text-purple-600 font-bold">+25% Growth</span>
                        </div>
                        <p className="text-sm text-slate-600">Invest in SEO and social media to capture more organic traffic</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-10">
                {/* AI Insights Header */}
                <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-8 border border-purple-200/40">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center text-3xl shadow-lg">
                      🧠
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">AI-Powered Business Intelligence</h2>
                      <p className="text-slate-600">Advanced analytics and predictive insights for your tourism business</p>
                    </div>
                  </div>
                </div>

                {/* Seasonal Intelligence */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200/60">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                      <span className="mr-3">📅</span>
                      Seasonal Demand Analysis
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-200/40">
                        <div>
                          <p className="font-bold text-emerald-800">Peak Season</p>
                          <p className="text-sm text-emerald-600">{analyticsData.seasonalInsights.peakSeason}</p>
                        </div>
                        <span className="text-2xl">📈</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-200/40">
                        <div>
                          <p className="font-bold text-red-800">Low Season</p>
                          <p className="text-sm text-red-600">{analyticsData.seasonalInsights.lowSeason}</p>
                        </div>
                        <span className="text-2xl">📉</span>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200/40">
                        <p className="font-bold text-blue-800 mb-2">Demand Drivers</p>
                        <div className="flex flex-wrap gap-2">
                          {analyticsData.seasonalInsights.demandDrivers.map((driver, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                              {driver}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200/60">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                      <span className="mr-3">💰</span>
                      Dynamic Pricing Intelligence
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-emerald-800">Peak Season Pricing</span>
                          <span className="text-emerald-600 font-bold">{analyticsData.seasonalInsights.recommendedPricing.peak}</span>
                        </div>
                        <p className="text-sm text-emerald-600">Maximize revenue during high demand periods</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-blue-800">Off-Peak Pricing</span>
                          <span className="text-blue-600 font-bold">{analyticsData.seasonalInsights.recommendedPricing.offPeak}</span>
                        </div>
                        <p className="text-sm text-blue-600">Maintain occupancy during slower periods</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200/40">
                        <p className="font-bold text-purple-800 mb-2">AI Recommendation</p>
                        <p className="text-sm text-purple-600">Consider 15-20% price increase during April-May and 10-15% discount during March</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visitor Demographics */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200/60">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                    <span className="mr-3">👥</span>
                    Visitor Demographics & Preferences
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray={`${analyticsData.visitorDemographics.domestic}, 100`}/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-slate-800">{analyticsData.visitorDemographics.domestic}%</span>
                        </div>
                      </div>
                      <p className="font-medium text-slate-700">Domestic Tourists</p>
                    </div>
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray={`${analyticsData.visitorDemographics.international}, 100`}/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-slate-800">{analyticsData.visitorDemographics.international}%</span>
                        </div>
                      </div>
                      <p className="font-medium text-slate-700">International Tourists</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-800">Age Groups</h4>
                      {Object.entries(analyticsData.visitorDemographics.ageGroups).map(([age, percentage]) => (
                        <div key={age} className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{age} years</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="text-sm font-medium text-slate-700 w-8">{percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seasonal' && (
              <div className="space-y-10">
                {/* Seasonal Trends Header */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-8 border border-emerald-200/40">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center text-3xl shadow-lg">
                      📅
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">Seasonal Tourism Intelligence</h2>
                      <p className="text-slate-600">Festival-aware planning and seasonal optimization insights</p>
                    </div>
                  </div>
                </div>

                {/* Festival Calendar */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200/60">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                    <span className="mr-3">🎪</span>
                    Upcoming Festivals & Events (2026)
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200/40">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-orange-800">Pongal Festival</h4>
                        <span className="text-orange-600 font-medium">Jan 14-17</span>
                      </div>
                      <p className="text-sm text-orange-700 mb-3">Traditional harvest festival with 40% booking increase expected</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">High Demand</span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">+40% bookings</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200/40">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-purple-800">Chithirai Festival</h4>
                        <span className="text-purple-600 font-medium">Apr 15-25</span>
                      </div>
                      <p className="text-sm text-purple-700 mb-3">Meenakshi Temple festival attracts thousands of pilgrims</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Peak Season</span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">+60% bookings</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/40">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-blue-600 font-medium">May 1-15</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">Summer vacation period with family tourism focus</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Family Season</span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">+35% bookings</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seasonal Performance */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200/60">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Monthly Performance Trends</h3>
                    <div className="space-y-4">
                      {analyticsData.monthlyTrends.map((month) => (
                        <div key={month.month} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                          <div className="flex items-center space-x-4">
                            <span className="font-medium text-slate-700 w-12">{month.month}</span>
                            <div className="flex space-x-2">
                              <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {month.bookings} bookings
                              </div>
                              <div className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                ₹{(month.revenue / 1000).toFixed(0)}k revenue
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-sm font-bold ${month.occupancy > 80 ? 'text-emerald-600' : month.occupancy > 60 ? 'text-blue-600' : 'text-orange-600'}`}>
                              {month.occupancy}% occupied
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-200/60">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                      <span className="mr-3">🎯</span>
                      Seasonal Optimization Tips
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white/80 p-4 rounded-2xl border border-indigo-200/40">
                        <h4 className="font-bold text-indigo-800 mb-2">Pre-Festival Preparation</h4>
                        <p className="text-sm text-indigo-700">Increase inventory and staff 2 weeks before major festivals</p>
                      </div>
                      <div className="bg-white/80 p-4 rounded-2xl border border-indigo-200/40">
                        <h4 className="font-bold text-indigo-800 mb-2">Off-Season Strategies</h4>
                        <p className="text-sm text-indigo-700">Offer weekday discounts and target local tourists during low season</p>
                      </div>
                      <div className="bg-white/80 p-4 rounded-2xl border border-indigo-200/40">
                        <h4 className="font-bold text-indigo-800 mb-2">Weather-Adaptive Pricing</h4>
                        <p className="text-sm text-indigo-700">Monitor weather forecasts and adjust pricing for outdoor activities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div className="space-y-10">
                {/* Smart Recommendations Header */}
                <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 rounded-3xl p-8 border border-rose-200/40">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl flex items-center justify-center text-3xl shadow-lg">
                      💡
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">AI-Powered Business Recommendations</h2>
                      <p className="text-slate-600">Personalized strategies to grow your tourism business</p>
                    </div>
                  </div>
                </div>

                {/* Priority Recommendations */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 border border-emerald-200/60">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-emerald-800">High Impact</h3>
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">Priority 1</span>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200/40">
                        <h4 className="font-bold text-emerald-800 mb-2">Digital Marketing Campaign</h4>
                        <p className="text-sm text-emerald-700 mb-3">Launch targeted social media ads focusing on family packages</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-emerald-600">Expected ROI: 300%</span>
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">₹25k budget</span>
                        </div>
                      </div>
                      <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200/40">
                        <h4 className="font-bold text-emerald-800 mb-2">Weekend Special Packages</h4>
                        <p className="text-sm text-emerald-700 mb-3">Create exclusive weekend experiences with 20% premium pricing</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-emerald-600">Revenue Potential: ₹50k/month</span>
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Easy</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200/60">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-blue-800">Medium Impact</h3>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">Priority 2</span>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/80 p-4 rounded-2xl border border-blue-200/40">
                        <h4 className="font-bold text-blue-800 mb-2">Customer Loyalty Program</h4>
                        <p className="text-sm text-blue-700 mb-3">Implement points system for repeat customers with exclusive discounts</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-600">Retention Increase: 25%</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Medium</span>
                        </div>
                      </div>
                      <div className="bg-white/80 p-4 rounded-2xl border border-blue-200/40">
                        <h4 className="font-bold text-blue-800 mb-2">Photography Workshop Add-on</h4>
                        <p className="text-sm text-blue-700 mb-3">Partner with local photographers for premium experience packages</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-600">Avg. Revenue: ₹800/booking</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">High</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-200/60">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-purple-800">Long-term Growth</h3>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">Priority 3</span>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/80 p-4 rounded-2xl border border-purple-200/40">
                        <h4 className="font-bold text-purple-800 mb-2">Eco-tourism Certification</h4>
                        <p className="text-sm text-purple-700 mb-3">Obtain sustainable tourism certification to attract eco-conscious travelers</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-purple-600">Market Position: Premium</span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Strategic</span>
                        </div>
                      </div>
                      <div className="bg-white/80 p-4 rounded-2xl border border-purple-200/40">
                        <h4 className="font-bold text-purple-800 mb-2">Mobile App Development</h4>
                        <p className="text-sm text-purple-700 mb-3">Create dedicated app for direct bookings and personalized experiences</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-purple-600">Conversion Rate: +40%</span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Advanced</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Implementation Roadmap */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200/60">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                    <span className="mr-3">🗺️</span>
                    90-Day Implementation Roadmap
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200/40">
                      <h4 className="font-bold text-emerald-800 mb-4 flex items-center">
                        <span className="mr-2">📅</span>
                        Month 1: Foundation
                      </h4>
                      <ul className="space-y-2 text-sm text-emerald-700">
                        <li>• Launch weekend special packages</li>
                        <li>• Set up customer loyalty program</li>
                        <li>• Optimize digital marketing campaigns</li>
                        <li>• Train staff on new offerings</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/40">
                      <h4 className="font-bold text-blue-800 mb-4 flex items-center">
                        <span className="mr-2">📈</span>
                        Month 2: Optimization
                      </h4>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li>• Analyze initial campaign performance</li>
                        <li>• Refine pricing strategies</li>
                        <li>• Expand photography workshop partnerships</li>
                        <li>• Implement customer feedback system</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200/40">
                      <h4 className="font-bold text-purple-800 mb-4 flex items-center">
                        <span className="mr-2">🚀</span>
                        Month 3: Scale
                      </h4>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li>• Launch mobile app initiative</li>
                        <li>• Pursue eco-tourism certification</li>
                        <li>• Expand to new market segments</li>
                        <li>• Establish strategic partnerships</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Quick Actions with Elegant Design */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
              Quick Actions
            </h3>
            <p className="text-slate-600 text-lg">Streamline your workflow with these essential tools</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/operator/experiences/new" className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-200/60 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">➕</div>
                <p className="font-bold text-slate-800 group-hover:text-blue-600 mb-2 transition-colors">Add Experience</p>
                <p className="text-sm text-slate-600 group-hover:text-slate-700">Create new offering</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </Link>
            <button className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-3xl border border-emerald-200/60 hover:border-emerald-300 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📅</div>
                <p className="font-bold text-slate-800 group-hover:text-emerald-600 mb-2 transition-colors">Update Availability</p>
                <p className="text-sm text-slate-600 group-hover:text-slate-700">Manage schedules</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </button>
            <button className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-3xl border border-purple-200/60 hover:border-purple-300 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💬</div>
                <p className="font-bold text-slate-800 group-hover:text-purple-600 mb-2 transition-colors">Customer Messages</p>
                <p className="text-sm text-slate-600 group-hover:text-slate-700">Respond to inquiries</p>
                <span className="inline-block bg-gradient-to-r from-purple-500 to-violet-500 text-white text-xs px-3 py-1 rounded-full mt-3 font-medium shadow-lg">7 new</span>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </button>
            <button className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl border border-amber-200/60 hover:border-amber-300 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
                <p className="font-bold text-slate-800 group-hover:text-amber-600 mb-2 transition-colors">View Reports</p>
                <p className="text-sm text-slate-600 group-hover:text-slate-700">Download analytics</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}