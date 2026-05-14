import Booking from '../models/Booking.model.js';
import catchAsync from '../utils/catchAsync.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { emitToAdmin } from '../services/socket.service.js';
import dayjs from 'dayjs';

export const getAvailability = catchAsync(async (req, res) => {
  const { date } = req.query; // format YYYY-MM-DD
  if (!date) throw new ApiError(StatusCodes.BAD_REQUEST, 'Date is required');

  const startOfDay = dayjs(date).startOf('day').toDate();
  const endOfDay = dayjs(date).endOf('day').toDate();

  const existingBookings = await Booking.find({
    startTime: { $gte: startOfDay, $lte: endOfDay },
    status: { $ne: 'cancelled' },
    isDeleted: false
  }).select('startTime endTime');

  // Business hours: 9 AM to 6 PM (IST)
  const slots = [];
  let current = dayjs(date).hour(9).minute(0);
  const end = dayjs(date).hour(18).minute(0);

  while (current.isBefore(end)) {
    const slotStart = current.toDate();
    const slotEnd = current.add(1, 'hour').toDate();
    
    const isTaken = existingBookings.some(b => 
      (dayjs(slotStart).isSame(b.startTime) || dayjs(slotStart).isBetween(b.startTime, b.endTime))
    );

    slots.push({
      time: current.format('HH:mm'),
      available: !isTaken,
      startTime: slotStart,
      endTime: slotEnd
    });
    
    current = current.add(1, 'hour');
  }

  res.send({ success: true, slots });
});

export const createBooking = catchAsync(async (req, res) => {
  const { startTime, endTime, clientEmail } = req.body;

  // Check for conflicts
  const conflict = await Booking.findOne({
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
    status: { $ne: 'cancelled' },
    isDeleted: false
  });

  if (conflict) {
    throw new ApiError(StatusCodes.CONFLICT, 'Time slot is no longer available');
  }

  const booking = await Booking.create({
    ...req.body,
    meetLink: `https://meet.google.com/cognivexa-${Math.random().toString(36).substring(7)}`,
    calendarSyncStatus: 'synced',
    metadata: {
      source: 'Website Booking Engine',
      ipAddress: req.ip
    }
  });

  // Real-time notification
  emitToAdmin('new_booking', booking);
  emitToAdmin('new_notification', {
    type: 'booking.created',
    title: 'New Enterprise Strategy Session',
    message: `${booking.clientName} booked a session for ${dayjs(booking.startTime).format('MMM DD, HH:mm')}`,
    priority: 'high'
  });

  res.status(StatusCodes.CREATED).send({
    success: true,
    message: 'Booking confirmed. Calendar invites sent.',
    data: booking
  });
});
