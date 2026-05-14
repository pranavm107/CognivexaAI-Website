import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema(
  {
    contractNumber: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    client: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client', required: true },
    
    type: { type: String, enum: ['MSA', 'SOW', 'SLA', 'NDA'], default: 'SOW' },
    status: { type: String, enum: ['draft', 'pending_approval', 'active', 'expired', 'terminated'], default: 'draft' },
    
    value: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    renewalDate: { type: Date },
    
    attachments: [{
      name: String,
      url: String,
      version: Number
    }],
    
    terms: { type: String },
    isAutoRenew: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const Contract = mongoose.models.Contract || mongoose.model('Contract', contractSchema);

export default Contract;
