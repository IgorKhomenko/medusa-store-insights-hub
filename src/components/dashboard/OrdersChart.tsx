
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { TimeRange } from './TimeRangeSelector';
import { subDays, subYears, startOfDay, format } from 'date-fns';

// Full year data
const fullData = [
  { date: new Date('2025-01-01'), name: 'Jan', completed: 40, pending: 24, canceled: 6 },
  { date: new Date('2025-02-01'), name: 'Feb', completed: 30, pending: 13, canceled: 5 },
  { date: new Date('2025-03-01'), name: 'Mar', completed: 50, pending: 22, canceled: 8 },
  { date: new Date('2025-04-01'), name: 'Apr', completed: 27, pending: 11, canceled: 4 },
  { date: new Date('2025-05-01'), name: 'May', completed: 18, pending: 9, canceled: 3 },
  { date: new Date('2025-06-01'), name: 'Jun', completed: 23, pending: 15, canceled: 2 },
  { date: new Date('2025-07-01'), name: 'Jul', completed: 34, pending: 18, canceled: 5 },
  { date: new Date('2025-08-01'), name: 'Aug', completed: 50, pending: 30, canceled: 10 },
  // More detailed data for recent days
  ...Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), i);
    return {
      date,
      name: format(date, 'MMM dd'),
      completed: Math.floor(Math.random() * 10) + 5,
      pending: Math.floor(Math.random() * 5) + 2,
      canceled: Math.floor(Math.random() * 3)
    };
  })
];

interface OrdersChartProps {
  timeRange: TimeRange;
  customRange?: { from: Date; to: Date };
}

const OrdersChart = ({ timeRange, customRange }: OrdersChartProps) => {
  const isMobile = useIsMobile();
  
  const filteredData = useMemo(() => {
    const today = startOfDay(new Date());
    
    switch (timeRange) {
      case 'today':
        return fullData.filter(item => 
          item.date.getDate() === today.getDate() &&
          item.date.getMonth() === today.getMonth() &&
          item.date.getFullYear() === today.getFullYear()
        );
      case 'last7days':
        const last7Days = subDays(today, 7);
        return fullData.filter(item => item.date >= last7Days);
      case 'last30days':
        const last30Days = subDays(today, 30);
        return fullData.filter(item => item.date >= last30Days);
      case 'lastyear':
        const lastYear = subYears(today, 1);
        return fullData.filter(item => item.date >= lastYear);
      case 'custom':
        if (customRange?.from && customRange?.to) {
          return fullData.filter(
            item => item.date >= customRange.from && item.date <= customRange.to
          );
        }
        return fullData;
      default:
        return fullData;
    }
  }, [timeRange, customRange]);
  
  // Calculate total orders
  const totalCompleted = filteredData.reduce((sum, entry) => sum + entry.completed, 0);
  const totalPending = filteredData.reduce((sum, entry) => sum + entry.pending, 0);
  const totalCanceled = filteredData.reduce((sum, entry) => sum + entry.canceled, 0);
  const totalOrders = totalCompleted + totalPending + totalCanceled;
  
  // Calculate completion rate
  const completionRate = totalOrders > 0 ? Math.round((totalCompleted / totalOrders) * 100) : 0;
  
  return (
    <DashboardCard title="Orders" subtitle="Order statistics for selected period">
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-medusa-light-bg rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-medusa-light-bg rounded-lg p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-500">{totalCompleted}</p>
        </div>
        <div className="bg-medusa-light-bg rounded-lg p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-500">{totalPending}</p>
        </div>
        <div className="bg-medusa-light-bg rounded-lg p-4">
          <p className="text-sm text-gray-500">Completion Rate</p>
          <p className="text-2xl font-bold text-medusa-primary">{completionRate}%</p>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                width={isMobile ? 30 : 40}
              />
              <Tooltip
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              />
              <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="canceled" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-gray-500">No data available for selected period</p>
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default OrdersChart;
