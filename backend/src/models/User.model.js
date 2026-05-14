import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true, // used by toJSON plugin
    },
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'manager', 'sales', 'support', 'client', 'client_admin'],
      default: 'admin',
    },
    permissions: [{
      type: String,
      enum: [
        'manage_bookings',
        'manage_inquiries',
        'manage_services',
        'manage_portfolio',
        'manage_team',
        'manage_users',
        'view_analytics'
      ]
    }],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    avatar: { type: String, default: '' },
    bio: { type: String, trim: true },
    // Enterprise Workforce OS
    employeeId: { type: String, unique: true, sparse: true },
    department: { type: String, enum: ['Engineering', 'Design', 'AI/Data', 'Product', 'Marketing', 'Sales', 'Support', 'Admin'], default: 'Engineering' },
    designation: { type: String, trim: true },
    employmentType: { type: String, enum: ['full-time', 'part-time', 'contractor', 'intern'], default: 'full-time' },
    reportingManager: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    
    // Resource Management
    skills: [{
      name: String,
      level: { type: Number, min: 1, max: 10, default: 5 } // 1-10 scale
    }],
    utilizationPercentage: { type: Number, default: 0, min: 0, max: 100 },
    weeklyCapacity: { type: Number, default: 40 }, // in hours
    allocatedHours: { type: Number, default: 0 },
    availabilityStatus: { type: String, enum: ['available', 'busy', 'away', 'on_leave'], default: 'available' },
    onboardingStatus: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'completed' },
    performanceScore: { type: Number, default: 100, min: 0, max: 100 },
    activeProjects: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Project' }],
    
    joiningDate: { type: Date, default: Date.now },
    salaryBand: { type: String },
    certifications: [String],
    
    clientId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Method to check if password matches hashed password
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
