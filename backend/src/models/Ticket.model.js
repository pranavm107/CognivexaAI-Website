import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    ticketId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: { 
      type: String, 
      enum: ['technical', 'billing', 'security', 'project', 'onboarding'], 
      default: 'technical' 
    },
    priority: { 
      type: String, 
      enum: ['low', 'medium', 'high', 'critical'], 
      default: 'medium' 
    },
    status: { 
      type: String, 
      enum: ['open', 'assigned', 'in_progress', 'waiting_client', 'escalated', 'resolved', 'archived'], 
      default: 'open' 
    },
    
    client: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client', required: true },
    requestedBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    assignedTo: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    
    project: { type: mongoose.SchemaTypes.ObjectId, ref: 'Project' },
    
    slaDeadline: { type: Date },
    isEscalated: { type: Boolean, default: false },
    escalationReason: { type: String },
    
    comments: [{
      author: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      text: String,
      isInternal: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }],
    
    metadata: { type: Map, of: String }
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

export default Ticket;
