import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['project', 'invoice', 'security', 'support', 'workflow', 'approval', 'milestone', 'system'], 
      default: 'system' 
    },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
    
    link: { type: String }, // Deep link to specific UI view
    metadata: { type: Object }
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

export default Notification;
