import mongoose from 'mongoose';

const pricingPlanSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PricingCategory",
      required: true
    },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    badge: { type: String, default: "" },
    priceText: { type: String, required: true },
    timeline: { type: String, default: "" },
    features: [{ type: String }],
    ctaText: { type: String, default: "Get Started" },
    ctaLink: { type: String, default: "/contact" },
    isPopular: { type: Boolean, default: false },
    theme: { type: String, default: "purple" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const PricingPlan = mongoose.models.PricingPlan || mongoose.model('PricingPlan', pricingPlanSchema);

export default PricingPlan;
