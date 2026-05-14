import mongoose from 'mongoose';

const conceptProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    gradientTheme: { type: String, default: "purple" },
    previewType: { type: String, default: "dashboard" },
    badgeLabel: { type: String, default: "CONCEPT" },
    ctaText: { type: String, default: "Explore Concept" },
    ctaLink: { type: String, default: "/contact" },
    statusLabel: { type: String, default: "Coming Soon" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const ConceptProject = mongoose.models.ConceptProject || mongoose.model('ConceptProject', conceptProjectSchema);

export default ConceptProject;
