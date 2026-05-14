import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    projectId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Project' },
    clientId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client', required: true },
    
    participants: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    organizer: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number }, // in minutes
    
    meetingType: { type: String, enum: ['discovery', 'sprint_planning', 'review', 'technical', 'general'], default: 'general' },
    status: { type: String, enum: ['scheduled', 'active', 'completed', 'cancelled'], default: 'scheduled' },
    
    location: { type: String }, // URL or physical location
    meetingNotes: { type: String },
    aiSummary: { type: String },
    recordingUrl: { type: String },
    
    actionItems: [{
      task: { type: String },
      assignee: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      completed: { type: Boolean, default: false }
    }],
    
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema);

export default Meeting;
