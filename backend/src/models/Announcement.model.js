import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ['maintenance', 'feature', 'milestone', 'billing', 'general'],
      default: 'general'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    targetAudience: {
      type: String,
      enum: ['all', 'clients', 'admins'],
      default: 'all'
    },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date },
    isPublished: { type: Boolean, default: false },
    readBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);

export default Announcement;
