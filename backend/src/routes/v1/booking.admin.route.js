import express from 'express';
import * as bookingController from '../../controllers/adminBooking.controller.js';
import auth from '../../middleware/auth.middleware.js';
import checkPermission from '../../middleware/permission.middleware.js';

const router = express.Router();

router.use(auth()); // Protected admin routes

router.get('/', bookingController.getBookings);
router.post('/manual', bookingController.manualBooking);
router.get('/:id', bookingController.getBooking);
router.patch('/:id', bookingController.updateBooking);
router.patch('/:id/confirm', bookingController.confirmBooking);
router.patch('/:id/cancel', bookingController.cancelBooking);
router.post('/:id/notes', bookingController.addNote);
router.delete('/:id', bookingController.deleteBooking);

export default router;
