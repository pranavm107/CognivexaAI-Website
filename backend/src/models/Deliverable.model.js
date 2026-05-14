import mongoose from 'mongoose';

const deliverableSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    projectId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Project', required: true },
    clientId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client', required: true },
    
    fileUrl: { type: String },
    version: { type: Number, default: 1 },
    
    status: {
      type: String,
      enum: ['pending', 'under_review', 'revision_requested', 'approved', 'archived'],
      default: 'pending'
    },
    
    feedback: [{
      content: String,
      author: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }],
    
    dueDate: { type: Date },
    approvedAt: { type: Date },
    approvedBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const Deliverable = mongoose.models.Deliverable || mongoose.model('Deliverable', deliverableSchema);

export default Deliverable;
