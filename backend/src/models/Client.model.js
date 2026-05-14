import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    industry: {
      type: String,
      trim: true,
    },
    contactPerson: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
    billingInfo: {
      address: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
      taxId: String,
    },
    companySize: { type: String, enum: ['1-10', '11-50', '51-200', '201-500', '500+'], default: '1-10' },
    subscriptionPlan: { type: String, enum: ['basic', 'growth', 'enterprise', 'custom'], default: 'basic' },
    billingStatus: { type: String, enum: ['active', 'past_due', 'unpaid', 'trialing'], default: 'trialing' },
    onboardingStatus: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    assignedAccountManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contractValue: { type: Number, default: 0 },
    lifecycleStage: { type: String, enum: ['prospect', 'onboarding', 'active', 'at_risk', 'churned'], default: 'prospect' },
    tags: [String],
    branding: {
      primaryColor: { type: String, default: '#6366f1' }, // Indigo-600
      secondaryColor: { type: String, default: '#0f172a' }, // Slate-900
      accentColor: { type: String, default: '#ec4899' }, // Pink-500
      favicon: { type: String },
      customDomain: { type: String },
      theme: { type: String, enum: ['light', 'dark', 'system', 'enterprise_luxury'], default: 'light' },
      fontFamily: { type: String, default: 'Inter' }
    },
    limits: {
      maxUsers: { type: Number, default: 5 },
      maxProjects: { type: Number, default: 10 },
      storageLimitGB: { type: Number, default: 5 },
      apiAccess: { type: Boolean, default: false }
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

export default Client;
