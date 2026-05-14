import Booking from '../models/Booking.model.js';
import Inquiry from '../models/Inquiry.model.js';
import dayjs from 'dayjs';

const getDashboardStats = async (range = 'month') => {
  const now = dayjs();
  const startDate = now.subtract(1, range).toDate();

  const [
    totalBookings,
    totalInquiries,
    recentBookings,
    recentInquiries,
    serviceStats
  ] = await Promise.all([
    Booking.countDocuments({ isDeleted: false }),
    Inquiry.countDocuments({ isDeleted: false }),
    Booking.countDocuments({ createdAt: { $gte: startDate }, isDeleted: false }),
    Inquiry.countDocuments({ createdAt: { $gte: startDate }, isDeleted: false }),
    Booking.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$serviceType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
  ]);

  // Conversion rate: Converted Inquiries / Total Inquiries
  const convertedInquiries = await Inquiry.countDocuments({ status: 'converted', isDeleted: false });
  const conversionRate = totalInquiries > 0 ? (convertedInquiries / totalInquiries) * 100 : 0;

  return {
    overview: {
      totalBookings,
      totalInquiries,
      recentBookings,
      recentInquiries,
      conversionRate: conversionRate.toFixed(2),
    },
    serviceStats,
    growth: {
      bookingsGrowth: totalBookings > 0 ? ((recentBookings / totalBookings) * 100).toFixed(2) : 0,
      inquiriesGrowth: totalInquiries > 0 ? ((recentInquiries / totalInquiries) * 100).toFixed(2) : 0,
    }
  };
};

export default {
  getDashboardStats,
};
