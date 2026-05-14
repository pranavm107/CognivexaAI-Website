import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    project: { type: mongoose.SchemaTypes.ObjectId, ref: 'Project', required: true },
    milestone: { type: mongoose.SchemaTypes.ObjectId }, // Reference to a milestone within the project
    
    status: {
      type: String,
      enum: ['backlog', 'todo', 'in_progress', 'review', 'blocked', 'completed'],
      default: 'backlog'
    },
    kanbanState: { type: String, default: 'backlog' },
    estimatedHours: { type: Number, default: 0 },
    actualHours: { type: Number, default: 0 },
    
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    
    assignees: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    dueDate: { type: Date },
    
    subtasks: [{
      title: { type: String, required: true },
      completed: { type: Boolean, default: false }
    }],
    
    attachments: [{
      name: { type: String },
      url: { type: String },
      type: { type: String }
    }],
    
    comments: [{
      content: { type: String, required: true },
      author: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }],
    
    labels: [{ type: String }],
    dependencies: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Task' }],
    
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

// Indexes for faster searching
taskSchema.index({ project: 1, status: 1 });
taskSchema.index({ assignees: 1 });

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
