import mongoose from 'mongoose';

const conceptBuildSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    badge: {
      type: String,
      default: "CONCEPT BUILD"
    },
    description: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      required: true
    },
    statusTitle: {
      type: String,
      default: ""
    },
    statusSubtitle: {
      type: String,
      default: ""
    },
    ctaText: {
      type: String,
      default: "Explore This Build"
    },
    ctaLink: {
      type: String,
      default: "/portfolio"
    },
    alignment: {
      type: String,
      enum: ["left", "right"],
      default: "left"
    },
    featured: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const ConceptBuild = mongoose.models.ConceptBuild || mongoose.model('ConceptBuild', conceptBuildSchema);

export default ConceptBuild;
