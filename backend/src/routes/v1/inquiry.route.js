import express from 'express';
import * as inquiryController from '../../controllers/inquiry.controller.js';
import auth from '../../middleware/auth.middleware.js';
import checkPermission from '../../middleware/permission.middleware.js';

const router = express.Router();

// Public route for creating inquiries
router.post('/public', inquiryController.createPublicInquiry);

// Admin protected routes
router.use(auth());
router.use(checkPermission('manage_inquiries'));

router.get('/', inquiryController.getInquiries);
router.post('/', inquiryController.createInquiry);
router.get('/:id', inquiryController.getInquiry);
router.patch('/:id', inquiryController.updateInquiry);
router.delete('/:id', inquiryController.deleteInquiry);

router.post('/:id/notes', inquiryController.addNote);
router.post('/:id/analyze', inquiryController.runAIAnalysis);
router.post('/:id/send-proposal', inquiryController.sendProposal);

export default router;
