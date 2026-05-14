import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';

const StatCard = ({ title, value, trend, trendValue, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={cn("p-2 rounded-xl", color)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
        trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
      )}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trendValue}
      </div>
    </div>
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
  </div>
);

const DashboardPage = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: () => apiClient.get('/dashboard/stats'),
  });

  const chartData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 600 },
    { name: 'Thu', value: 800 },
    { name: 'Fri', value: 500 },
    { name: 'Sat', value: 900 },
    { name: 'Sun', value: 700 },
  ];

  if (isLoading) return <div>Loading dashboard...</div>;

  const dashboardData = stats || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Overview</h1>
          <p className="text-slate-500 font-medium">Real-time performance and operational insights.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 24 hours</option>
          </select>
          <Link 
            to="/admin/analytics/report"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
          >
            View Full Report
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Bookings" 
          value={dashboardData.overview?.totalBookings || 0} 
          trend="up" 
          trendValue="Live" 
          icon={Calendar}
          color="bg-indigo-600"
        />
        <StatCard 
          title="Leads / Inquiries" 
          value={dashboardData.overview?.totalInquiries || 0} 
          trend="up" 
          trendValue="Live" 
          icon={MessageSquare}
          color="bg-purple-600"
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${dashboardData.overview?.conversionRate || 0}%`} 
          trend="up" 
          trendValue="Active" 
          icon={TrendingUp}
          color="bg-blue-600"
        />
        <StatCard 
          title="Active Meetings" 
          value={dashboardData.overview?.activeMeetings || 0} 
          trend="up" 
          trendValue="Current" 
          icon={ArrowUpRight}
          color="bg-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900">Operational Trends</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-600" />
                <span className="text-xs font-medium text-slate-500">Bookings</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Service Demand</h3>
          <div className="flex-1 space-y-6">
            {(dashboardData.serviceDemand || []).map((service, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-700">{service.name}</span>
                  <span className="text-slate-900">{service.value}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                    style={{ width: `${(service.value / (dashboardData.overview?.totalBookings || 1)) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 px-4 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            View full report
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
