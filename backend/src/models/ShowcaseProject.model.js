import mongoose from 'mongoose';

const showcaseProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortDescription: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    technologies: [{ type: String }],
    ctaText: { type: String, default: 'View Case Study' },
    ctaLink: { type: String, default: '#' },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const ShowcaseProject = mongoose.models.ShowcaseProject || mongoose.model('ShowcaseProject', showcaseProjectSchema);

export default ShowcaseProject;
