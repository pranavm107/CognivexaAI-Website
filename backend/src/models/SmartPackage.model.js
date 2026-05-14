import mongoose from 'mongoose';

const smartPackageSchema = new mongoose.Schema(
  {
    title: { type: String, default: "SMART SYSTEM PACKAGE" },
    subtitle: { type: String, default: "" },
    tags: [{ type: String }],
    ctaText: { type: String, default: "Book a Strategy Call" },
    ctaLink: { type: String, default: "/contact" },
    pricingText: { type: String, default: "CUSTOM PRICING" },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const SmartPackage = mongoose.models.SmartPackage || mongoose.model('SmartPackage', smartPackageSchema);

export default SmartPackage;
