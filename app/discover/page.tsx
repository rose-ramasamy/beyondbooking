'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

const mockDestinations = [
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram',
    description: 'UNESCO World Heritage site famous for rock-cut temples and shore temples.',
    district: 'Chengalpattu',
    category: 'heritage',
    rating: 4.7,
    visitorCount: 2800000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/vertical/mamallapuram-shore-temple-1653384269_c4183fcf86103ff932ea.webp',
    bestTime: 'November to February',
    entryFee: '₹100-300',
    price: 2500,
    highlights: ['Shore Temple', 'Rock-cut caves', 'UNESCO site', 'Beach views']
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    description: 'Popular hill station known for its misty mountains, lakes, and colonial architecture.',
    district: 'Dindigul',
    category: 'hill-station',
    rating: 4.5,
    visitorCount: 2100000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kodaikanal-1655279477_0cdce0d4e58596e4fb33.webp',
    bestTime: 'April to June, September to October',
    entryFee: '₹50-100',
    price: 2200,
    highlights: ['Kodaikanal Lake', 'Coaker\'s Walk', 'Bryant Park', 'Pillar Rocks']
  },
  {
    id: 'ooty',
    name: 'Ooty',
    description: 'Queen of hill stations with tea plantations, botanical gardens, and colonial charm.',
    district: 'Nilgiris',
    category: 'hill-station',
    rating: 4.4,
    visitorCount: 2400000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/ooty-1655457424_bca80f81e8391ebdaaca.webp',
    bestTime: 'April to June, September to October',
    entryFee: '₹50-150',
    price: 2000,
    highlights: ['Ooty Lake', 'Botanical Gardens', 'Tea Museum', 'Doddabetta Peak']
  },
  {
    id: 'madurai',
    name: 'Madurai',
    description: 'Ancient city famous for the Meenakshi Temple, one of the most important temples in South India.',
    district: 'Madurai',
    category: 'heritage',
    rating: 4.6,
    visitorCount: 3200000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/meenakshi-amman-temple-1656170467_cfebe78d69f069f881aa.webp',
    bestTime: 'October to March',
    entryFee: '₹100-200',
    price: 1800,
    highlights: ['Meenakshi Temple', 'Thirumalai Nayakkar Palace', 'Gandhi Museum', 'Vaigai River']
  },
  {
    id: 'chennai',
    name: 'Chennai',
    description: 'The capital city of Tamil Nadu, known for its rich cultural heritage, Marina Beach, and colonial architecture.',
    district: 'Chennai',
    category: 'urban',
    rating: 4.3,
    visitorCount: 8500000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/chennai-1654764398_76539011bf752b01585f.webp',
    bestTime: 'October to March',
    entryFee: 'Free',
    price: 1500,
    highlights: ['Marina Beach', 'Fort St. George', 'Kapaleeshwarar Temple', 'Chennai Museum']
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    description: 'Southernmost tip of India where three seas meet, with stunning sunrise/sunset views.',
    district: 'Kanyakumari',
    category: 'nature',
    rating: 4.6,
    visitorCount: 2100000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kanyakumari-1656091428_cf69d9a9dbec82018046.jpg',
    bestTime: 'October to March',
    entryFee: '₹50-100',
    price: 2000,
    highlights: ['Vivekananda Rock', 'Sunrise/Sunset', 'Three seas meet', 'Lighthouse']
  },
  {
    id: 'thanjavur',
    name: 'Thanjavur',
    description: 'Cultural capital known for temples, music, and the famous Thanjavur paintings.',
    district: 'Thanjavur',
    category: 'heritage',
    rating: 4.5,
    visitorCount: 1900000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/thanjavur-1655294212_8d67c2fdaa46899ddda7.webp',
    bestTime: 'October to March',
    entryFee: '₹50-150',
    price: 1900,
    highlights: ['Brihadeeswarar Temple', 'Paintings', 'Music heritage', 'Architecture']
  },
  {
    id: 'rameswaram',
    name: 'Rameswaram',
    description: 'Sacred island temple town connected to the Ramayana epic.',
    district: 'Ramanathapuram',
    category: 'religious',
    rating: 4.4,
    visitorCount: 1800000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/rameswaram-1655457953_09de320de48b98dece1a.webp',
    bestTime: 'October to April',
    entryFee: '₹50-100',
    price: 1600,
    highlights: ['Ramanathaswamy Temple', 'Adam\'s Bridge', 'Pamban Bridge', 'Marine Biology']
  },
  {
    id: 'kanchipuram',
    name: 'Kanchipuram',
    description: 'Known as the City of Thousand Temples, famous for silk sarees and ancient temples.',
    district: 'Kanchipuram',
    category: 'heritage',
    rating: 4.5,
    visitorCount: 1500000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kancheepuram-1656094320_3f77ec88eada40ee1f36.webp',
    bestTime: 'October to March',
    entryFee: '₹50-100',
    price: 1200,
    highlights: ['Sri Ekambareswar Temple', 'Sri Kailasanathar Temple', 'Silk weaving', 'Temples']
  },
  {
    id: 'srivilliputhur',
    name: 'Srivilliputhur',
    description: 'Home to the Andal Temple, known for its architectural beauty and religious significance.',
    district: 'Virudhunagar',
    category: 'religious',
    rating: 4.4,
    visitorCount: 800000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/srivilliputhur-andal-temple-1656235549_c00a2b162e36825fac57.webp',
    bestTime: 'October to March',
    entryFee: '₹50-100',
    price: 1000,
    highlights: ['Andal Temple', 'Architecture', 'Religious site', 'Festivals']
  },
  {
    id: 'palani',
    name: 'Palani',
    description: 'Famous for the Dhandayuthapani Swamy Temple on Palani Hills.',
    district: 'Dindigul',
    category: 'religious',
    rating: 4.6,
    visitorCount: 2000000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/arulmigu-dhandayuthapani-swamy-temple-palani-1657867829_3fda42dd1b3ef365f142.webp',
    bestTime: 'October to May',
    entryFee: 'Free',
    price: 800,
    highlights: ['Dhandayuthapani Temple', 'Palani Hills', 'Pilgrimage', 'Festivals']
  },
  {
    id: 'kolli-hills',
    name: 'Kolli Hills',
    description: 'Gifted with pleasant weather throughout the year, Kolli hills is one of those round the season destinations in Tamil Nadu. Unique in landscape and attractions, it has a scenic beauty and has plenty to offer for the exploring travellers.',
    district: 'Namakkal',
    category: 'hill-station',
    rating: 4.3,
    visitorCount: 500000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kolli-hills-1656181182_756ec5b879172b6a9eb2.webp',
    bestTime: 'Throughout the year',
    entryFee: 'Free',
    price: 1000,
    highlights: ['Agasagangai Waterfalls', 'Vasalurpatty Lake', 'Siddhar Caves', 'Selur Viewpoint']
  }
];

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredDestinations, setFilteredDestinations] = useState(mockDestinations);

  const categories = ['all', 'heritage', 'hill-station', 'nature', 'urban', 'religious'];

  useEffect(() => {
    let filtered = mockDestinations;

    if (searchTerm) {
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.district.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(dest => dest.category === selectedCategory);
    }

    setFilteredDestinations(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Tamil Nadu
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Explore the rich cultural heritage and stunning landscapes of Tamil Nadu
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-white text-blue-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {category === 'all' ? 'All' :
                   category === 'hill-station' ? 'Hill Stations' :
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map(destination => (
            <div
              key={destination.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-40 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {destination.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {destination.district} District
                </p>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>⭐ {destination.rating}</span>
                  <span>Starts from ₹1,500</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/destinations/${destination.id}`}
                    className="flex-1 bg-blue-600 !text-white py-2 px-3 rounded text-sm font-medium text-center hover:bg-blue-700 transition-colors"
                  >
                    Explore
                  </Link>
                  <Link
                    href={`/book?id=${destination.id}&type=destination`}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm font-medium text-center hover:bg-gray-50 transition-colors"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No destinations found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or category filters
            </p>
          </div>
        )}
      </div>

      {/* Featured Experiences Section */}
      <div id="experiences" className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Featured Experiences
            </h2>
            <p className="text-gray-600">
              Discover unique activities and cultural experiences in Tamil Nadu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Traditional Tamil Cooking Class */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🍳</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Traditional Tamil Cooking Class
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Mahabalipuram • 3 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.8</span>
                    <span className="font-semibold text-orange-600">₹1,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Heritage Temple Tour */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🕉️</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Heritage Temple Tour
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Mahabalipuram • 4 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.6</span>
                    <span className="font-semibold text-purple-600">₹2,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hill Station Trekking */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🥾</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Hill Station Trekking
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Ooty • 6 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.7</span>
                    <span className="font-semibold text-green-600">₹2,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ayurvedic Wellness Retreat */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🧘</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Ayurvedic Wellness Retreat
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Kodaikanal • 2 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.9</span>
                    <span className="font-semibold text-blue-600">₹3,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rural Village Experience */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏘️</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Rural Village Experience
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Chengalpattu • 5 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.5</span>
                    <span className="font-semibold text-yellow-600">₹1,800</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wildlife Photography Workshop */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📸</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Wildlife Photography Workshop
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Mudumalai • 8 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.7</span>
                    <span className="font-semibold text-pink-600">₹3,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chennai Street Food Tour */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🍜</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Chennai Street Food Tour
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Chennai • 4 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.6</span>
                    <span className="font-semibold text-red-600">₹1,200</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kanchipuram Silk Weaving */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🧵</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Kanchipuram Silk Weaving
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Kanchipuram • 3 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.9</span>
                    <span className="font-semibold text-indigo-600">₹1,800</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carnatic Music Workshop */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎵</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Carnatic Music Workshop
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Thanjavur • 2 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.8</span>
                    <span className="font-semibold text-teal-600">₹2,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Spice Plantation Tour */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌿</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Spice Plantation Tour
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Kodaikanal • 3 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.4</span>
                    <span className="font-semibold text-lime-600">₹1,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ooty Lake Boating */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⛵</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Ooty Lake Boating
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Ooty • 1 hour
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.6</span>
                    <span className="font-semibold text-cyan-600">₹800</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Madurai Temple Darshan */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🕉️</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Madurai Temple Darshan
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Madurai • 2 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.7</span>
                    <span className="font-semibold text-amber-600">₹600</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kodaikanal Mountain Hiking */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🥾</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Kodaikanal Mountain Hiking
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Kodaikanal • 4 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.5</span>
                    <span className="font-semibold text-emerald-600">₹1,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rameswaram Pilgrimage Tour */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🙏</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Rameswaram Pilgrimage Tour
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Rameswaram • 3 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.9</span>
                    <span className="font-semibold text-violet-600">₹1,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chennai Marina Beach */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏖️</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Chennai Marina Beach Exploration
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Chennai • 2 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.3</span>
                    <span className="font-semibold text-sky-600">₹500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thanjavur Temple Architecture */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏛️</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Thanjavur Temple Architecture Tour
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Thanjavur • 3 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.6</span>
                    <span className="font-semibold text-rose-600">₹900</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Adam's Bridge Exploration */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌊</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Adam's Bridge Exploration
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Rameswaram • 2 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.7</span>
                    <span className="font-semibold text-slate-600">₹800</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dhanushkodi Beach Visit */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏖️</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Dhanushkodi Beach Visit
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Rameswaram • 3 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.6</span>
                    <span className="font-semibold text-stone-600">₹600</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kanyakumari Sunrise Viewing */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌅</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Kanyakumari Sunrise Viewing
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Kanyakumari • 2 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.9</span>
                    <span className="font-semibold text-amber-600">₹400</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vivekananda Rock Memorial */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🗿</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Vivekananda Rock Memorial Tour
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Kanyakumari • 1.5 hours
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">⭐ 4.8</span>
                    <span className="font-semibold text-gray-600">₹300</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/book"
              className="inline-block bg-blue-600 !text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Experiences
            </Link>
          </div>
        </div>
      </div>

      {/* Simple CTA */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Plan Your Tamil Nadu Journey?
          </h2>
          <p className="mb-6">
            Discover more destinations and create your perfect itinerary
          </p>
          <Link
            href="/itinerary-planner"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            style={{ color: '#2563eb' }}
          >
            Start Planning
          </Link>
        </div>
      </div>
    </div>
  );
}