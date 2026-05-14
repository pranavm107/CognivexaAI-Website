import mongoose from 'mongoose';

const projectRequestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String },
    estimatedBudget: { type: Number },
    timeline: { type: String },
    urgency: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    requirements: { type: String },
    
    client: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client', required: true },
    requestedBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'qualified', 'proposal_sent', 'approved', 'rejected', 'converted'],
      default: 'submitted'
    },
    
    reviewTeam: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    complexity: { type: Number, min: 1, max: 10 }, // 1-10 scale
    
    attachments: [{
      name: String,
      url: String
    }],
    
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const ProjectRequest = mongoose.models.ProjectRequest || mongoose.model('ProjectRequest', projectRequestSchema);

export default ProjectRequest;
