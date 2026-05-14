import { google } from "googleapis";
import dayjs from "dayjs";

export const createCalendarEvent = async (booking) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    console.log("OAuth2 Calendar Initialized");
    console.log("Refresh token exists:", !!process.env.GOOGLE_REFRESH_TOKEN);


    const startDateTime = dayjs(`${booking.date} ${booking.time}`).toISOString();
    const endDateTime = dayjs(`${booking.date} ${booking.time}`).add(30, "minute").toISOString();

    const event = {
      summary: `Strategy Call - CognivexaAI (${booking.name})`,
      description: booking.message || "Strategy Call booking",
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Kolkata",
      },
      // Attendees removed because Service Accounts without Domain-Wide Delegation cannot invite external attendees.
      // Notification emails are sent via sendBookingUserEmail/sendBookingAdminEmail instead.
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
      conferenceDataVersion: 1,
    });

    console.log("Google Calendar event created");
    console.log("Meet Link:", response.data.hangoutLink);


    const meetLink =
      response.data.hangoutLink ||
      response.data.conferenceData?.entryPoints?.[0]?.uri;

    return {
      meetLink,
      eventId: response.data.id
    };
  } catch (error) {
    console.error("Error creating Google Calendar event:", error.message);
    if (error.response && error.response.data) {
      console.error("Detailed Google API Error:", JSON.stringify(error.response.data, null, 2));
    }
    return null;
  }
};

export const deleteCalendarEvent = async (eventId) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId: eventId,
    });

    console.log("Google Calendar event deleted:", eventId);
    return true;
  } catch (error) {
    console.error("Error deleting Google Calendar event:", error.message);
    return false;
  }
};
