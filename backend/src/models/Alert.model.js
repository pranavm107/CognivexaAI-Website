import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
      required: true,
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: ['Finance', 'Support', 'Security', 'Delivery', 'HR', 'Global'],
      default: 'Global',
    },
    status: {
      type: String,
      enum: ['active', 'investigating', 'resolved', 'archived'],
      default: 'active',
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    linkedEntity: {
      id: mongoose.SchemaTypes.ObjectId,
      type: { type: String }, // 'Ticket', 'Contract', 'Invoice', 'Project', etc.
    },
    resolutionNotes: String,
    resolvedAt: Date,
    escalationLevel: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Alert = mongoose.models.Alert || mongoose.model('Alert', alertSchema);

export default Alert;
