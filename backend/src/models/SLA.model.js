import mongoose from 'mongoose';

const slaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    client: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client', required: true },
    contract: { type: mongoose.SchemaTypes.ObjectId, ref: 'Contract' },
    
    tier: { type: String, enum: ['standard', 'premium', 'enterprise'], default: 'standard' },
    
    guarantees: {
      uptime: { type: Number, default: 99.9 }, // percentage
      responseTime: { type: Number, default: 4 }, // hours
      resolutionTime: { type: Number, default: 24 }, // hours
    },
    
    monitoring: {
      isBreached: { type: Boolean, default: false },
      lastIncidentAt: { type: Date },
      breachCount: { type: Number, default: 0 }
    },
    
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true,
  }
);

const SLA = mongoose.models.SLA || mongoose.model('SLA', slaSchema);

export default SLA;
