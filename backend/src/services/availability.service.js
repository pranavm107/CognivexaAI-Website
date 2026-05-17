import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import Booking from '../models/Booking.model.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

class AvailabilityService {
  constructor() {
    this.businessHours = {
      start: 9, // 9 AM
      end: 18,   // 6 PM
      timezone: 'Asia/Kolkata' // Business is based in IST
    };
    this.defaultDuration = 30; // 30 minutes
    this.minBookingWindow = 2; // Can't book less than 2 hours in advance
  }

  /**
   * Get available slots for a specific date
   * @param {string} date - YYYY-MM-DD
   * @param {string} clientTimezone - Client's local timezone
   */
  async getAvailableSlots(date, clientTimezone = 'UTC') {
    // 1. Define the day range in business timezone
    const startOfBusinessDay = dayjs.tz(date, this.businessHours.timezone).hour(this.businessHours.start).minute(0).second(0);
    const endOfBusinessDay = dayjs.tz(date, this.businessHours.timezone).hour(this.businessHours.end).minute(0).second(0);

    // 2. Fetch existing bookings from DB for that day
    const existingBookings = await Booking.find({
      startTime: { $gte: startOfBusinessDay.toDate(), $lt: endOfBusinessDay.toDate() },
      status: { $in: ['confirmed', 'scheduled', 'pending'] },
      isDeleted: false
    }).select('startTime endTime');

    // 3. Generate potential slots
    const slots = [];
    let currentSlot = startOfBusinessDay;
    const now = dayjs().tz(this.businessHours.timezone);

    while (currentSlot.isBefore(endOfBusinessDay)) {
      const slotStart = currentSlot;
      const slotEnd = currentSlot.add(this.defaultDuration, 'minute');

      // Validation logic
      let isAvailable = true;

      // Rule 1: Must be in the future + booking window
      if (slotStart.isBefore(now.add(this.minBookingWindow, 'hour'))) {
        isAvailable = false;
      }

      // Rule 2: No conflicts with existing bookings
      if (isAvailable) {
        const hasConflict = existingBookings.some(booking => {
          const bStart = dayjs(booking.startTime);
          const bEnd = dayjs(booking.endTime);
          // Check if slot overlaps with booking
          return (
            (slotStart.isBefore(bEnd) && slotEnd.isAfter(bStart))
          );
        });
        if (hasConflict) isAvailable = false;
      }

      slots.push({
        time: slotStart.tz(clientTimezone).format('HH:mm'),
        startTime: slotStart.toISOString(),
        endTime: slotEnd.toISOString(),
        isAvailable,
        timezone: clientTimezone
      });

      currentSlot = slotEnd;
    }

    return slots;
  }

  /**
   * Validate if a specific slot is available
   */
  async isSlotAvailable(startTime, endTime) {
    const start = dayjs(startTime);
    const end = dayjs(endTime);

    // 1. Basic future check
    const now = dayjs().tz(this.businessHours.timezone);
    if (start.isBefore(now.add(this.minBookingWindow, 'hour'))) {
      return false;
    }

    // 2. Business hours check (converted to business timezone)
    const bizStart = start.tz(this.businessHours.timezone);
    if (bizStart.hour() < this.businessHours.start || bizStart.hour() >= this.businessHours.end) {
      return false;
    }

    // 3. DB Conflict check
    const conflict = await Booking.findOne({
      startTime: { $lt: end.toDate() },
      endTime: { $gt: start.toDate() },
      status: { $in: ['confirmed', 'scheduled', 'pending'] },
      isDeleted: false
    });

    return !conflict;
  }
}

export default new AvailabilityService();
