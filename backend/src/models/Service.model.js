import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String },
    icon: { type: String, default: 'Globe' },
    iconColor: { type: String, default: 'text-blue-600' },
    backgroundColor: { type: String, default: 'bg-blue-50' },
    accentGradient: { type: String, default: 'from-blue-500 to-blue-400' },
    colorTheme: { type: String, default: 'blue' },
    category: { type: String, default: 'General' },
    offerings: [{ type: String }],
    technologies: [{ type: String }],
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    pricing: {
      starter: { type: String },
      growth: { type: String },
      enterprise: { type: String }
    },
    metrics: {
      projectsCompleted: { type: Number, default: 0 },
      automationRate: { type: String },
      avgDelivery: { type: String }
    },
    ctaText: { type: String, default: 'Explore Service' },
    seoTitle: { type: String },
    seoDescription: { type: String }
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;
