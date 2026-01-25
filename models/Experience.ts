import mongoose from 'mongoose';

export interface IExperience extends mongoose.Document {
  title: string;
  description: string;
  destination: mongoose.Types.ObjectId;
  operator: mongoose.Types.ObjectId;
  category: string;
  price: number;
  duration: string;
  maxParticipants: number;
  images: string[];
  rating: number;
  bookingCount: number;
  availability: {
    date: Date;
    slots: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new mongoose.Schema<IExperience>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['cultural', 'adventure', 'wellness', 'food', 'nature', 'heritage'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: String,
    required: true,
  },
  maxParticipants: {
    type: Number,
    required: true,
    min: 1,
  },
  images: [{
    type: String,
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  bookingCount: {
    type: Number,
    default: 0,
  },
  availability: [{
    date: {
      type: Date,
      required: true,
    },
    slots: {
      type: Number,
      required: true,
      min: 0,
    },
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);