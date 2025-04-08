
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data - in a real app, this would come from an API
const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Aug', revenue: 4000 },
  { name: 'Sep', revenue: 6000 },
  { name: 'Oct', revenue: 7000 },
  { name: 'Nov', revenue: 5500 },
  { name: 'Dec', revenue: 8000 },
];

const RevenueChart = () => {
  const isMobile = useIsMobile();
  
  // Calculate total revenue and monthly average
  const totalRevenue = data.reduce((sum, entry) => sum + entry.revenue, 0);
  const averageRevenue = Math.round(totalRevenue / data.length);
  
  // Calculate growth (comparing last month to previous month)
  const lastMonthRevenue = data[data.length - 1].revenue;
  const previousMonthRevenue = data[data.length - 2].revenue;
  const growthRate = Math.round(((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100);
  
  return (
    <DashboardCard title="Revenue" subtitle="Monthly revenue overview">
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-medusa-light-bg rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-medusa-light-bg rounded-lg p-4">
          <p className="text-sm text-gray-500">Monthly Average</p>
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
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
              tick={{ fill: '#888' }}
              tickMargin={8}
              height={30}
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`} 
              tick={{ fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888' }}
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
      </div>
    </DashboardCard>
  );
};

export default RevenueChart;
