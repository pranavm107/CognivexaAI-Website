import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    // Lead Info
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    
    // Inquiry Details
    subject: { type: String, required: true },
    message: { type: String, required: true },
    serviceOfInterest: { type: String, index: true },
    budget: { type: String },
    timeline: { type: String },
    source: { type: String, default: 'Website Form' }, // e.g., 'Website Form', 'Direct Email', 'Referral'
    
    // Status & Workflow
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'discovery_scheduled', 'proposal_sent', 'negotiation', 'converted', 'closed_lost', 'archived'],
      default: 'new',
      index: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
      index: true
    },
    assignedTo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      index: true
    },
    tags: [{ type: String, index: true }],
    
    // AI Intelligence
    aiIntelligence: {
      score: { type: Number, min: 0, max: 100 },
      urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
      summary: { type: String },
      sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: 'neutral' },
      conversionProbability: { type: Number },
      recommendedNextAction: { type: String },
    },
    
    // Operational Tracking
    notifications: {
      inquiryReceived: { type: Boolean, default: false },
      qualificationSent: { type: Boolean, default: false },
      proposalSent: { type: Boolean, default: false },
      statusUpdated: { type: Boolean, default: false },
      adminResponseSent: { type: Boolean, default: false },
    },
    
    lastEmailSentAt: { type: Date },
    emailHistory: [{
      subject: { type: String },
      sentAt: { type: Date, default: Date.now },
      type: { type: String }, // 'confirmation', 'status_update', 'proposal', 'note'
    }],

    internalNotes: [{
      content: { type: String, required: true },
      addedBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now },
      notifiedClient: { type: Boolean, default: false },
    }],
    
    activities: [{
      type: { type: String, required: true }, // e.g., 'status_change', 'note_added', 'assignment', 'proposal_sent'
      description: { type: String },
      performer: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      timestamp: { type: Date, default: Date.now },
      metadata: { type: Object },
    }],
    
    // Metadata
    metadata: {
      ipAddress: { type: String },
      userAgent: { type: String },
      referrer: { type: String },
      campaign: { type: String },
    },
    
    convertedAt: { type: Date },
    archivedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ 'aiIntelligence.score': -1 });

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
