import mongoose from 'mongoose';

const usageMetricsSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client', required: true },
    month: { type: String, required: true }, // YYYY-MM
    
    apiCalls: { type: Number, default: 0 },
    storageBytes: { type: Number, default: 0 },
    automationRuns: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    projectsCreated: { type: Number, default: 0 },
    
    lastUpdated: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  }
);

usageMetricsSchema.index({ organization: 1, month: 1 }, { unique: true });

const UsageMetrics = mongoose.models.UsageMetrics || mongoose.model('UsageMetrics', usageMetricsSchema);

export default UsageMetrics;
