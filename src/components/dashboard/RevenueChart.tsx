
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { TimeRange } from './TimeRangeSelector';
import { subDays, subYears, startOfDay, format } from 'date-fns';

// Full year data
const fullData = [
  { date: new Date('2025-01-01'), name: 'Jan', revenue: 4000 },
  { date: new Date('2025-02-01'), name: 'Feb', revenue: 3000 },
  { date: new Date('2025-03-01'), name: 'Mar', revenue: 5000 },
  { date: new Date('2025-04-01'), name: 'Apr', revenue: 2780 },
  { date: new Date('2025-05-01'), name: 'May', revenue: 1890 },
  { date: new Date('2025-06-01'), name: 'Jun', revenue: 2390 },
  { date: new Date('2025-07-01'), name: 'Jul', revenue: 3490 },
  { date: new Date('2025-08-01'), name: 'Aug', revenue: 4000 },
  { date: new Date('2025-09-01'), name: 'Sep', revenue: 6000 },
  { date: new Date('2025-10-01'), name: 'Oct', revenue: 7000 },
  { date: new Date('2025-11-01'), name: 'Nov', revenue: 5500 },
  { date: new Date('2025-12-01'), name: 'Dec', revenue: 8000 },
  // More detailed data for recent days
  ...Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), i);
    return {
      date,
      name: format(date, 'MMM dd'),
      revenue: Math.floor(Math.random() * 3000) + 1000
    };
  })
];

interface RevenueChartProps {
  timeRange: TimeRange;
  customRange?: { from: Date; to: Date };
}

const RevenueChart = ({ timeRange, customRange }: RevenueChartProps) => {
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
  
  // Calculate total revenue and monthly average
  const totalRevenue = filteredData.reduce((sum, entry) => sum + entry.revenue, 0);
  const averageRevenue = Math.round(totalRevenue / (filteredData.length || 1));
  
  // Calculate growth (comparing last month to previous month)
  const lastMonthRevenue = filteredData.length > 0 ? filteredData[filteredData.length - 1].revenue : 0;
  const previousMonthRevenue = filteredData.length > 1 ? filteredData[filteredData.length - 2].revenue : lastMonthRevenue || 1;
  const growthRate = Math.round(((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100);
  
  return (
    <DashboardCard title="Revenue" subtitle="Revenue overview for selected period">
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-medusa-light-bg rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-medusa-light-bg rounded-lg p-4">
          <p className="text-sm text-gray-500">Average Revenue</p>
          <p className="text-2xl font-bold">${averageRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-medusa-light-bg rounded-lg p-4">
          <p className="text-sm text-gray-500">Growth</p>
          <p className={`text-2xl font-bold ${growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {growthRate >= 0 ? '+' : ''}{growthRate}%
          </p>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis 
                tickFormatter={(value) => `$${value}`} 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                width={isMobile ? 40 : 60}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Revenue']}
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8b5cf6" 
                fillOpacity={1} 
                fill="url(#revenueGradient)" 
                strokeWidth={2}
              />
            </AreaChart>
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

export default RevenueChart;
