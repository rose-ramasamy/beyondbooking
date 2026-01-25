# Beyond Booking: Smart Digital Tourism Experience Platform for Tamil Nadu

A full-stack web application built with Next.js, Node.js, MongoDB, and AI-powered recommendations to transform Tamil Nadu's tourism ecosystem.

## Features

- **Tourist Experience**: Discover destinations, stays, and local experiences in one place
- **Personalized Itineraries**: AI-driven recommendations based on interests and preferences
- **Operator Dashboard**: Analytics and insights for tourism businesses
- **Experience-First Tourism**: Beyond bookings to complete travel journeys

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **AI**: Integrated AI for personalized recommendations

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (create `.env.local`):
   ```
   MONGODB_URI=mongodb://localhost:27017/tourism-platform
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Seed demo data:
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

- **Tourist**: tourist@demo.com / demo123
- **Operator**: operator@demo.com / demo123

## Project Structure

- `app/` - Next.js App Router pages and API routes
- `components/` - Reusable UI components
- `lib/` - Utility functions and database connections
- `models/` - MongoDB schemas

## Hackathon Impact

This PoC demonstrates:

- **Experience-First Tourism**: Shifting from booking-centric to experience-driven platform
- **AI Integration**: Mock AI recommendations and demand forecasting
- **Operator Empowerment**: Analytics dashboard for small tourism businesses
- **Inclusive Growth**: Supporting rural and cultural tourism initiatives
- **Scalable Architecture**: Full-stack solution ready for production deployment

## Contributing

This is a Proof of Concept for the TN Tourism Innovation Hackathon.
- `public/` - Static assets

## Contributing

This is a Proof of Concept for the TN Tourism Innovation Hackathon.

## License

MIT
