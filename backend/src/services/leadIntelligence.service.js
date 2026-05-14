import { StatusCodes } from 'http-status-codes';
import Inquiry from '../models/inquiry.model.js';
import User from '../models/User.model.js';
import eventBus from './eventBus.service.js';
import logger from '../config/logger.js';

/**
 * LEAD INTELLIGENCE OPERATING SYSTEM
 * Handles enterprise acquisition, lead scoring, and automated routing.
 */
class LeadIntelligenceService {
  /**
   * Process new inquiry from website
   */
  async processInquiry(inquiryData, metadata = {}) {
    // 1. Calculate Lead Score
    const score = this.calculateLeadScore(inquiryData, metadata);
    
    // 2. Identify Tier and Value
    const tier = this.determineTier(inquiryData);
    const estimatedValue = this.estimateOpportunityValue(inquiryData);

    // 3. Create Inquiry Record with Intelligence
    const inquiry = await Inquiry.create({
      ...inquiryData,
      intelligence: {
        score,
        tier,
        estimatedValue,
        source: metadata.source || 'direct',
        utm: metadata.utm || {},
        visitorId: metadata.visitorId,
        referral: metadata.referral
      },
      status: 'new'
    });

    // 4. Automated Routing
    const owner = await this.routeLead(inquiry);
    if (owner) {
      inquiry.assignedTo = owner._id;
      await inquiry.save();
    }

    // 5. Global Propagation
    eventBus.emit('lead.captured', {
      inquiryId: inquiry._id,
      score,
      tier,
      company: inquiryData.company,
      timestamp: new Date()
    });

    logger.info(`[LeadIntell] New lead captured: ${inquiryData.company} (Score: ${score})`);
    return inquiry;
  }

  calculateLeadScore(data, metadata) {
    let score = 0;
    
    // Budget weight
    const budgetMap = { '50k+': 50, '25k-50k': 30, '10k-25k': 15, '<10k': 5 };
    score += budgetMap[data.budget] || 0;

    // Company size weight
    const sizeMap = { '500+': 30, '100-500': 20, '10-100': 10, '<10': 5 };
    score += sizeMap[data.companySize] || 0;

    // Intent/Urgency
    if (data.urgency === 'immediate') score += 20;
    
    // Attribution boost (e.g. from high-value referral)
    if (metadata.source === 'enterprise_partner') score += 25;

    return Math.min(100, score);
  }

  determineTier(data) {
    if (data.budget === '50k+' || data.companySize === '500+') return 'platinum';
    if (data.budget === '25k-50k') return 'gold';
    return 'silver';
  }

  estimateOpportunityValue(data) {
    const budgetMap = { '50k+': 75000, '25k-50k': 35000, '10k-25k': 15000, '<10k': 5000 };
    return budgetMap[data.budget] || 0;
  }

  async routeLead(inquiry) {
    // Basic Round-Robin or Priority Routing
    const salesTeam = await User.find({ role: 'sales', availabilityStatus: 'available' });
    if (!salesTeam.length) return null;

    // Route high-score leads to senior sales or specific department heads
    if (inquiry.intelligence.score > 80) {
      const seniorSales = salesTeam.find(u => u.performanceScore > 90);
      return seniorSales || salesTeam[0];
    }

    return salesTeam[Math.floor(Math.random() * salesTeam.length)];
  }

  /**
   * Analytics and Heatmaps
   */
  async getLeadAnalytics() {
    return await Inquiry.aggregate([
      { $group: { 
        _id: "$status", 
        count: { $sum: 1 }, 
        totalValue: { $sum: "$intelligence.estimatedValue" } 
      }}
    ]);
  }
}

export default new LeadIntelligenceService();
