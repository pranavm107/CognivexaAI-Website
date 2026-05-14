import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    actorId: {
      type: mongoose.SchemaTypes.ObjectId,
      refPath: 'actorModel',
      index: true,
    },
    actorModel: {
      type: String,
      enum: ['User'],
      default: 'User'
    },
    action: {
      type: String,
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      required: true,
      index: true,
    },
    entityId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    clientId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
      index: true,
    },
    details: {
      previousValues: { type: Object },
      newValues: { type: Object },
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;
