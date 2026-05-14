import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    projectId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachments: [{
      name: String,
      url: String,
      type: String,
    }],
    readBy: [{
      user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      readAt: { type: Date, default: Date.now }
    }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
