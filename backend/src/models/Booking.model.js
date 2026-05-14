import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, unique: true, index: true },
    inquiryReference: { type: mongoose.SchemaTypes.ObjectId, ref: 'Inquiry' },
    
    // Client Info
    clientName: { type: String, required: true, trim: true },
    clientEmail: { type: String, required: true, trim: true, lowercase: true, index: true },
    clientPhone: { type: String, trim: true },
    company: { type: String, trim: true },
    
    // Meeting Details
    serviceType: { type: String, index: true },
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },
    timezone: { type: String, default: 'Asia/Kolkata' },
    
    // Statuses
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'scheduled', 'in_progress', 'completed', 'cancelled', 'rescheduled', 'no_show'],
      default: 'confirmed',
      index: true
    },
    paymentStatus: {
      type: String,
      enum: ['none', 'pending', 'paid', 'refunded'],
      default: 'none'
    },
    
    // Integration Details
    googleEventId: { type: String },
    meetLink: { type: String },
    calendarSyncStatus: { type: String, enum: ['synced', 'failed', 'not_synced'], default: 'not_synced' },
    reminderSent: { type: Boolean, default: false },
    whatsappSent: { type: Boolean, default: false },
    
    // Notifications (New Requirement)
    notifications: {
      emailSent: { type: Boolean, default: false },
      whatsappSent: { type: Boolean, default: false },
      reminderScheduled: { type: Boolean, default: false },
      calendarSynced: { type: Boolean, default: false }
    },
    
    // Operations
    assignedAdmin: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', index: true },
    internalNotes: [{
      content: { type: String },
      addedBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now },
    }],
    
    // Activity Timeline (New Requirement)
    activityTimeline: [{
      type: { type: String },
      message: { type: String },
      timestamp: { type: Date, default: Date.now },
      actor: { type: String }
    }],
    
    activityLogs: [{
      action: { type: String },
      timestamp: { type: Date, default: Date.now },
      performer: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      metadata: { type: Object },
    }],
    
    // Admin Action Fields
    confirmedAt: { type: Date },
    cancelledAt: { type: Date },
    cancelledReason: { type: String },
    createdBy: { type: String, default: 'user' },
    isManualBooking: { type: Boolean, default: false },
    notes: { type: String },
    
    metadata: {
      source: { type: String, default: 'Direct' },
      ipAddress: { type: String },
      userAgent: { type: String },
    },
    
    isDeleted: { type: Boolean, default: false },
    
    // Legacy mapping support
    name: String,
    email: String,
    phone: String,
    service: String,
    date: String,
    time: String
  },
  {
    timestamps: true,
  }
);

// Auto-generate booking ID if not provided
bookingSchema.pre('validate', function(next) {
  if (!this.bookingId) {
    this.bookingId = 'BK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  
  // Legacy field mapping
  if (this.name && !this.clientName) this.clientName = this.name;
  if (this.email && !this.clientEmail) this.clientEmail = this.email;
  if (this.phone && !this.clientPhone) this.clientPhone = this.phone;
  if (this.service && !this.serviceType) this.serviceType = this.service;

  if (this.date && this.time && !this.startTime) {
    const start = new Date(`${this.date}T${this.time}:00`);
    this.startTime = start;
    if (!this.endTime) {
        const end = new Date(start.getTime() + 30 * 60000); // 30 minutes later
        this.endTime = end;
    }
  }

  next();
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
