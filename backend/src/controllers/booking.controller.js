import Booking from "../models/Booking.model.js";
import { sendBookingAdminEmail, sendBookingUserEmail } from "../services/mail.service.js";
import { sendWhatsAppMessage } from "../services/whatsapp.service.js";
import { createCalendarEvent } from "../services/calendar.service.js";

// Generate time slots from 09:00 to 18:00 every 30 minutes
const generateTimeSlots = () => {
  const slots = [];
  let current = 9 * 60; // 09:00 in minutes
  const end = 18 * 60; // 18:00 in minutes

  while (current < end) {
    const hours = Math.floor(current / 60);
    const minutes = current % 60;
    const time = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    slots.push(time);
    current += 30;
  }
  return slots;
};

export const getAvailability = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const slots = generateTimeSlots();
    const bookings = await Booking.find({ date, status: "confirmed" });
    const bookedTimes = bookings.map((b) => b.time);

    const availableSlots = slots.map((time) => ({
      time,
      isAvailable: !bookedTimes.includes(time),
    }));

    res.json(availableSlots);
  } catch (error) {
    console.error("Error in getAvailability:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, date, time, message } = req.body;

    // Basic validation
    if (!name || !email || !service || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if slot already booked
    const existingBooking = await Booking.findOne({ date, time, status: "confirmed" });
    if (existingBooking) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

    const booking = new Booking({
      name,
      email,
      phone,
      service,
      date,
      time,
      message,
    });

    await booking.save();

    // Send notifications
    try {
      // Create Google Calendar Event & Meet Link
      const calendarData = await createCalendarEvent(booking);
      if (calendarData) {
        booking.meetLink = calendarData.meetLink;
        booking.googleEventId = calendarData.eventId;
        booking.notifications.calendarSynced = true;
        
        booking.activityTimeline.push({
          type: 'calendar_synced',
          message: 'Google Calendar event created with Meet link',
          actor: 'system'
        });
      }
      
      await booking.save();

      await sendBookingAdminEmail(booking);
      booking.notifications.emailSent = true;
      
      await sendBookingUserEmail(booking);
      
      if (booking.phone) {
        await sendWhatsAppMessage(booking);
        booking.notifications.whatsappSent = true;
      }
      
      await booking.save();
    } catch (notificationError) {
      console.error("Error sending booking notifications:", notificationError);
      // We don't fail the request if notifications fail
    }

    res.status(201).json({
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    console.error("Error in createBooking:", error);
    res.status(500).json({ message: "Server error" });
  }
};
