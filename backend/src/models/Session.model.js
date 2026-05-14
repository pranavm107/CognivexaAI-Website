import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    organizationId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
    },
    token: String,
    refreshToken: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },
    ipAddress: String,
    userAgent: String,
    device: {
      browser: String,
      os: String,
      type: String,
    },
    location: {
      city: String,
      country: String,
      coordinates: [Number],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;
