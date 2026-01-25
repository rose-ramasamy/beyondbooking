import mongoose from 'mongoose';

export interface IDestination extends mongoose.Document {
  name: string;
  description: string;
  location: string;
  district: string;
  category: string;
  images: string[];
  rating: number;
  visitorCount: number;
  bestTimeToVisit: string;
  createdAt: Date;
  updatedAt: Date;
}

const DestinationSchema = new mongoose.Schema<IDestination>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['heritage', 'nature', 'beach', 'hill', 'urban', 'rural'],
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
  visitorCount: {
    type: Number,
    default: 0,
  },
  bestTimeToVisit: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);