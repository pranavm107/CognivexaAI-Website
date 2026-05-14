import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client', required: true, unique: true },
    plan: { type: String, enum: ['starter', 'professional', 'enterprise'], default: 'starter' },
    status: { type: String, enum: ['active', 'canceled', 'past_due', 'trialing'], default: 'trialing' },
    
    billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    currentPeriodStart: { type: Date, default: Date.now },
    currentPeriodEnd: { type: Date },
    
    stripeSubscriptionId: { type: String },
    stripeCustomerId: { type: String },
    
    seats: { type: Number, default: 5 },
    priceId: { type: String },
    
    cancelAtPeriodEnd: { type: Boolean, default: false },
    trialEnd: { type: Date }
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
