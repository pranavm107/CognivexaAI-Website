import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema(
  {
    incidentId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['detected', 'acknowledged', 'investigating', 'mitigated', 'resolved'],
      default: 'detected',
    },
    department: {
      type: String,
      enum: ['Finance', 'HR', 'Support', 'Security', 'Delivery', 'Infrastructure'],
      required: true,
    },
    organizationId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
    },
    affectedServices: [String],
    linkedEntities: [
      {
        entityType: String,
        entityId: mongoose.SchemaTypes.ObjectId,
      },
    ],
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    resolvedAt: Date,
    postmortem: {
      rootCause: String,
      timeline: [
        {
          timestamp: Date,
          note: String,
        },
      ],
      correctiveActions: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Incident = mongoose.models.Incident || mongoose.model('Incident', incidentSchema);

export default Incident;
