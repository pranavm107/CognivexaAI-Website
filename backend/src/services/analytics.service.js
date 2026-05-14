import Inquiry from '../models/inquiry.model.js';
import Booking from '../models/Booking.model.js';
import dayjs from 'dayjs';

/**
 * Get comprehensive operational report with advanced metrics
 */
export const getFullReport = async (range = '30') => {
  const days = parseInt(range, 10);
  const startDate = dayjs().subtract(days, 'day').startOf('day').toDate();
  const prevStartDate = dayjs().subtract(days * 2, 'day').startOf('day').toDate();

  // 1. Executive Funnel & Pipeline
  const funnel = await Inquiry.aggregate([
    { $match: { createdAt: { $gte: startDate }, isDeleted: false } },
    {
      $facet: {
        total: [{ $count: 'count' }],
        qualified: [{ $match: { status: { $in: ['qualified', 'discovery_scheduled', 'proposal_sent', 'converted'] } } }, { $count: 'count' }],
        converted: [{ $match: { status: 'converted' } }, { $count: 'count' }],
        lost: [{ $match: { status: 'lost' } }, { $count: 'count' }],
      }
    }
  ]);

  // 2. Booking Trends (Detailed)
  const bookingTrends = await Booking.aggregate([
    { $match: { createdAt: { $gte: startDate }, isDeleted: false } },
    {
      $group: {
        _id: { 
          $dateToString: { 
            format: days <= 7 ? '%Y-%m-%d %H:00' : '%Y-%m-%d', 
            date: '$createdAt' 
          } 
        },
        count: { $sum: 1 },
        revenue: { $sum: 500 } // Estimated $500 per booking for now
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // 3. Service Demand Intelligence
  const serviceDemand = await Booking.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: '$serviceType',
        count: { $sum: 1 },
        completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } }
      }
    },
    { $sort: { count: -1 } }
  ]);

  // 4. Peak Booking Hours (Heatmap data)
  const peakHours = await Booking.aggregate([
    { $match: { isDeleted: false } },
    {
      $project: {
        hour: { $hour: '$startTime' },
        dayOfWeek: { $dayOfWeek: '$startTime' }
      }
    },
    {
      $group: {
        _id: { hour: '$hour', day: '$dayOfWeek' },
        count: { $sum: 1 }
      }
    }
  ]);

  // 5. Operational Activity (Realtime Feed)
  const activityFeed = await Booking.find({ isDeleted: false })
    .sort({ updatedAt: -1 })
    .limit(10)
    .populate('assignedAdmin', 'firstName lastName');

  // 6. Growth Comparison
  const currentCount = await Booking.countDocuments({ createdAt: { $gte: startDate }, isDeleted: false });
  const prevCount = await Booking.countDocuments({ createdAt: { $gte: prevStartDate, $lt: startDate }, isDeleted: false });
  
  const growth = prevCount > 0 ? ((currentCount - prevCount) / prevCount) * 100 : 100;

  return {
    funnel: {
      total: funnel[0].total[0]?.count || 0,
      qualified: funnel[0].qualified[0]?.count || 0,
      converted: funnel[0].converted[0]?.count || 0,
      lost: funnel[0].lost[0]?.count || 0,
    },
    trends: bookingTrends.map(t => ({ timestamp: t._id, count: t.count, revenue: t.revenue })),
    services: serviceDemand.map(s => ({
      name: s._id || 'Unspecified',
      count: s.count,
      rate: s.count > 0 ? ((s.completed / s.count) * 100).toFixed(1) : 0
    })),
    peakHours: peakHours.map(p => ({ hour: p._id.hour, day: p._id.day, count: p.count })),
    activity: activityFeed,
    growth: growth.toFixed(1),
    revenue: bookingTrends.reduce((acc, t) => acc + t.revenue, 0)
  };
};
