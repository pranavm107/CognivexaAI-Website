import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    category: { type: String, enum: ['our-edge', 'why-choose-us', 'our-promise'], required: true },
    metadata: { type: mongoose.Schema.Types.Mixed }, // For tech tags, etc.
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Feature = mongoose.models.Feature || mongoose.model('Feature', featureSchema);
export default Feature;
