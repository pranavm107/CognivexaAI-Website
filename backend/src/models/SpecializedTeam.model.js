import mongoose from 'mongoose';

const specializedTeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    shortTitle: {
      type: String,
      default: ""
    },
    tagline: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "Cpu"
    },
    theme: {
      type: String,
      enum: ["purple", "blue", "teal", "pink", "orange", "green"],
      default: "purple"
    },
    expertiseAreas: [
      {
        type: String
      }
    ],
    workflowTags: [
      {
        type: String
      }
    ],
    teamRoles: [
      {
        title: String,
        description: String,
        order: Number
      }
    ],
    optionalHighlights: [
      {
        label: String,
        value: String
      }
    ],
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

const SpecializedTeam = mongoose.models.SpecializedTeam || mongoose.model('SpecializedTeam', specializedTeamSchema);

export default SpecializedTeam;
