import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
    }, // 'CREATE_PROJECT', 'RESOLVE_TICKET', 'SIGN_CONTRACT', etc.
    department: {
      type: String,
      enum: ['Finance', 'HR', 'Support', 'Security', 'Delivery', 'CRM', 'Global'],
      default: 'Global',
    },
    severity: {
      type: String,
      enum: ['info', 'warning', 'critical'],
      default: 'info',
    },
    metadata: {
      type: Map,
      of: mongoose.SchemaTypes.Mixed,
    },
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
