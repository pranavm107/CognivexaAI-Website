import { StatusCodes } from 'http-status-codes';
import Booking from '../models/Booking.model.js';
import User from '../models/User.model.js';
import eventBus from './eventBus.service.js';
import logger from '../config/logger.js';
import googleService from './google.service.js';

/**
 * CONSULTATION ORCHESTRATION ENGINE
 * Manages the entire lifecycle of public bookings, enterprise demos, and stakeholder meetings.
 */
class ConsultationOrchestratorService {
  /**
   * Schedule a new consultation from website
   */
  async scheduleConsultation(bookingData, metadata = {}) {
    // 1. Timezone Intelligence & Conflict Prevention
    await this.validateAvailability(bookingData.startTime, bookingData.assignedTo);

    // 2. Create Internal Booking Record
    const booking = await Booking.create({
      ...bookingData,
      type: bookingData.type || 'discovery',
      status: 'confirmed',
      metadata: {
        ...metadata,
        browser: metadata.userAgent,
        source: metadata.source
      }
    });

    // 3. Automated External Orchestration (Google Calendar, Teams, etc.)
    try {
      const calendarEvent = await googleService.createEvent({
        summary: `Cognivexa Consultation: ${bookingData.clientName}`,
        description: `Consultation for ${bookingData.company}. Details: ${bookingData.description}`,
        start: bookingData.startTime,
        end: bookingData.endTime,
        attendees: [{ email: bookingData.clientEmail }]
      });
      
      booking.externalMeetingLink = calendarEvent.hangoutLink;
      booking.externalId = calendarEvent.id;
      await booking.save();
    } catch (err) {
      logger.error(`[Consultation] External sync failed: ${err.message}`);
    }

    // 4. Operational Consequences
    eventBus.emit('booking.scheduled', {
      bookingId: booking._id,
      client: booking.clientName,
      time: booking.startTime,
      type: booking.type
    });

    // 5. Generate Prep Tasks for Assigned Owner
    await this.generatePrepTasks(booking);

    logger.info(`[Consultation] Meeting scheduled: ${bookingData.clientEmail} at ${bookingData.startTime}`);
    return booking;
  }

  async validateAvailability(time, userId) {
    const existing = await Booking.findOne({
      assignedTo: userId,
      startTime: { $lte: time },
      endTime: { $gte: time },
      status: 'confirmed'
    });

    if (existing) {
      throw new ApiError(StatusCodes.CONFLICT, 'Slot no longer available. Please select another time.');
    }
  }

  async generatePrepTasks(booking) {
    // Create operational tasks for the assigned consultant
    eventBus.emit('task.create', {
      title: `Prep for Consultation: ${booking.clientName}`,
      description: `Review lead intelligence and company data for ${booking.company}.`,
      assignedTo: booking.assignedTo,
      priority: 'high',
      dueDate: booking.startTime
    });
  }

  /**
   * Post-Call Execution Layer
   */
  async processCallCompletion(bookingId, summaryData) {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');

    booking.status = 'completed';
    booking.summary = summaryData.notes;
    booking.actionItems = summaryData.actionItems;
    await booking.save();

    // Trigger downstream lifecycle events
    eventBus.emit('consultation.completed', {
      bookingId,
      clientId: booking.clientId,
      outcome: summaryData.outcome,
      timestamp: new Date()
    });

    return booking;
  }
}

export default new ConsultationOrchestratorService();
