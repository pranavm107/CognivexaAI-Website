import mongoose from 'mongoose';
import logger from '../config/logger.js';

const entrySchema = new mongoose.Schema({
  ledgerId: String,
  type: { type: String, enum: ['debit', 'credit'] },
  amount: Number,
  category: String, // 'revenue', 'expense', 'tax', 'adjustment'
  description: String,
  entityType: String,
  entityId: mongoose.SchemaTypes.ObjectId,
  organizationId: mongoose.SchemaTypes.ObjectId,
  timestamp: { type: Date, default: Date.now }
});

const LedgerEntry = mongoose.models.LedgerEntry || mongoose.model('LedgerEntry', entrySchema);

/**
 * ENTERPRISE LEDGER SERVICE
 * Precise double-entry accounting infrastructure for financial tracking and reconciliation.
 */
export const ledger = {
  /**
   * Record a Financial Entry
   */
  recordEntry: async (data) => {
    logger.info(`[Ledger] Recording ${data.type}: ${data.amount} for ${data.category}`);
    
    const entry = await LedgerEntry.create(data);
    
    // In production, this would trigger reconciliation logic
    return entry;
  },

  /**
   * Get Financial Summary for Organization
   */
  getSummary: async (orgId) => {
    const entries = await LedgerEntry.find({ organizationId: orgId });
    
    const totalCredits = entries.filter(e => e.type === 'credit').reduce((a, b) => a + b.amount, 0);
    const totalDebits = entries.filter(e => e.type === 'debit').reduce((a, b) => a + b.amount, 0);

    return {
      balance: totalCredits - totalDebits,
      totalRevenue: totalCredits,
      totalExpenses: totalDebits,
      entryCount: entries.length
    };
  }
};

export default ledger;
