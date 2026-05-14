import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import adminService from '../services/admin.service.js';
import Booking from '../models/Booking.model.js';
import Inquiry from '../models/Inquiry.model.js';
import queryHelper from '../utils/query.helper.js';

const getDashboard = catchAsync(async (req, res) => {
  const stats = await adminService.getDashboardStats(req.query.range);
  res.send({
    success: true,
    message: 'Dashboard stats retrieved',
    data: stats,
  });
});

const getBookings = catchAsync(async (req, res) => {
  const { status, serviceType, page, limit, sortBy, order } = req.query;
  const filter = { isDeleted: false };
  if (status) filter.status = status;
  if (serviceType) filter.serviceType = serviceType;

  let query = Booking.find(filter);
  query = queryHelper.applySorting(query, { sortBy, order });
  
  const total = await Booking.countDocuments(filter);
  const bookings = await queryHelper.applyPagination(query, { page, limit });

  res.send({
    success: true,
    data: bookings,
    meta: { total, page: parseInt(page) || 1, limit: parseInt(limit) || 10 }
  });
});

const getInquiries = catchAsync(async (req, res) => {
  const { status, priority, page, limit, sortBy, order } = req.query;
  const filter = { isDeleted: false };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  let query = Inquiry.find(filter);
  query = queryHelper.applySorting(query, { sortBy, order });
  
  const total = await Inquiry.countDocuments(filter);
  const inquiries = await queryHelper.applyPagination(query, { page, limit });

  res.send({
    success: true,
    data: inquiries,
    meta: { total, page: parseInt(page) || 1, limit: parseInt(limit) || 10 }
  });
});

const updateInquiryStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status, priority } = req.body;

  const inquiry = await Inquiry.findByIdAndUpdate(
    id,
    { status, priority },
    { new: true, runValidators: true }
  );

  res.send({
    success: true,
    message: 'Inquiry updated successfully',
    data: inquiry
  });
});

export default {
  getDashboard,
  getBookings,
  getInquiries,
  updateInquiryStatus,
};
