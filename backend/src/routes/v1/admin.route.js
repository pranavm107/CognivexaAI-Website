import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import checkPermission from '../../middleware/permission.middleware.js';
import adminController from '../../controllers/admin.controller.js';
import logActivity from '../../middleware/activityLog.middleware.js';

const router = express.Router();

/**
 * LEGACY ADMIN ROUTE
 * Most logic has been migrated to specialized routes (booking.admin.route.js, inquiry.route.js)
 * This remains for general admin tasks.
 */

router.use(auth());

router.get('/dashboard', checkPermission('view_analytics'), adminController.getDashboard);

// DEPRECATED: Use /api/v1/admin/bookings specialized route
// router.get('/bookings', checkPermission('manage_bookings'), adminController.getBookings);

// DEPRECATED: Use /api/v1/inquiries specialized route
// router.get('/inquiries', checkPermission('manage_inquiries'), adminController.getInquiries);

export default router;
