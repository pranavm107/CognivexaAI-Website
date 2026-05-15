import Inquiry from '../models/inquiry.model.js';
import catchAsync from '../utils/catchAsync.js';
import { StatusCodes } from 'http-status-codes';
import { emitToAdmin } from '../services/socket.service.js';
import * as aiService from '../services/ai.service.js';

export const submitInquiry = catchAsync(async (req, res) => {
  const inquiryData = {
    ...req.body,
    metadata: {
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      referrer: req.headers['referer']
    }
  };

  // Real AI Analysis (Simulated or Real depending on API Key)
  const analysis = await aiService.analyzeLead(inquiryData);
  inquiryData.aiIntelligence = analysis;

  const inquiry = await Inquiry.create(inquiryData);

  // Real-time notification to admin
  emitToAdmin('new_inquiry', inquiry);
  emitToAdmin('new_notification', {
    type: 'lead.created',
    title: 'New High-Value Inquiry',
    message: `${inquiry.fullName} from ${inquiry.company || 'Private'} submitted a new inquiry.`,
    priority: inquiry.aiIntelligence?.urgency === 'high' ? 'high' : 'medium'
  });

  res.status(StatusCodes.CREATED).send({
    success: true,
    message: 'Inquiry received. Our AI is analyzing your requirements.',
    data: { id: inquiry._id }
  });
});
