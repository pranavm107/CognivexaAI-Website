import { createQueue } from '../utils/queue.helper.js';

export const emailQueue = createQueue('email-queue');
export const whatsappQueue = createQueue('whatsapp-queue');
export const bookingQueue = createQueue('booking-queue');
export const calendarQueue = createQueue('calendar-queue');
