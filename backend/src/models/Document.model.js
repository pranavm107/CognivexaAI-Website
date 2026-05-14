import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    documentId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['contract', 'proposal', 'invoice', 'report', 'technical', 'legal'],
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'review', 'approved', 'signed', 'archived'],
      default: 'draft',
    },
    organizationId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
      required: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    versions: [
      {
        versionNumber: Number,
        fileUrl: String,
        updatedBy: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'User',
        },
        changeLog: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    currentVersion: {
      type: Number,
      default: 1,
    },
    approvalChain: [
      {
        approverId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
        comment: String,
        updatedAt: Date,
      },
    ],
    isLocked: {
      type: Boolean,
      default: false,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.models.Document || mongoose.model('Document', documentSchema);

export default Document;
