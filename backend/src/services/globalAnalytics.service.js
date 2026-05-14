import Project from '../models/Project.model.js';
import User from '../models/User.model.js';
import Client from '../models/Client.model.js';
import Invoice from '../models/Invoice.model.js';
import ActivityLog from '../models/ActivityLog.model.js';
import redisService from './redis.service.js';

/**
 * Global Operational Analytics Service
 * Provides deep insights into business health and operations.
 */
class GlobalAnalyticsService {
  /**
   * Aggregates global business metrics
   */
  async getGlobalMetrics() {
    try {
      const CACHE_KEY = 'analytics:global';
      const cachedData = await redisService.get(CACHE_KEY);
      if (cachedData) return cachedData;

      const [projects, organizations, invoices, recentActivities, securityLogs] = await Promise.all([
        Project.find({ isDeleted: false }),
        Client.find({ isDeleted: false }),
        Invoice.find({ isDeleted: false }),
        ActivityLog.find({ entityType: { $ne: 'Security' } })
          .sort({ createdAt: -1 })
          .limit(20)
          .populate('actorId', 'firstName lastName avatar')
          .populate('clientId', 'companyName'),
        ActivityLog.find({ entityType: 'Security' }).sort({ createdAt: -1 }).limit(20)
      ]);

      const totalRevenue = invoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.totalAmount, 0);

      const mrr = invoices
        .filter(inv => inv.status === 'paid' && inv.isRecurring)
        .reduce((sum, inv) => sum + inv.totalAmount, 0);

      const activeProjects = projects.filter(p => p.status !== 'completed' && p.status !== 'on_hold');
      const completedProjects = projects.filter(p => p.status === 'completed');

      const projectHealthAvg = projects.length > 0
        ? projects.reduce((sum, p) => sum + (p.healthScore || 100), 0) / projects.length
        : 100;

      // Simulated health telemetry (In prod, check service pings)
      const systemHealth = {
        api: 'healthy',
        database: 'healthy',
        socket: 'healthy',
        latency: Math.floor(Math.random() * 50) + 20 + 'ms'
      };

      const result = {
        revenue: {
          total: totalRevenue,
          mrr,
          arr: mrr * 12,
          outstanding: invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.totalAmount, 0)
        },
        operations: {
          activeProjects: activeProjects.length,
          completedProjects: completedProjects.length,
          activeClients: organizations.length,
          averageProjectValue: totalRevenue / (projects.length || 1),
          globalHealthScore: Math.round(projectHealthAvg)
        },
        systemStatus: systemHealth,
        realtimeFeed: recentActivities,
        securityFeed: securityLogs
      };

      await redisService.set(CACHE_KEY, result, 300);

      return result;
    } catch (error) {
      console.error('Error fetching global metrics:', error);
      throw error;
    }
  }

  /**
   * Advanced financial and retention metrics
   */
  async getRetentionMetrics() {
    const clients = await User.find({ role: { $in: ['client', 'client_admin'] }, isDeleted: false });
    const invoices = await Invoice.find({ status: 'paid', isDeleted: false });
    
    const totalRevenue = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
    const avgRevenuePerClient = totalRevenue / (clients.length || 1);
    
    // Simplified churn (simulated for demo)
    const churnRate = 2.4; // 2.4%
    const ltv = avgRevenuePerClient / (churnRate / 100);

    return {
      churnRate: `${churnRate}%`,
      ltv: Math.round(ltv),
      cac: 450, // Simulated
      paybackPeriod: '4.2 months'
    };
  }

  /**
   * Generates time-series data for revenue and growth
   */
  async getRevenueTrends(days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const trends = await Invoice.aggregate([
      { $match: { createdAt: { $gte: startDate }, status: 'paid', isDeleted: false } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    return trends;
  }
}

export default new GlobalAnalyticsService();
