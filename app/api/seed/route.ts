import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import Destination from '../../../models/Destination';
import Experience from '../../../models/Experience';

export async function POST() {
  try {
    await dbConnect();

    // Create demo users
    const hashedPassword = await bcrypt.hash('demo123', 12);

    const tourist = await User.findOneAndUpdate(
      { email: 'tourist@demo.com' },
      {
        name: 'Demo Tourist',
        email: 'tourist@demo.com',
        password: hashedPassword,
        role: 'tourist',
      },
      { upsert: true, new: true }
    );

    const operator = await User.findOneAndUpdate(
      { email: 'operator@demo.com' },
      {
        name: 'Demo Operator',
        email: 'operator@demo.com',
        password: hashedPassword,
        role: 'operator',
      },
      { upsert: true, new: true }
    );

    // Create demo destinations
    const mahabalipuram = await Destination.findOneAndUpdate(
      { name: 'Mahabalipuram' },
      {
        name: 'Mahabalipuram',
        description: 'Ancient UNESCO World Heritage site with rock-cut temples and shore temples.',
        location: 'Mahabalipuram, Tamil Nadu',
        district: 'Chengalpattu',
        category: 'heritage',
        rating: 4.5,
        visitorCount: 50000,
        bestTimeToVisit: 'October to March',
      },
      { upsert: true, new: true }
    );

    const ooty = await Destination.findOneAndUpdate(
      { name: 'Ooty' },
      {
        name: 'Ooty',
        description: 'Queen of hill stations with beautiful lakes, gardens, and colonial architecture.',
        location: 'Ooty, Tamil Nadu',
        district: 'Nilgiris',
        category: 'hill',
        rating: 4.3,
        visitorCount: 80000,
        bestTimeToVisit: 'April to June, September to November',
      },
      { upsert: true, new: true }
    );

    // Create demo experiences
    await Experience.findOneAndUpdate(
      { title: 'Traditional Tamil Cooking Class' },
      {
        title: 'Traditional Tamil Cooking Class',
        description: 'Learn to cook authentic Tamil dishes with local ingredients and traditional methods.',
        destination: mahabalipuram._id,
        operator: operator._id,
        category: 'food',
        price: 1500,
        duration: '3 hours',
        maxParticipants: 10,
        rating: 4.8,
        bookingCount: 45,
        availability: [
          { date: new Date('2024-02-01'), slots: 8 },
          { date: new Date('2024-02-02'), slots: 10 },
        ],
      },
      { upsert: true, new: true }
    );

    await Experience.findOneAndUpdate(
      { title: 'Heritage Temple Tour' },
      {
        title: 'Heritage Temple Tour',
        description: 'Guided tour of ancient temples with expert archaeologists and historians.',
        destination: mahabalipuram._id,
        operator: operator._id,
        category: 'heritage',
        price: 2000,
        duration: '4 hours',
        maxParticipants: 15,
        rating: 4.6,
        bookingCount: 32,
        availability: [
          { date: new Date('2024-02-01'), slots: 12 },
          { date: new Date('2024-02-02'), slots: 15 },
        ],
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      message: 'Demo data seeded successfully',
      users: { tourist: tourist.email, operator: operator.email },
      password: 'demo123'
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed data' },
      { status: 500 }
    );
  }
}