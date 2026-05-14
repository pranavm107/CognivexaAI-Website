import { google } from 'googleapis';
import env from '../config/env.js';
import logger from '../config/logger.js';

const oauth2Client = new google.auth.OAuth2(
  env.GOOGLE.CLIENT_ID,
  env.GOOGLE.CLIENT_SECRET,
  env.GOOGLE.REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: env.GOOGLE.REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const createCalendarEvent = async (booking) => {
  try {
    const event = {
      summary: `CognivexaAI: ${booking.serviceType} - ${booking.clientName}`,
      description: `Meeting with ${booking.clientName} regarding ${booking.serviceType}. \nNotes: ${booking.notes || 'N/A'}`,
      start: {
        dateTime: booking.startTime.toISOString(),
        timeZone: booking.timezone,
      },
      end: {
        dateTime: booking.endTime.toISOString(),
        timeZone: booking.timezone,
      },
      conferenceData: {
        createRequest: {
          requestId: `booking-${booking._id}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      attendees: [
        { email: booking.clientEmail },
      ],
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });

    return response.data;
  } catch (error) {
    logger.error(`Google Calendar event creation failed: ${error.message}`);
    throw error;
  }
};

export default {
  createCalendarEvent,
};
