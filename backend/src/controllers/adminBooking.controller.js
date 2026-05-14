import * as bookingService from '../services/booking.service.js';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import { getIO } from '../services/socket.service.js';
import { createCalendarEvent, deleteCalendarEvent } from '../services/calendar.service.js';
import { sendBookingAdminEmail, sendBookingUserEmail, sendBookingCancellationEmail } from '../services/mail.service.js';
import { sendWhatsAppMessage, sendWhatsAppCancellation } from '../services/whatsapp.service.js';
import Booking from '../models/Booking.model.js';
import ApiError from '../utils/ApiError.js';
import dayjs from 'dayjs';

export const getBookings = catchAsync(async (req, res) => {
  const filter = { isDeleted: false };
  
  if (req.query.status) filter.status = req.query.status;
  if (req.query.serviceType) filter.serviceType = req.query.serviceType;
  if (req.query.search) {
    filter.$or = [
      { clientName: { $regex: req.query.search, $options: 'i' } },
      { clientEmail: { $regex: req.query.search, $options: 'i' } },
      { bookingId: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    page: parseInt(req.query.page, 10) || 1,
    sortBy: req.query.sortBy || 'startTime:asc',
  };

  const result = await bookingService.queryBookings(filter, options);
  res.send(result);
});

export const getBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.getBookingById(req.params.id);
  res.send(booking);
});

export const updateBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.updateBooking(req.params.id, req.body, req.user.id);
  
  // Real-time update
  const io = getIO();
  io.to('admin_room').emit('booking_updated', booking);
  
  res.send(booking);
});

export const manualBooking = catchAsync(async (req, res) => {
  const { clientName, clientEmail, clientPhone, date, time, serviceType, notes } = req.body;

  // Create booking object
  const startTime = dayjs(`${date}T${time}`).toDate();
  const endTime = dayjs(startTime).add(30, 'minute').toDate();

  const booking = await Booking.create({
    clientName,
    clientEmail,
    clientPhone,
    startTime,
    endTime,
    date,
    time,
    serviceType: serviceType || 'General Consultation',
    notes,
    createdBy: 'admin',
    isManualBooking: true,
    status: 'confirmed',
    metadata: { source: 'admin' }
  });

  // Generate Meet & Calendar
  try {
    const calendarData = await createCalendarEvent(booking);
    if (calendarData) {
      booking.meetLink = calendarData.meetLink;
      booking.googleEventId = calendarData.eventId;
      booking.notifications.calendarSynced = true;
      
      booking.activityTimeline.push({
        type: 'manual_creation',
        message: 'Manual booking created by admin',
        actor: 'admin'
      });
      
      booking.activityTimeline.push({
        type: 'calendar_synced',
        message: 'Google Calendar event & Meet link generated',
        actor: 'system'
      });
    }

    // Send Notifications
    await sendBookingUserEmail(booking);
    booking.notifications.emailSent = true;

    if (booking.clientPhone) {
      await sendWhatsAppMessage({ ...booking.toObject(), name: booking.clientName, email: booking.clientEmail, phone: booking.clientPhone });
      booking.notifications.whatsappSent = true;
    }

    await booking.save();
  } catch (err) {
    console.error('Manual booking notifications error:', err);
  }

  const io = getIO();
  io.to('admin_room').emit('booking_updated', booking);

  res.status(StatusCodes.CREATED).send(booking);
});

export const confirmBooking = catchAsync(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');

  booking.status = 'confirmed';
  booking.confirmedAt = new Date();

  // Generate Meet link if missing
  if (!booking.meetLink) {
    const calendarData = await createCalendarEvent(booking);
    if (calendarData) {
      booking.meetLink = calendarData.meetLink;
      booking.googleEventId = calendarData.eventId;
      booking.notifications.calendarSynced = true;
    }
  }

  // Send notifications
  await sendBookingUserEmail({ ...booking.toObject(), name: booking.clientName, email: booking.clientEmail });
  booking.notifications.emailSent = true;

  if (booking.clientPhone) {
    await sendWhatsAppMessage({ ...booking.toObject(), name: booking.clientName, email: booking.clientEmail, phone: booking.clientPhone });
    booking.notifications.whatsappSent = true;
  }

  booking.activityTimeline.push({
    type: 'confirmed',
    message: 'Booking confirmed by admin',
    actor: 'admin'
  });

  await booking.save();

  const io = getIO();
  io.to('admin_room').emit('booking_updated', booking);

  res.send(booking);
});

export const cancelBooking = catchAsync(async (req, res) => {
  const { reason } = req.body;
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');

  booking.status = 'cancelled';
  booking.cancelledAt = new Date();
  booking.cancelledReason = reason;

  // Delete Calendar Event
  if (booking.googleEventId) {
    await deleteCalendarEvent(booking.googleEventId);
    booking.notifications.calendarSynced = false;
  }

  // Send Notifications
  const notificationData = {
    name: booking.clientName,
    email: booking.clientEmail,
    phone: booking.clientPhone,
    date: booking.date || dayjs(booking.startTime).format('YYYY-MM-DD'),
    time: booking.time || dayjs(booking.startTime).format('HH:mm'),
    cancelledReason: reason
  };

  await sendBookingCancellationEmail(notificationData);
  if (booking.clientPhone) {
    await sendWhatsAppCancellation(notificationData);
  }

  booking.activityTimeline.push({
    type: 'cancelled',
    message: `Booking cancelled by admin${reason ? `: ${reason}` : ''}`,
    actor: 'admin'
  });

  await booking.save();

  const io = getIO();
  io.to('admin_room').emit('booking_updated', booking);

  res.send(booking);
});

export const addNote = catchAsync(async (req, res) => {
  const booking = await bookingService.addBookingNote(req.params.id, req.body.content, req.user.id);
  
  const io = getIO();
  io.to('admin_room').emit('booking_updated', booking);
  
  res.status(StatusCodes.CREATED).send(booking);
});

export const deleteBooking = catchAsync(async (req, res) => {
  await bookingService.updateBooking(req.params.id, { isDeleted: true }, req.user.id);
  res.status(StatusCodes.NO_CONTENT).send();
});
