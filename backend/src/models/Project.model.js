import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    budget: { type: Number, default: 0 },
    spentBudget: { type: Number, default: 0 },
    priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    currentPhase: { type: String, default: 'Discovery' },
    tags: [String],
    client: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client', required: true },
    assignedTeam: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    
    status: {
      type: String,
      enum: ['discovery', 'design', 'development', 'testing', 'deployment', 'completed', 'on_hold'],
      default: 'discovery'
    },
    
    healthScore: { type: Number, default: 100, min: 0, max: 100 },
    riskLevel: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'low' },
    
    progress: { type: Number, default: 0, min: 0, max: 100 },
    
    milestones: [{
      title: { type: String, required: true },
      description: { type: String },
      amount: { type: Number, default: 0 },
      dueDate: { type: Date },
      billingType: { type: String, enum: ['fixed', 'recurring', 'hourly', 'retainer', 'phase_based'], default: 'fixed' },
      status: { 
        type: String, 
        enum: ['planned', 'active', 'submitted', 'under_review', 'approved', 'invoiced', 'paid', 'delayed'], 
        default: 'planned' 
      },
      invoiceGenerated: { type: Boolean, default: false },
      invoiceId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Invoice' },
      completionPercentage: { type: Number, default: 0 },
      approvalRequired: { type: Boolean, default: true },
      completedAt: { type: Date },
      approvedAt: { type: Date },
      deliverables: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Deliverable' }],
      dependencies: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Task' }]
    }],
    
    files: [{
      name: { type: String, required: true },
      url: { type: String, required: true },
      type: { type: String },
      size: { type: Number },
      version: { type: Number, default: 1 },
      status: { type: String, enum: ['draft', 'pending_review', 'approved', 'revision_requested'], default: 'draft' },
      uploadedBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      history: [{
        url: { type: String },
        version: { type: Number },
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
      }],
      approvalDetails: {
        approvedAt: { type: Date },
        approvedBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
        feedback: { type: String }
      },
      createdAt: { type: Date, default: Date.now }
    }],
    
    updates: [{
      content: { type: String },
      author: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }],

    meetings: [{
      title: { type: String, required: true },
      date: { type: Date, required: true },
      link: { type: String },
      duration: { type: Number }, // in minutes
      summary: { type: String },
      status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }
    }],

    invoices: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Invoice' }],

    timeline: [{
      event: { type: String, required: true },
      description: { type: String },
      type: { type: String, enum: ['milestone', 'meeting', 'file', 'invoice', 'status_change', 'other'], default: 'other' },
      date: { type: Date, default: Date.now }
    }],

    deliverables: [{
      title: { type: String, required: true },
      description: { type: String },
      fileUrl: { type: String },
      status: { type: String, enum: ['pending', 'review', 'approved', 'rejected'], default: 'pending' },
      feedback: { type: String },
      dueDate: { type: Date }
    }],

    startDate: { type: Date },
    dueDate: { type: Date },
    
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
