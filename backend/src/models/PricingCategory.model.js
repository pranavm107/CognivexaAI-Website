import mongoose from 'mongoose';

const pricingCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, default: "" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const PricingCategory = mongoose.models.PricingCategory || mongoose.model('PricingCategory', pricingCategorySchema);

export default PricingCategory;
