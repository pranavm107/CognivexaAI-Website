import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import brandingController from '../../controllers/branding.controller.js';

const router = express.Router();

// All tenant routes require authentication
router.use(auth());

// Branding & White-Labeling
router.get('/branding', brandingController.getBrandingSettings);
router.patch('/branding', brandingController.updateBrandingSettings);

// In a real app, you'd add subscription and usage routes here too
// router.get('/subscription', subscriptionController.getSubscription);

export default router;
