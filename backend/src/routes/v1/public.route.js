import express from 'express';
import * as cmsController from '../../controllers/cms.controller.js';
import * as publicInquiryController from '../../controllers/publicInquiry.controller.js';
import * as publicBookingController from '../../controllers/publicBooking.controller.js';

const router = express.Router();

// CMS Synchronization
router.get('/content/:slug', cmsController.getContentBySlug);
router.get('/seo/:slug', cmsController.getSEOMetadata);
router.get('/services', cmsController.getPublicServices);
router.get('/portfolio', cmsController.getPublicPortfolio);
router.get('/team', cmsController.getPublicTeam);
router.get('/settings', cmsController.getPublicSettings);

// Lead Acquisition
router.post('/inquiries', publicInquiryController.submitInquiry);

// Consultation Orchestration
router.get('/bookings/availability', publicBookingController.getAvailability);
router.post('/bookings', publicBookingController.createBooking);

// Blog & Resource Engine
router.get('/blog', cmsController.getBlogPosts);
router.get('/blog/:slug', cmsController.getBlogPost);
router.get('/sitemap', cmsController.getSitemap);

export default router;
