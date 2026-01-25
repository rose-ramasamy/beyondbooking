import mongoose from 'mongoose';

export interface IBooking extends mongoose.Document {
  tourist: mongoose.Types.ObjectId;
  experience: mongoose.Types.ObjectId;
  date: Date;
  participants: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new mongoose.Schema<IBooking>({
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  participants: {
    type: Number,
    required: true,
    min: 1,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending',
  },
  specialRequests: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);