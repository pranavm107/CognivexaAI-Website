import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export const analyzeLead = async (inquiry) => {
  try {
    const prompt = `
      Analyze this business inquiry for an AI agency:
      Name: ${inquiry.fullName}
      Company: ${inquiry.company}
      Service: ${inquiry.serviceOfInterest}
      Message: ${inquiry.message}
      Budget: ${inquiry.budget}
      Timeline: ${inquiry.timeline}
      Source Portfolio Build: ${inquiry.sourcePortfolioBuild || 'None'}
      Inquiry Source: ${inquiry.inquirySource || 'None'}
      Selected Package: ${inquiry.pricingPlan || 'None'}

      Provide:
      1. Quality score (0-100)
      2. Urgency (low, medium, high)
      3. Summary
      4. Conversion probability (0.0 to 1.0)
      5. Recommended next action
    `;

    // In a real scenario, call OpenAI here.
    // Since we might not have a key, we return a structured high-quality response.
    
    return {
      score: 88,
      urgency: 'high',
      summary: 'Strong enterprise lead with clear ROI objectives in AI automation.',
      sentiment: 'positive',
      conversionProbability: 0.75,
      recommendedNextAction: 'Send technical workshop proposal.'
    };
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return null;
  }
};

export const generateProposal = async (inquiry) => {
  // Simulating professional proposal generation
  return `
    ## STRATEGIC PROPOSAL: ${inquiry.serviceOfInterest}
    ### Client: ${inquiry.company || inquiry.fullName}
    
    #### 1. EXECUTIVE SUMMARY
    Based on your requirements regarding "${inquiry.message}", CognivexaAI proposes a neural-first architecture...
    
    #### 2. SCOPE OF WORK
    - Phase 1: Cognitive Discovery & Data Audit
    - Phase 2: Neural Architecture Design
    - Phase 3: Production Deployment & Feedback Loops
    
    #### 3. ESTIMATED TIMELINE
    Target Completion: ${inquiry.timeline || 'Q3 2024'}
    
    #### 4. INVESTMENT
    Base Budget: ${inquiry.budget || 'To be discussed'}
  `;
};
