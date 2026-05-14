import { StatusCodes } from 'http-status-codes';
import Ticket from '../models/Ticket.model.js';
import SLA from '../models/SLA.model.js';
import catchAsync from '../utils/catchAsync.js';
import { socketService } from '../services/socket.service.js';

/**
 * SUPPORT CONTROLLER
 */
export const getTickets = catchAsync(async (req, res) => {
  const filter = req.user.role === 'admin' || req.user.role === 'support' ? {} : { client: req.user.clientId };
  const tickets = await Ticket.find(filter)
    .populate('requestedBy', 'firstName lastName')
    .populate('assignedTo', 'firstName lastName')
    .sort({ createdAt: -1 });
    
  res.send({ success: true, data: tickets });
});

export const createTicket = catchAsync(async (req, res) => {
  const ticketId = 'TKT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  
  // Calculate SLA Deadline based on priority
  const slaHours = req.body.priority === 'critical' ? 4 : req.body.priority === 'high' ? 12 : 24;
  const slaDeadline = new Date(Date.now() + slaHours * 60 * 60 * 1000);

  const ticket = await Ticket.create({
    ...req.body,
    ticketId,
    client: req.user.clientId,
    requestedBy: req.user._id,
    slaDeadline
  });

  socketService.to('admin_support', 'NEW_TICKET', {
    ticketId,
    title: ticket.title,
    priority: ticket.priority
  });

  res.status(StatusCodes.CREATED).send({ success: true, data: ticket });
});

export const addTicketComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { text, isInternal } = req.body;

  const ticket = await Ticket.findById(id);
  if (!ticket) return res.status(StatusCodes.NOT_FOUND).send({ message: 'Ticket not found' });

  ticket.comments.push({
    author: req.user._id,
    text,
    isInternal
  });

  await ticket.save();

  // Notify relevant parties via socket
  socketService.to(`client_${ticket.client}`, 'TICKET_UPDATED', { ticketId: ticket.ticketId });

  res.send({ success: true, data: ticket });
});

export default {
  getTickets,
  createTicket,
  addTicketComment
};
