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
    },
    // Hero Section
    heroTitle: {
      type: String,
      default: ""
    },
    heroDescription: {
      type: String,
      default: ""
    },
    heroBadge: {
      type: String,
      default: "CONCEPT BUILD"
    },
    heroImage: {
      type: String,
      default: ""
    },
    heroButtonText: {
      type: String,
      default: "Inquire for Similar Solution"
    },
    // Production Status Card
    productionStatusTitle: {
      type: String,
      default: "Production Status"
    },
    productionStatusLabel: {
      type: String,
      default: "Battle-Ready"
    },
    productionStatusIcon: {
      type: String,
      default: "Zap"
    },
    productionStatusColor: {
      type: String,
      default: "green"
    },
    // Engineering Standards Section
    engineeringSectionTitle: {
      type: String,
      default: "Engineering Standards"
    },
    engineeringSectionDescription: {
      type: String,
      default: "Every build follows our core architectural principles."
    },
    // Engineering Cards Repeater Array
    engineeringCards: {
      type: [
        {
          icon: { type: String, default: "Zap" },
          title: { type: String, default: "" },
          description: { type: String, default: "" }
        }
      ],
      default: []
    },
    // Business CTA Section
    businessCtaTitle: {
      type: String,
      default: "Ready to see this in your business?"
    },
    businessCtaDescription: {
      type: String,
      default: "This concept represents our engineering quality. We can architect and deploy a custom version of this solution tailored to your data and operations."
    },
    businessCtaButtonText: {
      type: String,
      default: "Request Case Study & Quote"
    },
    // Inquiry Autofill Configuration
    contactService: {
      type: String,
      default: ""
    },
    contactBudget: {
      type: String,
      default: ""
    },
    contactTimeline: {
      type: String,
      default: ""
    },
    contactMessage: {
      type: String,
      default: ""
    },
    // Portfolio Metadata
    buildType: {
      type: String,
      default: ""
    },
    industry: {
      type: String,
      default: ""
    },
    deploymentType: {
      type: String,
      default: ""
    },
    architectureType: {
      type: String,
      default: ""
    },
    readinessLevel: {
      type: String,
      default: ""
    },
    // SEO
    metaTitle: {
      type: String,
      default: ""
    },
    metaDescription: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const ConceptBuild = mongoose.models.ConceptBuild || mongoose.model('ConceptBuild', conceptBuildSchema);

export default ConceptBuild;
