'use client';

import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Link from 'next/link';

const destinationsData = {
  mahabalipuram: {
    name: 'Mahabalipuram',
    description: 'Mahabalipuram, also known as Mamallapuram, is a town in Chengalpattu district in the southeastern Indian state of Tamil Nadu. It is one of the UNESCO World Heritage Sites in India and is famous for its ancient rock-cut temples and monuments.',
    district: 'Chengalpattu',
    category: 'Heritage & Culture',
    rating: 4.5,
    visitorCount: 50000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/mamallapuram-shore-temple-1653384258_d88d3d01bc1bbf48db9b.webp',
    highlights: [
      { name: 'Shore Temple', desc: '7th-century structural temple complex', icon: '🕉️' },
      { name: 'Five Rathas', desc: 'Five monolithic temples carved from single rocks', icon: '🏛️' },
      { name: 'Arjuna\'s Penance', desc: 'Largest bas-relief in the world', icon: '🎨' },
      { name: 'Panch Pandava Cave', desc: 'Ancient cave temple with intricate carvings', icon: '🕳️' },
    ],
    bestTime: 'October to March',
    entryFee: '₹40 for Indians, ₹600 for foreigners',
    howToReach: 'Located 58 km south of Chennai. Well connected by road and rail.',
    accommodation: 'Various hotels and homestays available ranging from ₹1,000-5,000/night',
    localCuisine: 'Fresh seafood, traditional Tamil meals, and street food',
  },
  ooty: {
    name: 'Ooty',
    description: 'Ooty, also known as Udhagamandalam, is a popular hill station located in the Nilgiri Hills of Tamil Nadu. It is often called the "Queen of Hill Stations" and is famous for its tea plantations, lakes, and colonial architecture.',
    district: 'Nilgiris',
    category: 'Hill Station',
    rating: 4.3,
    visitorCount: 80000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/ooty-1655457424_bca80f81e8391ebdaaca.webp',
    highlights: [
      { name: 'Ooty Lake', desc: 'Artificial lake with boating facilities', icon: '🚣' },
      { name: 'Botanical Gardens', desc: 'Beautiful gardens with exotic plants', icon: '🌺' },
      { name: 'Rose Garden', desc: 'Famous rose garden with 20,000 varieties', icon: '🌹' },
      { name: 'Doddabetta Peak', desc: 'Highest peak in the Nilgiri Hills', icon: '⛰️' },
    ],
    bestTime: 'April to June, September to November',
    entryFee: 'Free entry to most attractions',
    howToReach: 'Located 535 km from Chennai. Connected by road and the famous Nilgiri Mountain Railway.',
    accommodation: 'Wide range from budget guesthouses to luxury resorts',
    localCuisine: 'Tea, homemade chocolates, and traditional Nilgiri cuisine',
  },
  kanyakumari: {
    name: 'Kanyakumari',
    description: 'Kanyakumari is the southernmost point of mainland India, where the Arabian Sea, the Indian Ocean, and the Bay of Bengal meet. It is a sacred place associated with Goddess Kanyakumari.',
    district: 'Kanyakumari',
    category: 'Beach & Religious',
    rating: 4.4,
    visitorCount: 60000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kanyakumari-1656091428_cf69d9a9dbec82018046.jpg',
    highlights: [
      { name: 'Vivekananda Rock', desc: 'Memorial where Swami Vivekananda meditated', icon: '🪨' },
      { name: 'Kanyakumari Temple', desc: 'Ancient temple dedicated to Goddess Kanyakumari', icon: '🙏' },
      { name: 'Sunset Point', desc: 'Famous viewpoint for spectacular sunsets', icon: '🌅' },
      { name: 'Gandhi Memorial', desc: 'Where Mahatma Gandhi\'s ashes were kept', icon: '🇮🇳' },
    ],
    bestTime: 'October to March',
    entryFee: '₹20 for Vivekananda Rock ferry',
    howToReach: 'Located 242 km from Thiruvananthapuram. Well connected by road.',
    accommodation: 'Various hotels and resorts with sea views',
    localCuisine: 'Fresh seafood, coconut-based dishes, and traditional Tamil food',
  },
  madurai: {
    name: 'Madurai',
    description: 'Madurai, the cultural capital of Tamil Nadu, is one of the oldest continuously inhabited cities in the world. Famous for the Meenakshi Amman Temple, it represents the Dravidian culture and architecture at its finest.',
    district: 'Madurai',
    category: 'Heritage & Culture',
    rating: 4.6,
    visitorCount: 100000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/meenakshi-amman-temple-1656170467_cfebe78d69f069f881aa.webp',
    highlights: [
      { name: 'Meenakshi Amman Temple', desc: 'Magnificent Dravidian temple with thousand-pillared hall', icon: '🕉️' },
      { name: 'Thirumalai Nayak Palace', desc: '17th-century palace showcasing Indo-Saracenic architecture', icon: '🏰' },
      { name: 'Gandhi Memorial Museum', desc: 'Museum dedicated to Mahatma Gandhi\'s life and legacy', icon: '🇮🇳' },
      { name: 'Vaigai River', desc: 'Sacred river with beautiful ghats and evening walks', icon: '🌊' },
    ],
    bestTime: 'October to March',
    entryFee: 'Free for temple, ₹50 for palace',
    howToReach: 'Well connected by air (Madurai Airport), rail, and road. 460 km from Chennai.',
    accommodation: 'Budget to luxury hotels available, traditional heritage stays',
    localCuisine: 'Madurai mutton biryani, jigar masala, and traditional South Indian meals',
    darshanOptions: [
      { name: 'Normal Darshan', price: 50, duration: '30 mins' },
      { name: 'VIP Darshan', price: 200, duration: '15 mins' },
      { name: 'Special Pooja', price: 500, duration: '1 hour' },
    ],
  },
  kodaikanal: {
    name: 'Kodaikanal',
    description: 'Kodaikanal, the "Princess of Hill Stations," is a serene hill station in the Palani Hills. Known for its misty mountains, peaceful lakes, and colonial architecture, it offers a perfect retreat from city life.',
    district: 'Dindigul',
    category: 'Hill Station',
    rating: 4.4,
    visitorCount: 70000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kodaikanal-1655279477_0cdce0d4e58596e4fb33.webp',
    highlights: [
      { name: 'Kodaikanal Lake', desc: 'Star-shaped artificial lake perfect for boating', icon: '🚣' },
      { name: 'Coaker\'s Walk', desc: 'Scenic 1km walk with panoramic valley views', icon: '🚶' },
      { name: 'Pillar Rocks', desc: 'Unique rock formation resembling a pillar', icon: '🪨' },
      { name: 'Bear Shola Falls', desc: 'Beautiful waterfall surrounded by forests', icon: '💧' },
    ],
    bestTime: 'April to June, September to November',
    entryFee: '₹10 for boat ride, free for most attractions',
    howToReach: 'Located 120 km from Madurai. Connected by road, nearest airport is Madurai.',
    accommodation: 'Cottages, resorts, and homestays with mountain views',
    localCuisine: 'Fresh trout fish, homemade chocolates, and organic farm produce',
  },
  rameswaram: {
    name: 'Rameswaram',
    description: 'Rameswaram, the sacred island temple town, is one of the holiest places in India for Hindus. Connected to the epic Ramayana, it houses the magnificent Ramanathaswamy Temple and offers spiritual solace.',
    district: 'Ramanathapuram',
    category: 'Religious & Spiritual',
    rating: 4.5,
    visitorCount: 40000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/rameswaram-1655457953_09de320de48b98dece1a.webp',
    highlights: [
      { name: 'Ramanathaswamy Temple', desc: 'One of the 12 Jyotirlingas with longest temple corridor', icon: '🕉️' },
      { name: 'Adam\'s Bridge', desc: 'Chain of limestone shoals between India and Sri Lanka', icon: '🌉' },
      { name: 'Dhanushkodi', desc: 'Ghost town with pristine beaches and ruins', icon: '🏖️' },
      { name: 'Pamban Bridge', desc: 'Historic railway bridge connecting mainland to island', icon: '🚆' },
    ],
    bestTime: 'October to April',
    entryFee: 'Free for temple, ₹50 for camera',
    howToReach: 'Located 163 km from Madurai. Connected by road and the famous Pamban Bridge.',
    accommodation: 'Budget hotels, ashrams, and temple accommodations',
    localCuisine: 'Seafood delicacies, temple prasad, and traditional vegetarian meals',
    darshanOptions: [
      { name: 'Normal Darshan', price: 0, duration: '1-2 hours' },
      { name: 'VIP Darshan', price: 100, duration: '30 mins' },
      { name: 'Special Abhishek', price: 300, duration: '45 mins' },
    ],
  },
  chennai: {
    name: 'Chennai',
    description: 'Chennai, the capital of Tamil Nadu, is a vibrant metropolis blending colonial heritage with modern cosmopolitan culture. Known as the "Gateway to South India," it offers a mix of history, culture, and contemporary attractions.',
    district: 'Chennai',
    category: 'Urban & Cultural',
    rating: 4.2,
    visitorCount: 500000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/chennai-1654764398_76539011bf752b01585f.webp',
    highlights: [
      { name: 'Marina Beach', desc: 'Second longest urban beach in the world', icon: '🏖️' },
      { name: 'Kapaleeshwarar Temple', desc: 'Ancient Dravidian temple dedicated to Lord Shiva', icon: '🕉️' },
      { name: 'Fort St. George', desc: 'Historic British fort and museum', icon: '🏰' },
      { name: 'San Thome Basilica', desc: 'Beautiful Gothic cathedral and pilgrimage site', icon: '⛪' },
    ],
    bestTime: 'December to February',
    entryFee: 'Varies by attraction, ₹50-200',
    howToReach: 'Major international airport, extensive rail and road connectivity',
    accommodation: 'From budget hotels to 5-star resorts, heritage properties',
    localCuisine: 'Chettinad cuisine, filter coffee, street food, and seafood',
  },
  thanjavur: {
    name: 'Thanjavur',
    description: 'Thanjavur, the "Rice Bowl of Tamil Nadu," is a city steeped in history and classical arts. Famous for the Brihadeeswarar Temple (UNESCO site) and Nayak architecture, it\'s the cultural heart of Tamil classical music and dance.',
    district: 'Thanjavur',
    category: 'Heritage & Arts',
    rating: 4.7,
    visitorCount: 35000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/thanjavur-1655294212_8d67c2fdaa46899ddda7.webp',
    highlights: [
      { name: 'Brihadeeswarar Temple', desc: 'UNESCO World Heritage Site with massive vimana', icon: '🕉️' },
      { name: 'Thanjavur Palace', desc: 'Royal palace complex with museum and art gallery', icon: '🏰' },
      { name: 'Schwartz Church', desc: 'Historic Danish missionary church', icon: '⛪' },
      { name: 'Saraswathi Mahal Library', desc: 'One of India\'s oldest libraries', icon: '📚' },
    ],
    bestTime: 'October to March',
    entryFee: '₹30 for temple, ₹50 for palace',
    howToReach: 'Located 350 km from Chennai. Well connected by rail and road.',
    accommodation: 'Heritage hotels, budget lodges, and traditional homes',
    localCuisine: 'Thanjavur briyani, traditional vegetarian meals, and sweet dishes',
    darshanOptions: [
      { name: 'Normal Darshan', price: 30, duration: '45 mins' },
      { name: 'VIP Darshan', price: 150, duration: '20 mins' },
      { name: 'Special Pooja', price: 400, duration: '1 hour' },
    ],
  },
  kanchipuram: {
    name: 'Kanchipuram',
    description: 'Kanchipuram, the "City of Thousand Temples," is one of the seven sacred cities of India. Famous for its silk sarees, ancient temples, and religious significance, it\'s a living museum of Dravidian architecture.',
    district: 'Kanchipuram',
    category: 'Religious & Textile',
    rating: 4.5,
    visitorCount: 25000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kancheepuram-1656094320_3f77ec88eada40ee1f36.webp',
    highlights: [
      { name: 'Kamakshi Amman Temple', desc: 'Ancient temple dedicated to Goddess Kamakshi', icon: '🙏' },
      { name: 'Varadharaja Temple', desc: 'Vaishnavite temple with intricate carvings', icon: '🕉️' },
      { name: 'Ekambareswarar Temple', desc: 'Temple with 1000-year-old mango tree', icon: '🌳' },
      { name: 'Silk Weaving Centers', desc: 'Famous handloom silk saree manufacturing', icon: '🧵' },
    ],
    bestTime: 'October to March',
    entryFee: 'Free for temples',
    howToReach: 'Located 75 km from Chennai. Well connected by road and local trains.',
    accommodation: 'Temple stays, budget hotels, and traditional homes',
    localCuisine: 'Traditional vegetarian meals, temple prasad, and local delicacies',
    darshanOptions: [
      { name: 'Normal Darshan', price: 0, duration: '1 hour' },
      { name: 'VIP Darshan', price: 100, duration: '30 mins' },
      { name: 'Special Archana', price: 250, duration: '45 mins' },
    ],
  },
  srivilliputhur: {
    name: 'Srivilliputhur',
    description: 'Srivilliputhur is famous for the Andal Temple, one of the 108 Divya Desams dedicated to Lord Vishnu. It\'s the birthplace of the poet-saint Andal and showcases magnificent Dravidian architecture.',
    district: 'Virudhunagar',
    category: 'Religious & Heritage',
    rating: 4.4,
    visitorCount: 50000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/srivilliputhur-andal-temple-1656235549_c00a2b162e36825fac57.webp',
    highlights: [
      { name: 'Andal Temple', desc: 'Ancient temple dedicated to Goddess Andal with intricate carvings', icon: '🕉️' },
      { name: 'Rajagopuram', desc: '194-foot tall tower built by Vijayanagara kings', icon: '🏗️' },
      { name: 'Musical Pillars', desc: 'Pillars that produce musical notes when struck', icon: '🎵' },
      { name: 'Festivals', desc: 'Famous for Andal Jayanti and other religious celebrations', icon: '🎉' },
    ],
    bestTime: 'October to March',
    entryFee: 'Free',
    howToReach: 'Located 75 km from Madurai. Bus station 1 km, railway station 2 km away.',
    accommodation: 'Budget hotels and lodges available',
    localCuisine: 'Traditional South Indian vegetarian meals',
    darshanOptions: [
      { name: 'Normal Darshan', price: 0, duration: '45 mins' },
      { name: 'VIP Darshan', price: 50, duration: '20 mins' },
      { name: 'Special Archana', price: 150, duration: '30 mins' },
    ],
  },
  palani: {
    name: 'Palani',
    description: 'Palani is home to the famous Dhandayuthapani Swamy Temple, one of the richest temples in India dedicated to Lord Muruga. Located on Sivagiri Hill, it requires climbing 670 steps to reach.',
    district: 'Dindigul',
    category: 'Religious',
    rating: 4.6,
    visitorCount: 100000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/arulmigu-dhandayuthapani-swamy-temple-palani-1657867829_3fda42dd1b3ef365f142.webp',
    highlights: [
      { name: 'Dhandayuthapani Temple', desc: 'Temple with idol made of Navapashanam herbs', icon: '🕉️' },
      { name: '670 Steps', desc: 'Sacred steps leading to the temple', icon: '🪜' },
      { name: 'Ropeway', desc: 'Modern ropeway for easier access', icon: '🚡' },
      { name: 'Thai Poosam Festival', desc: 'Major festival with Kavadi procession', icon: '🎊' },
    ],
    bestTime: 'October to May',
    entryFee: 'Free',
    howToReach: 'Located 114 km from Coimbatore. Bus stand 1 km, railway station 2 km away.',
    accommodation: 'Hotels and lodges near the temple',
    localCuisine: 'Traditional Tamil vegetarian food and temple prasad',
    darshanOptions: [
      { name: 'Normal Darshan', price: 0, duration: '30 mins' },
      { name: 'VIP Darshan', price: 100, duration: '15 mins' },
      { name: 'Special Pooja', price: 250, duration: '1 hour' },
    ],
  },
  'kolli-hills': {
    name: 'Kolli Hills',
    description: 'Gifted with pleasant weather throughout the year, Kolli hills is one of those round the season destinations in Tamil Nadu. Unique in landscape and attractions, it has a scenic beauty and has plenty to offer for the exploring travellers.',
    district: 'Namakkal',
    category: 'Hill Station',
    rating: 4.3,
    visitorCount: 50000,
    image: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kolli-hills-1656181182_756ec5b879172b6a9eb2.webp',
    highlights: [
      { name: 'Agasagangai Waterfalls', desc: 'Beautiful waterfall requiring 1000 steps descent', icon: '💧' },
      { name: 'Vasalurpatty Lake', desc: 'Artificial lake for boating and relaxation', icon: '🏞️' },
      { name: 'Siddhar Caves', desc: 'Ancient caves of Bogar and Agastya', icon: '🕳️' },
      { name: 'Selur Viewpoint', desc: 'Highest point with spectacular views', icon: '🏔️' },
    ],
    bestTime: 'Throughout the year',
    entryFee: 'Free',
    howToReach: 'Located in Namakkal district. Accessible from Namakkal, Rasipuram, or Salem.',
    accommodation: 'Limited options, basic lodges and homestays',
    localCuisine: 'Local Tamil cuisine, fresh produce from plantations',
  }
};

export default function DestinationDetail() {
  const params = useParams();
  const destinationId = params.id as string;
  const destination = destinationsData[destinationId as keyof typeof destinationsData];

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
            <Link href="/discover" className="text-blue-600 hover:text-blue-800">
              ← Back to Discover
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 overflow-hidden">
            <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
                <p className="text-xl">{destination.district} District</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-yellow-500 text-lg">⭐ {destination.rating}</span>
                <span className="text-gray-500">{destination.visitorCount.toLocaleString()} visitors</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {destination.category}
                </span>
              </div>
              <div className="flex space-x-2">
                <Link href={`/book?id=${destinationId}&type=destination`} className="bg-blue-600 !text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Plan Visit
                </Link>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
                  Share
                </button>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{destination.description}</p>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {destination.highlights.map((highlight, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-3">{highlight.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{highlight.name}</h3>
              <p className="text-sm text-gray-600">{highlight.desc}</p>
            </div>
          ))}
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Travel Information</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">Best Time to Visit</h3>
                <p className="text-gray-600">{destination.bestTime}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Entry Fee</h3>
                <p className="text-gray-600">{destination.entryFee}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">How to Reach</h3>
                <p className="text-gray-600">{destination.howToReach}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Local Experience</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">Accommodation</h3>
                <p className="text-gray-600">{destination.accommodation}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Local Cuisine</h3>
                <p className="text-gray-600">{destination.localCuisine}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Activities</h3>
                <p className="text-gray-600">Explore local markets, interact with artisans, and experience traditional culture.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Experiences Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Experiences in {destination.name}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock experiences - in real app, filter by location */}
            {destination.name === 'Kanchipuram' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🧵</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Kanchipuram Silk Weaving Experience</h4>
                      <p className="text-sm text-gray-600 mb-2">Learn traditional silk weaving from master artisans</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.8</span>
                          <span className="text-green-600 font-semibold">₹1200</span>
                        </div>
                        <Link href="/book?id=kanchipuram-silk-weaving&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🙏</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Temple Darshan Experience</h4>
                      <p className="text-sm text-gray-600 mb-2">Guided temple tour with priest blessings</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.7</span>
                          <span className="text-green-600 font-semibold">₹600</span>
                        </div>
                        <Link href="/book?id=madurai-temple-darshan&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Ooty' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🌹</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Rose Garden & Botanical Tour</h4>
                      <p className="text-sm text-gray-600 mb-2">Explore the beautiful rose garden and botanical gardens of Ooty</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.6</span>
                          <span className="text-green-600 font-semibold">₹300</span>
                        </div>
                        <Link href="/book?id=ooty-rose-garden&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">☕</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Nilgiri Tea Plantation Experience</h4>
                      <p className="text-sm text-gray-600 mb-2">Visit working tea plantations and learn about tea production</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.7</span>
                          <span className="text-green-600 font-semibold">₹600</span>
                        </div>
                        <Link href="/book?id=ooty-tea-plantation-visit&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Rameswaram' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🕉️</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Rameswaram Pilgrimage Tour</h4>
                      <p className="text-sm text-gray-600 mb-2">Guided tour of sacred temples with spiritual insights</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.8</span>
                          <span className="text-green-600 font-semibold">₹1200</span>
                        </div>
                        <Link href="/book?id=rameswaram-pilgrimage&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🌊</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Adam's Bridge Exploration</h4>
                      <p className="text-sm text-gray-600 mb-2">Boat tour to the legendary Adam's Bridge</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.7</span>
                          <span className="text-green-600 font-semibold">₹800</span>
                        </div>
                        <Link href="/book?id=rameswaram-adams-bridge&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🏖️</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Dhanushkodi Beach Visit</h4>
                      <p className="text-sm text-gray-600 mb-2">Explore the pristine beaches of Dhanushkodi</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.6</span>
                          <span className="text-green-600 font-semibold">₹600</span>
                        </div>
                        <Link href="/book?id=rameswaram-dhanushkodi&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Mahabalipuram' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🏛️</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Rock Cut Temple Tour</h4>
                      <p className="text-sm text-gray-600 mb-2">Explore UNESCO heritage rock-cut temples</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.7</span>
                          <span className="text-green-600 font-semibold">₹900</span>
                        </div>
                        <Link href="/book?id=thanjavur-temple-tour&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Chennai' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🏖️</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Marina Beach Exploration</h4>
                      <p className="text-sm text-gray-600 mb-2">Relaxing beach experience with local food</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.3</span>
                          <span className="text-green-600 font-semibold">₹500</span>
                        </div>
                        <Link href="/book?id=chennai-marina-beach&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Kanyakumari' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🌅</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Sunrise Viewing Experience</h4>
                      <p className="text-sm text-gray-600 mb-2">Witness the spectacular sunrise where three seas meet</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.9</span>
                          <span className="text-green-600 font-semibold">₹400</span>
                        </div>
                        <Link href="/book?id=kanyakumari-sunrise-viewing&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🗿</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Vivekananda Rock Memorial Tour</h4>
                      <p className="text-sm text-gray-600 mb-2">Visit the iconic memorial where Swami Vivekananda meditated</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.8</span>
                          <span className="text-green-600 font-semibold">₹300</span>
                        </div>
                        <Link href="/book?id=kanyakumari-vivekananda-rock&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Madurai' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🏛️</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Meenakshi Temple Architecture Tour</h4>
                      <p className="text-sm text-gray-600 mb-2">Detailed exploration of Dravidian architecture and sculptures</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.8</span>
                          <span className="text-green-600 font-semibold">₹700</span>
                        </div>
                        <Link href="/book?id=madurai-meenakshi-architecture&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🍛</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Madurai Street Food Adventure</h4>
                      <p className="text-sm text-gray-600 mb-2">Explore famous street food culture with local delicacies</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.6</span>
                          <span className="text-green-600 font-semibold">₹500</span>
                        </div>
                        <Link href="/book?id=madurai-street-food-tour&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Kodaikanal' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🚣</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Boat House & Lake Tour</h4>
                      <p className="text-sm text-gray-600 mb-2">Enjoy boating and explore the beautiful Kodaikanal Lake</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.5</span>
                          <span className="text-green-600 font-semibold">₹400</span>
                        </div>
                        <Link href="/book?id=kodai-boat-house-visit&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🏔️</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Pillar Rocks Adventure Hike</h4>
                      <p className="text-sm text-gray-600 mb-2">Hike to the famous Pillar Rocks for panoramic views</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.7</span>
                          <span className="text-green-600 font-semibold">₹800</span>
                        </div>
                        <Link href="/book?id=kodai-pillar-rocks-hike&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Thanjavur' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🎭</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Carnatic Music & Dance Performance</h4>
                      <p className="text-sm text-gray-600 mb-2">Experience traditional Carnatic music and Bharatanatyam dance</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.8</span>
                          <span className="text-green-600 font-semibold">₹900</span>
                        </div>
                        <Link href="/book?id=thanjavur-music-dance&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🎨</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Thanjavur Painting Workshop</h4>
                      <p className="text-sm text-gray-600 mb-2">Learn traditional Thanjavur painting techniques from master artists</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.9</span>
                          <span className="text-green-600 font-semibold">₹1000</span>
                        </div>
                        <Link href="/book?id=thanjavur-painting-workshop&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Chennai' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🏖️</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Marina Beach Evening Walk</h4>
                      <p className="text-sm text-gray-600 mb-2">Stroll along India's longest beach with street food and sunset views</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.3</span>
                          <span className="text-green-600 font-semibold">₹200</span>
                        </div>
                        <Link href="/book?id=chennai-marina-beach&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🏰</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Fort St. George Heritage Tour</h4>
                      <p className="text-sm text-gray-600 mb-2">Explore the 17th-century British fort and colonial architecture</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.5</span>
                          <span className="text-green-600 font-semibold">₹500</span>
                        </div>
                        <Link href="/book?id=chennai-fort-st-george&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Srivilliputhur' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🕉️</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Andal Temple Spiritual Tour</h4>
                      <p className="text-sm text-gray-600 mb-2">Guided tour of the Andal Temple with mythological insights</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.7</span>
                          <span className="text-green-600 font-semibold">₹400</span>
                        </div>
                        <Link href="/book?id=srivilliputhur-temple-tour&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🎵</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Musical Pillars Experience</h4>
                      <p className="text-sm text-gray-600 mb-2">Experience the unique musical pillars that produce different notes</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.6</span>
                          <span className="text-green-600 font-semibold">₹300</span>
                        </div>
                        <Link href="/book?id=srivilliputhur-musical-pillars&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Palani' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🪜</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">670 Steps Pilgrimage</h4>
                      <p className="text-sm text-gray-600 mb-2">Guided climb of the sacred 670 steps to the temple</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.8</span>
                          <span className="text-green-600 font-semibold">₹600</span>
                        </div>
                        <Link href="/book?id=palani-steps-pilgrimage&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🚡</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Ropeway Temple Access</h4>
                      <p className="text-sm text-gray-600 mb-2">Convenient ropeway ride to the Dhandayuthapani Temple</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.5</span>
                          <span className="text-green-600 font-semibold">₹200</span>
                        </div>
                        <Link href="/book?id=palani-ropeway-access&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {destination.name === 'Kolli Hills' && (
              <>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🥾</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Trekking Adventure</h4>
                      <p className="text-sm text-gray-600 mb-2">Guided trekking through the scenic Kolli Hills trails</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.7</span>
                          <span className="text-green-600 font-semibold">₹800</span>
                        </div>
                        <Link href="/book?id=kolli-hills-trekking&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">💧</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Agasagangai Waterfalls Visit</h4>
                      <p className="text-sm text-gray-600 mb-2">Explore the beautiful waterfalls and natural pools</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 text-sm">⭐ 4.6</span>
                          <span className="text-green-600 font-semibold">₹500</span>
                        </div>
                        <Link href="/book?id=kolli-hills-waterfalls&type=experience" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Darshan Booking Section */}
        {'darshanOptions' in destination && (destination as any).darshanOptions && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Temple Darshan</h2>
            <p className="text-gray-600 mb-6">Reserve your darshan slots in advance for a spiritual experience</p>
            <div className="grid md:grid-cols-3 gap-4">
              {(destination as any).darshanOptions.map((option: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">{option.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{option.duration}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">₹{option.price}</span>
                    <Link href={`/book?id=${destinationId}&type=destination&darshan=${option.name.toLowerCase().replace(' ', '-')}`} className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Call to Action */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-10 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
          <div className="relative">
            <h2 className="text-4xl font-bold mb-4">Ready to Experience {destination.name}?</h2>
            <p className="text-xl mb-8 opacity-90">Book authentic local experiences and create unforgettable memories in Tamil Nadu</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/discover" className="!bg-white !text-blue-600 px-10 py-4 rounded-2xl hover:bg-blue-50 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                🌟 Explore Experiences
              </Link>
              <button className="border-2 border-white text-white px-10 py-4 rounded-2xl hover:bg-white hover:text-blue-600 font-bold text-lg transition-all duration-300 hover:shadow-xl">
                📥 Download Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}