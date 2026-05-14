import cron from "node-cron";
import dayjs from "dayjs";
import Booking from "../models/Booking.js";
import { sendWhatsAppMessage } from "./whatsapp.service.js";

export const startReminderService = () => {
  console.log("Reminder service started...");
  
  // Runs every minute
  cron.schedule("*/1 * * * *", async () => {
    try {
      const now = dayjs();
      // Look for bookings happening in the next 15-16 minutes
      const reminderWindowStart = now.add(14, "minute");
      const reminderWindowEnd = now.add(16, "minute");

      const bookings = await Booking.find({
        reminderSent: false,
        status: "confirmed",
      });

      for (const booking of bookings) {
        const bookingTime = dayjs(`${booking.date} ${booking.time}`);

        // If booking is within the next 15 minutes and hasn't been sent
        if (bookingTime.isAfter(now) && bookingTime.isBefore(now.add(16, "minute"))) {
          console.log(`Sending reminder for booking: ${booking._id}`);
          
          await sendWhatsAppMessage({
            name: booking.name,
            phone: booking.phone,
            date: booking.date,
            time: booking.time,
            message: `Reminder: Your call is in 15 minutes.
${booking.meetLink ? `
Join here:
${booking.meetLink}` : ""}`,
          });

          booking.reminderSent = true;
          await booking.save();
        }
      }
    } catch (error) {
      console.error("Error in reminder job:", error);
    }
  });
};
