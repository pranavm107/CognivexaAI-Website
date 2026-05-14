import Booking from '../models/Booking.model.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

/**
 * Query bookings with advanced filters
 */
export const queryBookings = async (filter, options) => {
  const { limit = 10, page = 1, sortBy = 'startTime:asc' } = options;
  const skip = (page - 1) * limit;

  const sort = {};
  if (sortBy) {
    const [field, order] = sortBy.split(':');
    sort[field] = order === 'desc' ? -1 : 1;
  }

  const bookings = await Booking.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('assignedAdmin', 'firstName lastName avatar email')
    .populate('inquiryReference', 'aiIntelligence priority')
    .populate('internalNotes.addedBy', 'firstName lastName avatar');

  const totalResults = await Booking.countDocuments(filter);
  const totalPages = Math.ceil(totalResults / limit);

  return {
    results: bookings,
    page,
    limit,
    totalPages,
    totalResults,
  };
};

/**
 * Get booking by ID
 */
export const getBookingById = async (id) => {
  const booking = await Booking.findById(id)
    .populate('assignedAdmin', 'firstName lastName avatar')
    .populate('inquiryReference')
    .populate('internalNotes.addedBy', 'firstName lastName avatar');
  
  if (!booking) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');
  }
  return booking;
};

/**
 * Create booking
 */
export const createBooking = async (bookingBody) => {
  return Booking.create(bookingBody);
};

/**
 * Update booking status or details
 */
export const updateBooking = async (id, updateBody, performerId) => {
  const booking = await getBookingById(id);
  
  // Track status changes
  if (updateBody.status && updateBody.status !== booking.status) {
    booking.activityLogs.push({
      action: `Status changed to ${updateBody.status}`,
      performer: performerId,
      metadata: { from: booking.status, to: updateBody.status }
    });
  }

  Object.assign(booking, updateBody);
  await booking.save();
  return booking;
};

/**
 * Add internal note to booking
 */
export const addBookingNote = async (id, content, performerId) => {
  const booking = await getBookingById(id);
  booking.internalNotes.push({ content, addedBy: performerId });
  await booking.save();
  return booking;
};
