import mongoose from 'mongoose';

const portfolioProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortDescription: { type: String, required: true },
    category: { type: String, required: true },
    technologies: [{ type: String }],
    timeline: { type: String, default: "4-6 weeks" },
    ctaText: { type: String, default: "Request Solution" },
    ctaLink: { type: String, default: "/contact" },
    icon: { type: String, default: "Bot" },
    accentColor: { type: String, default: "purple" },
    gradientStyle: { type: String, default: "from-purple-500 to-indigo-500" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const PortfolioProject = mongoose.models.PortfolioProject || mongoose.model('PortfolioProject', portfolioProjectSchema);

export default PortfolioProject;
