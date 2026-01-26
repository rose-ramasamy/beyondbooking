'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';

// Mock data for experiences and destinations
const mockExperiences = [
  {
    id: 'traditional-cooking',
    title: 'Traditional Tamil Cooking Class',
    description: 'Learn to cook authentic Tamil dishes with local ingredients and traditional methods.',
    category: 'food',
    price: 1500,
    duration: '3 hours',
    rating: 4.8,
    location: 'Mahabalipuram',
    operator: 'Chef Kumar',
    includes: ['Ingredients', 'Recipe book', 'Certificate', 'Lunch'],
    image: '🍳',
    highlights: ['Authentic recipes', 'Local ingredients', 'Traditional methods', 'Take-home recipes']
  },
  {
    id: 'temple-tour',
    title: 'Heritage Temple Tour',
    description: 'Guided tour of ancient temples with expert archaeologists and historians.',
    category: 'heritage',
    price: 2000,
    duration: '4 hours',
    rating: 4.6,
    location: 'Mahabalipuram',
    operator: 'Dr. Archaeological Society',
    includes: ['Expert guide', 'Entry tickets', 'Transport', 'Documentation'],
    image: '🕉️',
    highlights: ['Ancient temples', 'Expert guidance', 'Historical insights', 'Archaeological facts']
  },
  {
    id: 'hill-trekking',
    title: 'Hill Station Trekking',
    description: 'Scenic trekking through forests and viewpoints with experienced guides.',
    category: 'adventure',
    price: 2500,
    duration: '6 hours',
    rating: 4.7,
    location: 'Ooty',
    operator: 'Mountain Guides TN',
    includes: ['Guide', 'Safety equipment', 'Snacks', 'First aid'],
    image: '🥾',
    highlights: ['Scenic trails', 'Forest views', 'Mountain peaks', 'Wildlife spotting']
  },
  {
    id: 'ayurveda-spa',
    title: 'Ayurvedic Wellness Retreat',
    description: 'Traditional Ayurvedic treatments and wellness therapies in serene surroundings.',
    category: 'wellness',
    price: 3500,
    duration: '2 hours',
    rating: 4.9,
    location: 'Kodaikanal',
    operator: 'Siddha Wellness Center',
    includes: ['Consultation', 'Treatment', 'Herbal tea', 'Follow-up'],
    image: '🧘',
    highlights: ['Ayurvedic treatments', 'Wellness therapies', 'Herbal remedies', 'Relaxation']
  },
  {
    id: 'village-tour',
    title: 'Rural Village Experience',
    description: 'Immersive experience in traditional Tamil village with local artisans and farmers.',
    category: 'cultural',
    price: 1800,
    duration: '5 hours',
    rating: 4.5,
    location: 'Chengalpattu',
    operator: 'Rural Tourism Collective',
    includes: ['Village tour', 'Artisan interaction', 'Traditional lunch', 'Handicraft'],
    image: '🏘️',
    highlights: ['Village life', 'Local artisans', 'Traditional crafts', 'Cultural immersion']
  },
  {
    id: 'photography-workshop',
    title: 'Wildlife Photography Workshop',
    description: 'Professional photography workshop capturing TN\'s diverse wildlife and landscapes.',
    category: 'education',
    price: 3000,
    duration: '8 hours',
    rating: 4.7,
    location: 'Mudumalai',
    operator: 'Nature Lens Photography',
    includes: ['Camera guidance', 'Editing session', 'Portfolio', 'Transport'],
    image: '📸',
    highlights: ['Wildlife photography', 'Landscape shots', 'Professional guidance', 'Editing tips']
  },
  {
    id: 'chennai-food-tour',
    title: 'Chennai Street Food Tour',
    description: 'Explore the vibrant street food culture of Chennai with a local food expert.',
    category: 'food',
    price: 1200,
    duration: '4 hours',
    rating: 4.6,
    location: 'Chennai',
    operator: 'Chennai Food Walks',
    includes: ['Local guide', 'Food tastings', 'Cultural insights', 'Transport'],
    image: '🍜',
    highlights: ['Street food', 'Local delicacies', 'Food culture', 'Hidden gems']
  },
  {
    id: 'silk-weaving',
    title: 'Kanchipuram Silk Weaving Experience',
    description: 'Learn traditional silk weaving techniques from master craftsmen in the silk city.',
    category: 'artisan',
    price: 1800,
    duration: '3 hours',
    rating: 4.9,
    location: 'Kanchipuram',
    operator: 'Silk Heritage Center',
    includes: ['Weaving demo', 'Hands-on experience', 'Silk saree', 'Certificate'],
    image: '🧵',
    highlights: ['Silk weaving', 'Traditional crafts', 'Master craftsmen', 'Silk products']
  },
  {
    id: 'carnatic-music',
    title: 'Carnatic Music Workshop',
    description: 'Learn the basics of Carnatic music from renowned musicians in the music capital.',
    category: 'music',
    price: 2500,
    duration: '2 hours',
    rating: 4.8,
    location: 'Thanjavur',
    operator: 'Thanjavur Music Academy',
    includes: ['Music lesson', 'Instrument demo', 'Recording', 'Materials'],
    image: '🎵',
    highlights: ['Carnatic music', 'Classical training', 'Instrument learning', 'Music theory']
  },
  {
    id: 'spice-plantation',
    title: 'Spice Plantation Tour',
    description: 'Visit working spice plantations and learn about TN\'s spice heritage.',
    category: 'agriculture',
    price: 1000,
    duration: '3 hours',
    rating: 4.4,
    location: 'Kodaikanal',
    operator: 'Green Valley Farms',
    includes: ['Plantation tour', 'Spice tasting', 'Processing demo', 'Take-home spices'],
    image: '🌿',
    highlights: ['Spice plantations', 'Agricultural tours', 'Spice tasting', 'Processing methods']
  },
  {
    id: 'ooty-lake-boating',
    title: 'Ooty Lake Boating Experience',
    description: 'Peaceful boating on the serene Ooty Lake with stunning mountain views.',
    category: 'adventure',
    price: 800,
    duration: '1 hour',
    rating: 4.6,
    location: 'Ooty',
    operator: 'Lake View Tours',
    includes: ['Boat rental', 'Life jacket', 'Guide', 'Photography'],
    image: '⛵',
    highlights: ['Scenic lake views', 'Mountain backdrop', 'Peaceful atmosphere', 'Photography spots']
  },
  {
    id: 'kanchipuram-silk-weaving',
    title: 'Kanchipuram Silk Weaving Experience',
    description: 'Learn traditional silk weaving techniques from master artisans in Kanchipuram.',
    category: 'cultural',
    price: 1200,
    duration: '3 hours',
    rating: 4.8,
    location: 'Kanchipuram',
    operator: 'Silk Heritage Center',
    includes: ['Weaving demonstration', 'Hands-on experience', 'Silk samples', 'Tea'],
    image: '🧵',
    highlights: ['Traditional techniques', 'Master artisans', 'Silk history', 'Take-home samples']
  },
  {
    id: 'madurai-temple-darshan',
    title: 'Madurai Temple Darshan',
    description: 'Guided tour of the magnificent Meenakshi Temple with cultural insights.',
    category: 'religious',
    price: 600,
    duration: '2 hours',
    rating: 4.7,
    location: 'Madurai',
    operator: 'Temple Guides TN',
    includes: ['Temple entry', 'Guide services', 'Audio guide', 'Blessings'],
    image: '🕉️',
    highlights: ['Ancient architecture', 'Cultural significance', 'Sculpture details', 'Spiritual experience']
  },
  {
    id: 'kodaikanal-hiking',
    title: 'Kodaikanal Mountain Hiking',
    description: 'Scenic hiking trails through misty mountains and pristine forests.',
    category: 'adventure',
    price: 1500,
    duration: '4 hours',
    rating: 4.5,
    location: 'Kodaikanal',
    operator: 'Mountain Trekkers',
    includes: ['Guide', 'Safety equipment', 'Snacks', 'First aid'],
    image: '🥾',
    highlights: ['Panoramic views', 'Forest trails', 'Wildlife spotting', 'Fresh mountain air']
  },
  {
    id: 'rameswaram-pilgrimage',
    title: 'Rameswaram Pilgrimage Tour',
    description: 'Sacred pilgrimage to the holy temples of Rameswaram with spiritual guidance.',
    category: 'religious',
    price: 1000,
    duration: '3 hours',
    rating: 4.9,
    location: 'Rameswaram',
    operator: 'Sacred Journeys',
    includes: ['Temple darshan', 'Priest guidance', 'Holy water', 'Prasad'],
    image: '🙏',
    highlights: ['Sacred sites', 'Spiritual significance', 'Ancient temples', 'Holy rituals']
  },
  {
    id: 'chennai-marina-beach',
    title: 'Chennai Marina Beach Exploration',
    description: 'Relaxing beach experience with local food and cultural insights.',
    category: 'leisure',
    price: 500,
    duration: '2 hours',
    rating: 4.3,
    location: 'Chennai',
    operator: 'Coastal Explorers',
    includes: ['Beach access', 'Local snacks', 'Cultural stories', 'Sunset views'],
    image: '🏖️',
    highlights: ['Longest beach', 'Local cuisine', 'Cultural history', 'Relaxing atmosphere']
  },
  {
    id: 'thanjavur-temple-tour',
    title: 'Thanjavur Temple Architecture Tour',
    description: 'Explore the magnificent temples of Thanjavur known for their Dravidian architecture.',
    category: 'cultural',
    price: 900,
    duration: '3 hours',
    rating: 4.6,
    location: 'Thanjavur',
    operator: 'Heritage Guides',
    includes: ['Temple entry', 'Architecture guide', 'History lessons', 'Photography'],
    image: '🏛️',
    highlights: ['Dravidian architecture', 'UNESCO heritage', 'Sculpture art', 'Historical significance']
  },
  {
    id: 'rameswaram-adams-bridge',
    title: 'Adam\'s Bridge Exploration',
    description: 'Boat tour to the legendary Adam\'s Bridge connecting India and Sri Lanka.',
    category: 'adventure',
    price: 800,
    duration: '2 hours',
    rating: 4.7,
    location: 'Rameswaram',
    operator: 'Island Explorers',
    includes: ['Boat ride', 'Guide', 'Snacks', 'Photography'],
    image: '🌊',
    highlights: ['Legendary bridge', 'Ocean views', 'Marine life', 'Historical significance']
  },
  {
    id: 'rameswaram-dhanushkodi',
    title: 'Dhanushkodi Beach Visit',
    description: 'Explore the pristine beaches and ruins of the ghost town Dhanushkodi.',
    category: 'cultural',
    price: 600,
    duration: '3 hours',
    rating: 4.6,
    location: 'Rameswaram',
    operator: 'Heritage Tours',
    includes: ['Transportation', 'Guide', 'Local stories', 'Beach time'],
    image: '🏖️',
    highlights: ['Ghost town', 'Pristine beaches', 'Historical ruins', 'Peaceful atmosphere']
  },
  {
    id: 'kanyakumari-sunrise-viewing',
    title: 'Kanyakumari Sunrise Viewing',
    description: 'Witness the spectacular sunrise where three seas meet at India\'s southernmost tip.',
    category: 'nature',
    price: 400,
    duration: '2 hours',
    rating: 4.9,
    location: 'Kanyakumari',
    operator: 'Sunrise Tours',
    includes: ['Sunrise viewing', 'Photography guide', 'Hot beverages', 'Seating arrangement'],
    image: '🌅',
    highlights: ['Three seas confluence', 'Spectacular sunrise', 'Triveni Sangam', 'Peaceful atmosphere']
  },
  {
    id: 'kanyakumari-vivekananda-rock',
    title: 'Vivekananda Rock Memorial Tour',
    description: 'Visit the iconic Vivekananda Rock Memorial and meditation hall.',
    category: 'heritage',
    price: 300,
    duration: '1.5 hours',
    rating: 4.8,
    location: 'Kanyakumari',
    operator: 'Heritage Guides',
    includes: ['Boat ride', 'Memorial entry', 'Audio guide', 'Photography'],
    image: '🗿',
    highlights: ['Vivekananda memorial', 'Meditation hall', 'Ocean views', 'Spiritual significance']
  },
  {
    id: 'chennai-marina-evening',
    title: 'Marina Beach Evening Walk',
    description: 'Stroll along India\'s longest beach with street food and sunset views.',
    category: 'leisure',
    price: 200,
    duration: '2 hours',
    rating: 4.3,
    location: 'Chennai',
    operator: 'City Walks',
    includes: ['Guided walk', 'Street food tasting', 'Sunset viewing', 'Local stories'],
    image: '🏖️',
    highlights: ['Longest beach', 'Street food', 'Sunset views', 'Urban culture']
  },
  {
    id: 'chennai-fort-st-george',
    title: 'Fort St. George Heritage Tour',
    description: 'Explore the 17th-century British fort and colonial architecture.',
    category: 'heritage',
    price: 500,
    duration: '2 hours',
    rating: 4.5,
    location: 'Chennai',
    operator: 'Heritage Tours',
    includes: ['Fort entry', 'Museum access', 'Guide services', 'Photography'],
    image: '🏰',
    highlights: ['British colonial history', 'St. Mary\'s Church', 'Museum exhibits', 'Architecture']
  },
  {
    id: 'ooty-rose-garden',
    title: 'Ooty Rose Garden & Botanical Tour',
    description: 'Explore the beautiful rose garden and botanical gardens of Ooty.',
    category: 'nature',
    price: 300,
    duration: '1.5 hours',
    rating: 4.6,
    location: 'Ooty',
    operator: 'Garden Tours',
    includes: ['Garden entry', 'Guide services', 'Photography', 'Flower information'],
    image: '🌹',
    highlights: ['Rose collections', 'Botanical varieties', 'Peaceful gardens', 'Photography spots']
  },
  {
    id: 'ooty-tea-plantation-visit',
    title: 'Nilgiri Tea Plantation Experience',
    description: 'Visit working tea plantations and learn about tea production.',
    category: 'cultural',
    price: 600,
    duration: '3 hours',
    rating: 4.7,
    location: 'Ooty',
    operator: 'Tea Estate Tours',
    includes: ['Plantation visit', 'Tea tasting', 'Production demo', 'Factory tour'],
    image: '☕',
    highlights: ['Tea production', 'Estate walking', 'Tasting session', 'Sustainable farming']
  },
  {
    id: 'madurai-meenakshi-architecture',
    title: 'Meenakshi Temple Architecture Tour',
    description: 'Detailed exploration of the temple\'s Dravidian architecture and sculptures.',
    category: 'heritage',
    price: 700,
    duration: '2.5 hours',
    rating: 4.8,
    location: 'Madurai',
    operator: 'Architecture Experts',
    includes: ['Temple entry', 'Expert guide', 'Architecture details', 'Photography'],
    image: '🏛️',
    highlights: ['Dravidian architecture', 'Sculpture details', 'Temple history', 'Artistic elements']
  },
  {
    id: 'madurai-street-food-tour',
    title: 'Madurai Street Food Adventure',
    description: 'Explore the famous street food culture of Madurai with local delicacies.',
    category: 'food',
    price: 500,
    duration: '3 hours',
    rating: 4.6,
    location: 'Madurai',
    operator: 'Food Explorers',
    includes: ['Food tasting', 'Local guide', 'Beverages', 'Cultural insights'],
    image: '🍛',
    highlights: ['Local delicacies', 'Street food culture', 'Madurai specialities', 'Food history']
  },
  {
    id: 'kodai-boat-house-visit',
    title: 'Kodaikanal Boat House & Lake Tour',
    description: 'Enjoy boating and explore the beautiful Kodaikanal Lake area.',
    category: 'leisure',
    price: 400,
    duration: '2 hours',
    rating: 4.5,
    location: 'Kodaikanal',
    operator: 'Lake Tours',
    includes: ['Boat ride', 'Lake exploration', 'Photography', 'Snacks'],
    image: '🚣',
    highlights: ['Lake boating', 'Scenic views', 'Peaceful atmosphere', 'Nature walks']
  },
  {
    id: 'kodai-pillar-rocks-hike',
    title: 'Pillar Rocks Adventure Hike',
    description: 'Hike to the famous Pillar Rocks for panoramic views of the Palani Hills.',
    category: 'adventure',
    price: 800,
    duration: '4 hours',
    rating: 4.7,
    location: 'Kodaikanal',
    operator: 'Adventure Guides',
    includes: ['Guided hike', 'Safety equipment', 'Water bottles', 'First aid'],
    image: '🏔️',
    highlights: ['Panoramic views', 'Rock formations', 'Hill scenery', 'Adventure experience']
  },
  {
    id: 'thanjavur-music-dance',
    title: 'Carnatic Music & Dance Performance',
    description: 'Experience traditional Carnatic music and Bharatanatyam dance in Thanjavur.',
    category: 'cultural',
    price: 900,
    duration: '2 hours',
    rating: 4.8,
    location: 'Thanjavur',
    operator: 'Cultural Center',
    includes: ['Performance tickets', 'Artist interaction', 'Cultural insights', 'Refreshments'],
    image: '🎭',
    highlights: ['Carnatic music', 'Bharatanatyam dance', 'Cultural heritage', 'Artist performance']
  },
  {
    id: 'thanjavur-painting-workshop',
    title: 'Thanjavur Painting Workshop',
    description: 'Learn traditional Thanjavur painting techniques from master artists.',
    category: 'art',
    price: 1000,
    duration: '4 hours',
    rating: 4.9,
    location: 'Thanjavur',
    operator: 'Art Studio',
    includes: ['Materials provided', 'Expert instruction', 'Take-home painting', 'Tea breaks'],
    image: '🎨',
    highlights: ['Traditional techniques', 'Gold leaf work', 'Miniature art', 'Cultural learning']
  }
];

const mockAccommodations = [
  {
    id: 'ooty-lake-view-resort',
    name: 'Lake View Resort',
    type: 'Resort',
    location: 'Ooty',
    rating: 4.5,
    price: 3500,
    image: '🏨',
    amenities: ['Lake View', 'Restaurant', 'Spa', 'WiFi', 'Parking'],
    description: 'Luxurious resort with stunning lake views and modern amenities'
  },
  {
    id: 'ooty-colonial-homestay',
    name: 'Colonial Homestay',
    type: 'Homestay',
    location: 'Ooty',
    rating: 4.7,
    price: 2200,
    image: '🏠',
    amenities: ['Heritage Building', 'Home-cooked Meals', 'Garden', 'WiFi'],
    description: 'Charming colonial-era homestay with authentic Tamil hospitality'
  },
  {
    id: 'kanyakumari-beach-resort',
    name: 'Sunset Beach Resort',
    type: 'Resort',
    location: 'Kanyakumari',
    rating: 4.4,
    price: 2800,
    image: '🏖️',
    amenities: ['Beach Access', 'Sea View', 'Restaurant', 'Pool', 'WiFi'],
    description: 'Beachfront resort perfect for experiencing the three seas confluence'
  },
  {
    id: 'kanyakumari-heritage-homestay',
    name: 'Heritage Homestay',
    type: 'Homestay',
    location: 'Kanyakumari',
    rating: 4.6,
    price: 1800,
    image: '🏛️',
    amenities: ['Heritage Architecture', 'Local Cuisine', 'Garden', 'Cultural Tours'],
    description: 'Traditional home with heritage architecture and local cultural insights'
  },
  {
    id: 'madurai-temple-view-hotel',
    name: 'Temple View Grand Hotel',
    type: 'Hotel',
    location: 'Madurai',
    rating: 4.3,
    price: 2500,
    image: '🏨',
    amenities: ['Temple View', 'Restaurant', 'Business Center', 'WiFi', 'Parking'],
    description: 'Modern hotel with panoramic views of the Meenakshi Temple'
  },
  {
    id: 'madurai-traditional-homestay',
    name: 'Traditional Chettinad Homestay',
    type: 'Homestay',
    location: 'Madurai',
    rating: 4.8,
    price: 2000,
    image: '🏠',
    amenities: ['Chettinad Architecture', 'Authentic Cuisine', 'Cultural Programs', 'WiFi'],
    description: 'Experience traditional Chettinad culture in a heritage home'
  },
  {
    id: 'kodai-lake-side-resort',
    name: 'Lake Side Resort',
    type: 'Resort',
    location: 'Kodaikanal',
    rating: 4.5,
    price: 3200,
    image: '🏞️',
    amenities: ['Lake View', 'Boating', 'Restaurant', 'Spa', 'Hiking Trails'],
    description: 'Scenic resort overlooking the beautiful Kodaikanal Lake'
  },
  {
    id: 'kodai-mountain-homestay',
    name: 'Mountain View Homestay',
    type: 'Homestay',
    location: 'Kodaikanal',
    rating: 4.6,
    price: 1900,
    image: '🏔️',
    amenities: ['Mountain Views', 'Organic Food', 'Nature Walks', 'Bonfire'],
    description: 'Peaceful homestay nestled in the Kodaikanal hills'
  },
  {
    id: 'chennai-business-hotel',
    name: 'Marina Bay Hotel',
    type: 'Hotel',
    location: 'Chennai',
    rating: 4.2,
    price: 4000,
    image: '🏙️',
    amenities: ['City View', 'Business Center', 'Gym', 'Restaurant', 'WiFi'],
    description: 'Modern business hotel in the heart of Chennai'
  },
  {
    id: 'chennai-heritage-boutique',
    name: 'Heritage Boutique Stay',
    type: 'Boutique Hotel',
    location: 'Chennai',
    rating: 4.7,
    price: 3500,
    image: '🏛️',
    amenities: ['Heritage Architecture', 'Fine Dining', 'Spa', 'Cultural Events'],
    description: 'Luxurious boutique hotel in a restored heritage building'
  },
  {
    id: 'thanjavur-palace-hotel',
    name: 'Royal Palace Hotel',
    type: 'Heritage Hotel',
    location: 'Thanjavur',
    rating: 4.6,
    price: 2800,
    image: '🏰',
    amenities: ['Heritage Architecture', 'Royal Dining', 'Museum', 'WiFi'],
    description: 'Stay in a hotel inspired by Thanjavur\'s royal heritage'
  },
  {
    id: 'thanjavur-artisan-homestay',
    name: 'Artisan Homestay',
    type: 'Homestay',
    location: 'Thanjavur',
    rating: 4.5,
    price: 1600,
    image: '🎨',
    amenities: ['Art Studio', 'Painting Classes', 'Local Art', 'WiFi'],
    description: 'Creative homestay with local artists and painting workshops'
  },
  {
    id: 'hotel-tamilnadu-chennai',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Chennai',
    rating: 4.4,
    price: 2500,
    image: '🏛️',
    amenities: ['Government Certified', 'Central Location', 'Conference Rooms', 'WiFi', 'Restaurant'],
    description: 'Official Tamil Nadu government hotel with modern amenities and cultural authenticity'
  },
  {
    id: 'hotel-tamilnadu-madurai',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Madurai',
    rating: 4.5,
    price: 2300,
    image: '🏛️',
    amenities: ['Government Certified', 'Temple Proximity', 'Cultural Events', 'WiFi', 'Restaurant'],
    description: 'Tamil Nadu government hotel near Meenakshi Temple with traditional hospitality'
  },
  {
    id: 'hotel-tamilnadu-ooty',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Ooty',
    rating: 4.3,
    price: 2700,
    image: '🏛️',
    amenities: ['Government Certified', 'Hill Station Views', 'Eco-friendly', 'WiFi', 'Restaurant'],
    description: 'Sustainable Tamil Nadu government hotel showcasing eco-tourism in the hills'
  },
  {
    id: 'hotel-tamilnadu-kodaikanal',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Kodaikanal',
    rating: 4.4,
    price: 2600,
    image: '🏛️',
    amenities: ['Government Certified', 'Lake Views', 'Nature Trails', 'WiFi', 'Restaurant'],
    description: 'Tamil Nadu government hotel offering comfort amidst Kodaikanal\'s natural beauty'
  },
  {
    id: 'hotel-tamilnadu-thanjavur',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Thanjavur',
    rating: 4.5,
    price: 2400,
    image: '🏛️',
    amenities: ['Government Certified', 'Heritage Location', 'Cultural Events', 'WiFi', 'Restaurant'],
    description: 'Government hotel in the cultural capital of Thanjavur with royal heritage ambiance'
  },
  {
    id: 'hotel-tamilnadu-kanyakumari',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Kanyakumari',
    rating: 4.6,
    price: 2800,
    image: '🏛️',
    amenities: ['Government Certified', 'Ocean Views', 'Sunrise Point Access', 'WiFi', 'Restaurant'],
    description: 'Strategic location near Vivekananda Rock with authentic Tamil Nadu hospitality'
  },
  {
    id: 'hotel-tamilnadu-rameswaram',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Rameswaram',
    rating: 4.7,
    price: 2200,
    image: '🏛️',
    amenities: ['Government Certified', 'Temple Proximity', 'Pilgrimage Support', 'WiFi', 'Restaurant'],
    description: 'Sacred stay near Ramanathaswamy Temple with traditional South Indian hospitality'
  },
  {
    id: 'hotel-tamilnadu-kanchipuram',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Kanchipuram',
    rating: 4.4,
    price: 2300,
    image: '🏛️',
    amenities: ['Government Certified', 'Temple City Location', 'Silk Heritage', 'WiFi', 'Restaurant'],
    description: 'Government hotel in the temple city showcasing Kanchipuram\'s rich cultural heritage'
  },
  {
    id: 'rameswaram-pilgrim-homestay',
    name: 'Sacred Pilgrim Homestay',
    type: 'Homestay',
    location: 'Rameswaram',
    rating: 4.5,
    price: 1400,
    image: '🏠',
    amenities: ['Temple Proximity', 'Pilgrim Guidance', 'Traditional Meals', 'WiFi'],
    description: 'Authentic homestay experience for pilgrims visiting the sacred island'
  },
  {
    id: 'rameswaram-sea-view-resort',
    name: 'Island Sea View Resort',
    type: 'Resort',
    location: 'Rameswaram',
    rating: 4.3,
    price: 2600,
    image: '🏖️',
    amenities: ['Sea Views', 'Beach Access', 'Restaurant', 'Boat Tours', 'WiFi'],
    description: 'Modern resort with panoramic views of the Gulf of Mannar and Palk Bay'
  },
  {
    id: 'kanchipuram-silk-weaver-homestay',
    name: 'Silk Weaver Homestay',
    type: 'Homestay',
    location: 'Kanchipuram',
    rating: 4.6,
    price: 1700,
    image: '🧵',
    amenities: ['Silk Weaving Demos', 'Temple Visits', 'Traditional Cuisine', 'WiFi'],
    description: 'Stay with local silk weavers and experience Kanchipuram\'s textile heritage firsthand'
  },
  {
    id: 'kanchipuram-temple-view-hotel',
    name: 'Temple Heritage Hotel',
    type: 'Hotel',
    location: 'Kanchipuram',
    rating: 4.4,
    price: 2100,
    image: '🏨',
    amenities: ['Temple Views', 'Heritage Architecture', 'Cultural Programs', 'WiFi', 'Restaurant'],
    description: 'Hotel showcasing the architectural splendor of Kanchipuram\'s ancient temples'
  },
  {
    id: 'hotel-tamilnadu-srivilliputhur',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Srivilliputhur',
    rating: 4.3,
    price: 2000,
    image: '🏛️',
    amenities: ['Government Certified', 'Temple Proximity', 'Cultural Events', 'WiFi', 'Restaurant'],
    description: 'Government hotel near the famous Andal Temple with traditional Tamil Nadu hospitality'
  },
  {
    id: 'srivilliputhur-temple-homestay',
    name: 'Temple View Homestay',
    type: 'Homestay',
    location: 'Srivilliputhur',
    rating: 4.5,
    price: 1200,
    image: '🏠',
    amenities: ['Temple Views', 'Traditional Meals', 'Cultural Programs', 'WiFi'],
    description: 'Authentic homestay experience near the Andal Temple with local hospitality'
  },
  {
    id: 'hotel-tamilnadu-palani',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Palani',
    rating: 4.4,
    price: 2200,
    image: '🏛️',
    amenities: ['Government Certified', 'Hill Views', 'Pilgrimage Support', 'WiFi', 'Restaurant'],
    description: 'Government hotel at the base of Palani Hills offering comfort for pilgrims'
  },
  {
    id: 'palani-pilgrim-homestay',
    name: 'Pilgrim Homestay',
    type: 'Homestay',
    location: 'Palani',
    rating: 4.6,
    price: 1400,
    image: '🏔️',
    amenities: ['Hill Views', 'Pilgrim Guidance', 'Traditional Food', 'Bonfire'],
    description: 'Comfortable homestay for pilgrims visiting the Dhandayuthapani Temple'
  },
  {
    id: 'hotel-tamilnadu-kolli-hills',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Kolli Hills',
    rating: 4.2,
    price: 2400,
    image: '🏛️',
    amenities: ['Government Certified', 'Mountain Views', 'Eco-friendly', 'WiFi', 'Restaurant'],
    description: 'Sustainable government hotel in the scenic Kolli Hills with nature-focused amenities'
  },
  {
    id: 'kolli-hills-mountain-resort',
    name: 'Mountain View Resort',
    type: 'Resort',
    location: 'Kolli Hills',
    rating: 4.3,
    price: 2800,
    image: '🏞️',
    amenities: ['Mountain Views', 'Trekking Support', 'Organic Food', 'Spa', 'WiFi'],
    description: 'Luxury resort nestled in the Kolli Hills offering adventure and relaxation'
  },
  {
    id: 'hotel-tamilnadu-mahabalipuram',
    name: 'Hotel TamilNadu',
    type: 'Government Hotel',
    location: 'Mahabalipuram',
    rating: 4.5,
    price: 2500,
    image: '🏛️',
    amenities: ['Government Certified', 'Beach Proximity', 'Heritage Site Access', 'WiFi', 'Restaurant'],
    description: 'Tamil Nadu government hotel near UNESCO World Heritage sites with cultural authenticity'
  },
  {
    id: 'mahabalipuram-beach-resort',
    name: 'Shore Temple View Resort',
    type: 'Resort',
    location: 'Mahabalipuram',
    rating: 4.4,
    price: 3200,
    image: '🏖️',
    amenities: ['Temple Views', 'Beach Access', 'Spa', 'Restaurant', 'Cultural Tours'],
    description: 'Luxury resort with stunning views of the Shore Temple and Bay of Bengal'
  },
  {
    id: 'mahabalipuram-heritage-homestay',
    name: 'Heritage Stone House',
    type: 'Homestay',
    location: 'Mahabalipuram',
    rating: 4.6,
    price: 1800,
    image: '🏠',
    amenities: ['Heritage Architecture', 'Local Cuisine', 'Artisan Workshops', 'WiFi'],
    description: 'Traditional stone house homestay showcasing Pallava architecture and local culture'
  }
];

const mockDestinations = [
  {
    id: 'ooty',
    name: 'Ooty',
    description: 'Queen of Hill Stations with misty mountains, tea plantations, and colonial charm.',
    district: 'Nilgiris',
    category: 'hill-station',
    rating: 4.7,
    visitorCount: 2500000,
    image: '🏔️',
    bestTime: 'October to May',
    entryFee: '₹50-200',
    price: 2500,
    highlights: ['Tea plantations', 'Botanical gardens', 'Lake boating', 'Mountain views']
  },
  {
    id: 'kanchipuram',
    name: 'Kanchipuram',
    description: 'Temple city famous for silk sarees, ancient temples, and Dravidian architecture.',
    district: 'Kanchipuram',
    category: 'heritage',
    rating: 4.5,
    visitorCount: 1800000,
    image: '🕉️',
    bestTime: 'October to March',
    entryFee: '₹50-100',
    price: 1800,
    highlights: ['Silk weaving', 'Ancient temples', 'Architecture', 'Cultural heritage']
  },
  {
    id: 'madurai',
    name: 'Madurai',
    description: 'Temple city with the magnificent Meenakshi Temple and rich cultural heritage.',
    district: 'Madurai',
    category: 'heritage',
    rating: 4.6,
    visitorCount: 3200000,
    image: '🏛️',
    bestTime: 'October to March',
    entryFee: '₹100-200',
    price: 2200,
    highlights: ['Meenakshi Temple', 'Cultural festivals', 'Street food', 'Architecture']
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    description: 'Princess of Hill Stations with lakes, waterfalls, and cool climate.',
    district: 'Dindigul',
    category: 'hill-station',
    rating: 4.4,
    visitorCount: 2200000,
    image: '🏞️',
    bestTime: 'October to May',
    entryFee: '₹50-150',
    price: 2300,
    highlights: ['Kodaikanal Lake', 'Waterfalls', 'Hiking trails', 'Cool climate']
  },
  {
    id: 'rameswaram',
    name: 'Rameswaram',
    description: 'Sacred island town known for Ramanathaswamy Temple and pilgrimage significance.',
    district: 'Ramanathapuram',
    category: 'pilgrimage',
    rating: 4.8,
    visitorCount: 1500000,
    image: '🌊',
    bestTime: 'October to April',
    entryFee: '₹50-100',
    price: 1500,
    highlights: ['Ramanathaswamy Temple', 'Adam\'s Bridge', 'Pilgrimage', 'Sea views']
  },
  {
    id: 'chennai',
    name: 'Chennai',
    description: 'Capital city with rich history, beautiful beaches, and cultural landmarks.',
    district: 'Chennai',
    category: 'city',
    rating: 4.3,
    visitorCount: 4500000,
    image: '🌆',
    bestTime: 'December to February',
    entryFee: '₹50-200',
    price: 2000,
    highlights: ['Marina Beach', 'Fort St. George', 'Museums', 'Street food']
  },
  {
    id: 'thanjavur',
    name: 'Thanjavur',
    description: 'Cultural capital known for temples, music, and the famous Thanjavur paintings.',
    district: 'Thanjavur',
    category: 'heritage',
    rating: 4.5,
    visitorCount: 1900000,
    image: '🎨',
    bestTime: 'October to March',
    entryFee: '₹50-150',
    price: 1900,
    highlights: ['Brihadeeswarar Temple', 'Paintings', 'Music heritage', 'Architecture']
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram',
    description: 'UNESCO World Heritage site famous for rock-cut temples and shore temples.',
    district: 'Chengalpattu',
    category: 'heritage',
    rating: 4.7,
    visitorCount: 2800000,
    image: '🗿',
    bestTime: 'November to February',
    entryFee: '₹100-300',
    price: 2500,
    highlights: ['Shore Temple', 'Rock-cut caves', 'UNESCO site', 'Beach views']
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    description: 'Southernmost tip of India where three seas meet, with stunning sunrise/sunset views.',
    district: 'Kanyakumari',
    category: 'nature',
    rating: 4.6,
    visitorCount: 2100000,
    image: '🌅',
    bestTime: 'October to March',
    entryFee: '₹50-100',
    price: 2000,
    highlights: ['Vivekananda Rock', 'Sunrise/Sunset', 'Three seas meet', 'Lighthouse']
  },
  {
    id: 'srivilliputhur',
    name: 'Srivilliputhur',
    description: 'Famous for the Andal Temple, one of the 108 Divya Desams dedicated to Lord Vishnu.',
    district: 'Virudhunagar',
    category: 'heritage',
    rating: 4.4,
    visitorCount: 800000,
    image: '🕉️',
    bestTime: 'October to March',
    entryFee: '₹50-100',
    price: 1500,
    highlights: ['Andal Temple', 'Musical pillars', 'Divya Desam', 'Temple architecture']
  },
  {
    id: 'palani',
    name: 'Palani',
    description: 'Home to the famous Dhandayuthapani Swamy Temple on Palani Hills.',
    district: 'Dindigul',
    category: 'pilgrimage',
    rating: 4.5,
    visitorCount: 1200000,
    image: '🏔️',
    bestTime: 'September to March',
    entryFee: '₹50-200',
    price: 1800,
    highlights: ['Dhandayuthapani Temple', 'Palani Hills', 'Pilgrimage', 'Festivals']
  },
  {
    id: 'kolli-hills',
    name: 'Kolli Hills',
    description: 'Scenic hill station known for medicinal herbs, waterfalls, and tribal culture.',
    district: 'Namakkal',
    category: 'hill-station',
    rating: 4.3,
    visitorCount: 500000,
    image: '🏞️',
    bestTime: 'October to May',
    entryFee: '₹50-100',
    price: 2000,
    highlights: ['Waterfalls', 'Trekking', 'Medicinal plants', 'Tribal culture']
  }
];

function BookPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get('id');
  const itemType = searchParams.get('type'); // 'experience' or 'destination'
  const darshanType = searchParams.get('darshan'); // for temple darshan bookings
  const destinationParam = searchParams.get('destination'); // for destination filtering

  const [bookingForm, setBookingForm] = useState({
    date: '',
    endDate: '',
    participants: 1,
    specialRequests: '',
    touristName: '',
    touristEmail: '',
    touristPhone: '',
    touristAddress: '',
    startingPlace: '',
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [relatedExperiences, setRelatedExperiences] = useState<any[]>([]);
  const [selectedDarshan, setSelectedDarshan] = useState<any>(null);
  const [additionalExperiences, setAdditionalExperiences] = useState<any[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState<any>({});
  const [selectedAccommodation, setSelectedAccommodation] = useState<any>(null);
  const [availableAccommodations, setAvailableAccommodations] = useState<any[]>([]);

  const addExperience = (experience: any) => {
    if (!additionalExperiences.find(exp => exp.id === experience.id)) {
      setAdditionalExperiences([...additionalExperiences, experience]);
      setSuccessMessage(`${experience.title} added to your booking!`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const removeExperience = (experienceId: string) => {
    setAdditionalExperiences(additionalExperiences.filter(exp => exp.id !== experienceId));
  };

  const validateForm = () => {
    const errors: any = {};

    if (!bookingForm.touristName.trim()) errors.touristName = 'Name is required';
    if (!bookingForm.touristEmail.trim()) errors.touristEmail = 'Email is required';
    if (!bookingForm.touristPhone.trim()) errors.touristPhone = 'Phone number is required';
    if (!bookingForm.startingPlace.trim()) errors.startingPlace = 'Starting place is required';
    if (!bookingForm.date) errors.date = 'Travel date is required';
    if (bookingForm.participants < 1) errors.participants = 'At least 1 participant required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (bookingForm.touristEmail && !emailRegex.test(bookingForm.touristEmail)) {
      errors.touristEmail = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (bookingForm.touristPhone && !phoneRegex.test(bookingForm.touristPhone)) {
      errors.touristPhone = 'Please enter a valid 10-digit mobile number';
    }

    // Date validation
    if (bookingForm.date) {
      const selectedDate = new Date(bookingForm.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = 'Travel date cannot be in the past';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (itemId && itemType) {
      let item = null;
      if (itemType === 'experience') {
        item = mockExperiences.find(exp => exp.id === itemId);
      } else if (itemType === 'destination') {
        // Import destinationsData dynamically or use it directly
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
              { name: 'Special Archana', price: 500, duration: '1 hour' },
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
              { name: 'Special Archana', price: 400, duration: '1 hour' },
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
              { name: 'Special Archana', price: 250, duration: '1 hour' },
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
        item = destinationsData[itemId as keyof typeof destinationsData];
      }

      if (item) {
        setSelectedItem(item);

        // Handle darshan selection for destinations
        if (itemType === 'destination' && darshanType && (item as any).darshanOptions) {
          const darshanOption = (item as any).darshanOptions.find((d: any) =>
            d.name.toLowerCase().replace(' ', '-') === darshanType
          );
          if (darshanOption) {
            setSelectedDarshan(darshanOption);
          }
        }

        // Find related experiences based on location or category
        const related = mockExperiences.filter(exp => {
          if (itemType === 'experience') {
            const expItem = item as typeof mockExperiences[0];
            return exp.location === expItem.location && exp.id !== expItem.id;
          } else {
            const destItem = item as any; // Destination item from destinationsData
            return exp.location === destItem.name;
          }
        }).slice(0, 6); // Show more related experiences

        setRelatedExperiences(related);

        // Find available accommodations based on location
        const location = itemType === 'experience' ? (item as typeof mockExperiences[0]).location : (item as any).name;
        const accommodations = mockAccommodations.filter(acc => acc.location === location);
        // Sort to put Hotel TamilNadu first
        accommodations.sort((a, b) => {
          if (a.name === 'Hotel TamilNadu') return -1;
          if (b.name === 'Hotel TamilNadu') return 1;
          return 0;
        });
        setAvailableAccommodations(accommodations);
      }
    }
  }, [itemId, itemType, darshanType]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    // Navigate to confirmation page with booking data
    const bookingData = {
      item: selectedItem?.name || selectedItem?.title,
      type: itemType,
      date: bookingForm.date,
      endDate: bookingForm.endDate,
      participants: bookingForm.participants,
      touristName: bookingForm.touristName,
      touristEmail: bookingForm.touristEmail,
      touristPhone: bookingForm.touristPhone,
      touristAddress: bookingForm.touristAddress,
      startingPlace: bookingForm.startingPlace,
      specialRequests: bookingForm.specialRequests,
      additionalExperiences: additionalExperiences,
      selectedAccommodation: selectedAccommodation,
      selectedDarshan: selectedDarshan,
      itemType: itemType
    };

    // Store booking data in session storage for the confirm page
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    router.push('/book/confirm');
  };

  if (!selectedItem) {
    // Filter experiences based on destination parameter
    const destination = mockDestinations.find(dest => dest.id === destinationParam);
    const filteredExperiences = destinationParam && destination
      ? mockExperiences.filter(exp => exp.location === destination.name)
      : mockExperiences;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {destinationParam && destination
                ? `Experiences in ${destination.name}`
                : 'All Experiences in Tamil Nadu'
              }
            </h1>
            <p className="text-gray-600">
              {destinationParam && destination
                ? `Discover and book unique cultural experiences in ${destination.name}`
                : 'Discover and book unique cultural experiences across Tamil Nadu'
              }
            </p>
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredExperiences.map((experience) => (
              <div
                key={experience.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedItem(experience)}
              >
                <div className="h-40 bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center">
                  <span className="text-4xl">{experience.image}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {experience.location} • {experience.duration}
                  </p>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {experience.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">₹{experience.price}</span>
                    <span className="text-xs text-gray-500">⭐ {experience.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Accommodations Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Featured Accommodations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAccommodations
                .filter(accommodation =>
                  destinationParam && destination
                    ? accommodation.location === destination.name
                    : true
                )
                .map((accommodation) => (
                <div
                  key={accommodation.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedItem(accommodation)}
                >
                  <div className="h-40 bg-gradient-to-r from-green-400 to-teal-600 flex items-center justify-center">
                    <span className="text-4xl">{accommodation.image}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {accommodation.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {accommodation.location} • {accommodation.type}
                    </p>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {accommodation.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-green-600">₹{accommodation.price}/night</span>
                      <span className="text-xs text-gray-500">⭐ {accommodation.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Enhanced Breadcrumb */}
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
              <Link href="/discover" className="text-slate-500 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <span>🗺️</span>
                <span>Discover</span>
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-800 font-semibold flex items-center space-x-1">
              <span>🎫</span>
              <span>Book {selectedItem?.name || selectedItem?.title}</span>
            </li>
          </ol>
        </nav>

        {/* Enhanced Success Message */}
        {showSuccessMessage && (
          <div className="mb-8 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                ✓
              </div>
              <div className="flex-1">
                <p className="text-emerald-800 font-bold text-lg">{successMessage}</p>
                <p className="text-emerald-600 text-sm mt-1">Your booking has been confirmed successfully!</p>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="text-emerald-500 hover:text-emerald-700 text-2xl hover:bg-emerald-100 rounded-xl p-2 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className={`text-4xl w-16 h-16 rounded-full ${itemType === 'experience' ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-blue-400 to-blue-600'} flex items-center justify-center text-white font-bold`}>
                  {itemType === 'experience' ? (selectedItem?.title?.charAt(0) || 'E') : selectedItem?.image}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Book {selectedItem?.name || selectedItem?.title}
                  </h1>
                  <p className="text-gray-600 mb-2">{selectedItem?.location || selectedItem?.district}</p>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-yellow-500">
                      ⭐ {selectedItem?.rating}
                    </span>
                    {selectedItem?.price && itemType === 'experience' && (
                      <span className="text-lg font-semibold text-green-600">
                        ₹{selectedItem.price.toLocaleString()}
                      </span>
                    )}
                    {selectedItem?.price && itemType === 'destination' && availableAccommodations.length > 0 && (
                      <span className="text-sm text-gray-600">
                        Starts from ₹{Math.min(...availableAccommodations.map(acc => acc.price)).toLocaleString()}
                      </span>
                    )}
                    {selectedItem?.duration && (
                      <span className="text-gray-600">⏱️ {selectedItem.duration}</span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{selectedItem?.description}</p>

              {/* Highlights */}
              {selectedItem?.highlights && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedItem.highlights.map((highlight: any, index: number) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">{highlight.icon || '✓'}</span>
                        <div>
                          <span className="font-medium">{highlight.name}</span>
                          {highlight.desc && <span className="text-gray-500"> - {highlight.desc}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included */}
              {selectedItem?.includes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedItem.includes.map((item: string, index: number) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <span className="text-blue-500 mr-2">•</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Booking Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl mb-4">
                  <span className="text-4xl">🎫</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                  Complete Your Booking
                </h2>
                <p className="text-slate-600">Secure your spot for this amazing experience</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-8">
                {/* Enhanced Trip Details */}
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <span className="text-blue-600 text-lg">📅</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Trip Details</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                            formErrors.date ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      {formErrors.date && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={bookingForm.endDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, endDate: e.target.value })}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Participants *</label>
                      <select
                        required
                        value={bookingForm.participants}
                        onChange={(e) => setBookingForm({ ...bookingForm, participants: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                        ))}
                      </select>
                    </div>
                    {selectedDarshan && (
                      <div className="md:col-span-2 bg-orange-50 p-3 rounded-md border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-1">Selected Darshan</h4>
                        <p className="text-sm text-orange-700">{selectedDarshan.name} - ₹{selectedDarshan.price} per person</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Darshan Options for Destinations */}
                {itemType === 'destination' && selectedItem && (selectedItem as any).darshanOptions && (
                  <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-orange-100 rounded-xl">
                        <span className="text-orange-600 text-lg">🙏</span>
                      </div>
                      <h3 className="text-xl font-bold text-orange-800">Temple Darshan Options</h3>
                    </div>
                    <p className="text-orange-700 mb-6">Choose your preferred darshan experience</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      {(selectedItem as any).darshanOptions.map((option: any, index: number) => (
                        <div
                          key={index}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedDarshan?.name === option.name
                              ? 'border-orange-500 bg-orange-100 shadow-md'
                              : 'border-orange-200 hover:border-orange-300 hover:bg-orange-50'
                          }`}
                          onClick={() => setSelectedDarshan(option)}
                        >
                          <h4 className="font-semibold text-gray-900 mb-2">{option.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{option.duration}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-green-600">₹{option.price}</span>
                            {selectedDarshan?.name === option.name && (
                              <span className="text-orange-600 font-medium text-sm">✓ Selected</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tourist Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Tourist Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={bookingForm.touristName}
                        onChange={(e) => setBookingForm({ ...bookingForm, touristName: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.touristName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.touristName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.touristName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={bookingForm.touristEmail}
                        onChange={(e) => setBookingForm({ ...bookingForm, touristEmail: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.touristEmail ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      {formErrors.touristEmail && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.touristEmail}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.touristPhone}
                        onChange={(e) => setBookingForm({ ...bookingForm, touristPhone: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.touristPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+91 XXXXX XXXXX"
                      />
                      {formErrors.touristPhone && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.touristPhone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={bookingForm.touristAddress}
                        onChange={(e) => setBookingForm({ ...bookingForm, touristAddress: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="City, State, Country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Starting Place *</label>
                      <input
                        type="text"
                        required
                        value={bookingForm.startingPlace}
                        onChange={(e) => setBookingForm({ ...bookingForm, startingPlace: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.startingPlace ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Chennai, Bangalore, Mumbai"
                      />
                      {formErrors.startingPlace && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.startingPlace}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Accommodation Selection */}
                {availableAccommodations.length > 0 && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200/40">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-emerald-100 rounded-xl">
                        <span className="text-emerald-600 text-lg">🏨</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Choose Accommodation (Optional)</h3>
                        <p className="text-slate-600 text-sm">Find the perfect place to stay during your Tamil Nadu adventure</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Select Your Stay</label>
                        <select
                          value={selectedAccommodation?.id || ''}
                          onChange={(e) => {
                            const accId = e.target.value;
                            const accommodation = availableAccommodations.find(acc => acc.id === accId);
                            setSelectedAccommodation(accommodation || null);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm"
                        >
                          <option value="">No accommodation needed</option>
                          {availableAccommodations.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                              {acc.name} - {acc.type} - ₹{acc.price}/night ({acc.rating}⭐)
                              {acc.name.includes('Hotel TamilNadu') && ' 🏛️ [Government Certified]'}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedAccommodation && (
                        <div className={`p-5 rounded-2xl border shadow-lg ${
                          selectedAccommodation.name.includes('Hotel TamilNadu')
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                            : 'bg-white border-slate-200'
                        }`}>
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-2xl ${
                              selectedAccommodation.name.includes('Hotel TamilNadu')
                                ? 'bg-blue-100'
                                : 'bg-slate-100'
                            }`}>
                              <span className="text-2xl">{selectedAccommodation.image}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-bold text-slate-800 text-lg">{selectedAccommodation.name}</h4>
                                {selectedAccommodation.name.includes('Hotel TamilNadu') && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                                    🏛️ Government Hotel
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-600 mb-3">{selectedAccommodation.description}</p>
                              <div className="text-sm text-slate-600">
                                <span className="font-semibold">Amenities:</span> {selectedAccommodation.amenities.join(', ')}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                  <textarea
                    value={bookingForm.specialRequests}
                    onChange={(e) => setBookingForm({ ...bookingForm, specialRequests: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                  />
                </div>

                {/* Enhanced Submit Section */}
                <div className="pt-6 border-t border-slate-200">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200/60">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Book Your Experience?</h3>
                      <p className="text-slate-600">Secure your spot and create unforgettable memories in Tamil Nadu</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6">
                      <div className="flex justify-between items-center text-lg font-bold text-slate-800">
                        <span>Total Amount:</span>
                        <span className="text-2xl text-emerald-600">
                          {bookingForm.date ? (
                            `₹${(() => {
                              const mainPrice = selectedDarshan ? selectedDarshan.price : (itemType === 'experience' ? (selectedItem?.price || 0) : 0);
                              const additionalTotal = additionalExperiences.reduce((sum, exp) => sum + exp.price, 0);
                              let total = (mainPrice + additionalTotal) * bookingForm.participants;

                              // Add accommodation cost if selected
                              if (selectedAccommodation && bookingForm.date) {
                                if (bookingForm.endDate) {
                                  // Multi-night stay
                                  const startDate = new Date(bookingForm.date);
                                  const endDate = new Date(bookingForm.endDate);
                                  const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                                  if (nights > 0) {
                                    total += selectedAccommodation.price * nights;
                                  }
                                } else {
                                  // Single night stay (assume 1 night if only start date provided)
                                  total += selectedAccommodation.price * 1;
                                }
                              }

                              return total.toLocaleString();
                            })()}`
                          ) : (
                            <span className="text-gray-500 text-base">Select dates to see pricing</span>
                          )}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-600 hover:to-green-700 font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
                    >
                      <span>🎉</span>
                      <span>Confirm Booking</span>
                      <span>✨</span>
                    </button>

                    <div className="text-center mt-4 text-sm text-slate-500">
                      <p>🔒 Secure booking • 📧 Confirmation sent to email • 🎫 E-ticket provided</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Booking Summary & Related Experiences */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="text-sm">
                {/* Main Item Header */}
                <div className="pb-3 border-b">
                  <div className="font-medium text-gray-900">{selectedItem?.name || selectedItem?.title}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {itemType === 'destination' ? 'Destination booking' : (selectedItem?.duration || 'Custom')} • {bookingForm.participants} participants
                  </div>
                </div>

                {/* Additional Experiences */}
                {additionalExperiences.length > 0 && (
                  <div className="pt-3 border-b border-gray-100">
                    {additionalExperiences.map((exp) => (
                      <div key={exp.id} className="flex justify-between items-center mb-2 last:mb-0">
                        <div>
                          <span className="font-medium">{exp.title}</span>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="ml-2 text-red-500 hover:text-red-700 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        <span className="font-medium">₹{exp.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Accommodation */}
                {selectedAccommodation && (
                  <div className="pt-3 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{selectedAccommodation.name}</span>
                        <span className="text-xs text-gray-600 block">({selectedAccommodation.type})</span>
                      </div>
                      <span className="font-medium">
                        {bookingForm.date ? (
                          bookingForm.endDate ? (
                            // Show calculated multi-night cost
                            (() => {
                              const startDate = new Date(bookingForm.date);
                              const endDate = new Date(bookingForm.endDate);
                              const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                              return nights > 0 ? `₹${(selectedAccommodation.price * nights).toLocaleString()} (${nights} nights)` : `₹${selectedAccommodation.price}/night`;
                            })()
                          ) : (
                            // Show single night cost
                            `₹${selectedAccommodation.price} (1 night)`
                          )
                        ) : (
                          `₹${selectedAccommodation.price}/night`
                        )}
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-3">
                  <div className="flex justify-between mb-2">
                    <span>Participants:</span>
                    <span className="font-medium">{bookingForm.participants}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Start Date:</span>
                    <span className="font-medium">{bookingForm.date ? new Date(bookingForm.date).toLocaleDateString() : 'Not selected'}</span>
                  </div>
                  {bookingForm.endDate && (
                    <div className="flex justify-between mb-2">
                      <span>End Date:</span>
                      <span className="font-medium">{new Date(bookingForm.endDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t">
                    <span>Total Amount:</span>
                    <span className="text-green-600">
                      {bookingForm.date ? (
                        `₹${(() => {
                          // For destinations, only accommodation + additional experiences
                          // For experiences, include base price + additional experiences
                          const basePrice = selectedDarshan ? selectedDarshan.price : (itemType === 'experience' ? (selectedItem?.price || 0) : 0);
                          const additionalTotal = additionalExperiences.reduce((sum, exp) => sum + exp.price, 0);
                          let total = (basePrice + additionalTotal) * bookingForm.participants;

                          // Add accommodation cost if selected
                          if (selectedAccommodation && bookingForm.date) {
                            if (bookingForm.endDate) {
                              // Multi-night stay
                              const startDate = new Date(bookingForm.date);
                              const endDate = new Date(bookingForm.endDate);
                              const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                              if (nights > 0) {
                                total += selectedAccommodation.price * nights;
                              }
                            } else {
                              // Single night stay (assume 1 night if only start date provided)
                              total += selectedAccommodation.price * 1;
                            }
                          }

                          return total.toLocaleString();
                        })()}`
                      ) : (
                        <span className="text-gray-500 text-sm">Select dates to see pricing</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Experiences */}
            {relatedExperiences.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Related Experiences</h3>
                <div className="space-y-4">
                  {relatedExperiences.map((experience) => (
                    <div key={experience.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{experience.image}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{experience.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{experience.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-yellow-500 text-sm">⭐ {experience.rating}</span>
                              <span className="text-green-600 font-semibold">₹{experience.price}</span>
                            </div>
                            <button
                              onClick={() => addExperience(experience)}
                              disabled={additionalExperiences.some(exp => exp.id === experience.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                              {additionalExperiences.some(exp => exp.id === experience.id) ? 'Added ✓' : 'Add +'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BookPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-lg">Loading...</div></div>}>
      <BookPage />
    </Suspense>
  );
}

export default BookPageWrapper;