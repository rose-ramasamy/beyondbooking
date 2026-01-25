import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../lib/mongodb';
import Booking from '../../../models/Booking';
import Experience from '../../../models/Experience';
import { authOptions } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== 'tourist') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { experienceId, date, participants, specialRequests } = await request.json();

    if (!experienceId || !date || !participants) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if experience exists and has availability
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }

    // Check availability for the date
    const availability = experience.availability.find(
      (slot: any) => slot.date.toDateString() === new Date(date).toDateString()
    );

    if (!availability || availability.slots < participants) {
      return NextResponse.json(
        { error: 'Not enough slots available' },
        { status: 400 }
      );
    }

    // Calculate total amount
    const totalAmount = experience.price * participants;

    // Create booking
    const booking = await Booking.create({
      tourist: session.user.id,
      experience: experienceId,
      date: new Date(date),
      participants,
      totalAmount,
      specialRequests,
      status: 'confirmed', // For demo, auto-confirm
    });

    // Update availability
    availability.slots -= participants;
    await experience.save();

    return NextResponse.json({
      message: 'Booking created successfully',
      booking: {
        id: booking._id,
        date: booking.date,
        participants: booking.participants,
        totalAmount: booking.totalAmount,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const bookings = await Booking.find({
      tourist: session.user.id,
    })
      .populate('experience')
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}