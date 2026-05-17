import mongoose from 'mongoose';

const processStepSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    stepNumber: { type: String, required: true },
    icon: { type: String }, // Lucide icon name
    color: { type: String }, // Tailwind classes or Hex
    type: { type: String, enum: ['how-it-works', 'our-process'], default: 'how-it-works' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const ProcessStep = mongoose.models.ProcessStep || mongoose.model('ProcessStep', processStepSchema);
export default ProcessStep;
