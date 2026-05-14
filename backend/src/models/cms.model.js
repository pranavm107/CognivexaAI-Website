import mongoose from 'mongoose';

import Service from './Service.model.js';

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  clientName: { type: String },
  industry: { type: String },
  description: { type: String },
  challenge: { type: String },
  solution: { type: String },
  results: { type: String },
  technologies: [String],
  metrics: [{ label: String, value: String }],
  images: [String],
  projectUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  completionDate: { type: Date },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const teamMemberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  bio: { type: String },
  skills: [String],
  linkedin: { type: String },
  github: { type: String },
  permissions: [String],
  activeStatus: { type: String, enum: ['online', 'offline', 'busy'], default: 'offline' },
  timezone: { type: String },
  joinedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

import Notification from './Notification.model.js';

const settingsSchema = new mongoose.Schema({
  general: {
    platformName: { type: String, default: 'CognivexaAI' },
    supportEmail: { type: String },
    timezone: { type: String, default: 'UTC' },
    companyAddress: { type: String },
    contactNumber: { type: String }
  },
  branding: {
    logo: { type: String },
    favicon: { type: String },
    accentColor: { type: String, default: '#6366f1' },
    typography: { type: String, default: 'Inter' }
  },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    ogImage: { type: String }
  },
  integrations: {
    openaiApiKey: { type: String },
    stripeKey: { type: String },
    slackWebhook: { type: String }
  }
}, { timestamps: true });

export { Service };
export const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export { Notification };
export const Settings = mongoose.model('Settings', settingsSchema);

const cmsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { 
    type: String, 
    enum: ['page', 'section', 'blog', 'case_study', 'testimonial', 'faq', 'service', 'portfolio'], 
    required: true 
  },
  content: { type: mongoose.Schema.Types.Mixed },
  excerpt: { type: String },
  featuredImage: { type: String },
  metadata: {
    title: String,
    description: String,
    keywords: String,
    ogImage: String
  },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'scheduled', 'archived'], 
    default: 'draft' 
  },
  version: { type: Number, default: 1 },
  publishedAt: { type: Date },
  scheduledAt: { type: Date },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  category: String,
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Add text search index for blogs and content
cmsSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

const CMS = mongoose.model('CMS', cmsSchema);

export default CMS;
