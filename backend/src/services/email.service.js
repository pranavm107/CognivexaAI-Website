import { Resend } from 'resend';
import env from '../config/env.js';
import logger from '../config/logger.js';

const resend = new Resend(env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: 'CognivexaAI <notifications@cognivexa.ai>',
      to,
      subject,
      html,
    });
    return data;
  } catch (error) {
    logger.error(`Email delivery failed to ${to}: ${error.message}`);
    throw error;
  }
};

const sendBookingConfirmation = async (clientEmail, bookingData) => {
  const subject = 'Booking Confirmed - CognivexaAI';
  const html = `
    <h1>Hello ${bookingData.clientName},</h1>
    <p>Your booking for <strong>${bookingData.serviceType}</strong> has been confirmed.</p>
    <p><strong>Time:</strong> ${bookingData.startTime}</p>
    <p><strong>Meet Link:</strong> <a href="${bookingData.meetLink}">${bookingData.meetLink}</a></p>
  `;
  return sendEmail(clientEmail, subject, html);
};

export default {
  sendEmail,
  sendBookingConfirmation,
};
