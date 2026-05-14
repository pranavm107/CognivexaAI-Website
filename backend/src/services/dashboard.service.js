import Booking from '../models/Booking.model.js';
import Inquiry from '../models/inquiry.model.js';
import mongoose from 'mongoose';

/**
 * Get unified dashboard metrics using real-time aggregation
 */
export const getDashboardStats = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // 1. Booking Analytics
  const bookingStats = await Booking.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        confirmed: { $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] } },
        thisMonth: { $sum: { $cond: [{ $gte: ["$createdAt", startOfMonth] }, 1, 0] } }
      }
    }
  ]);

  // 2. Inquiry Analytics
  const inquiryStats = await Inquiry.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        new: { $sum: { $cond: [{ $eq: ["$status", "new"] }, 1, 0] } },
        qualified: { $sum: { $cond: [{ $eq: ["$status", "qualified"] }, 1, 0] } },
        thisMonth: { $sum: { $cond: [{ $gte: ["$createdAt", startOfMonth] }, 1, 0] } }
      }
    }
  ]);

  // 3. Service Demand (Real)
  const serviceDemand = await Booking.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$serviceType",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  // 4. Growth Calculation (Mocked logic but based on real counts)
  const bCount = bookingStats[0]?.total || 0;
  const iCount = inquiryStats[0]?.total || 0;
  
  return {
    overview: {
      totalBookings: bCount,
      totalInquiries: iCount,
      activeMeetings: bookingStats[0]?.confirmed || 0,
      conversionRate: iCount > 0 ? Math.min((bCount / iCount) * 100, 100).toFixed(1) : 0,
      newLeadsThisMonth: inquiryStats[0]?.thisMonth || 0,
    },
    serviceDemand: serviceDemand.map(s => ({ name: s._id || 'General', value: s.count })),
    recentTrends: [] // Can be expanded with daily groups
  };
};
