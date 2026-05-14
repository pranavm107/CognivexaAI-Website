import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    stage: { 
      type: String, 
      enum: ['lead', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost'], 
      default: 'lead' 
    },
    value: { type: Number, default: 0 },
    expectedCloseDate: { type: Date },
    probability: { type: Number, min: 0, max: 100, default: 10 },
    
    client: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client' },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    
    notes: [{
      text: String,
      author: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }],
    
    source: { type: String, default: 'inbound' },
    lossReason: { type: String }
  },
  {
    timestamps: true,
  }
);

const Opportunity = mongoose.models.Opportunity || mongoose.model('Opportunity', opportunitySchema);

export default Opportunity;
