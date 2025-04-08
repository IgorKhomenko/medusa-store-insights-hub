
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data - in a real app, this would come from an API
const data = [
  { name: 'Jan', completed: 40, pending: 24, canceled: 6 },
  { name: 'Feb', completed: 30, pending: 13, canceled: 5 },
  { name: 'Mar', completed: 50, pending: 22, canceled: 8 },
  { name: 'Apr', completed: 27, pending: 11, canceled: 4 },
  { name: 'May', completed: 18, pending: 9, canceled: 3 },
  { name: 'Jun', completed: 23, pending: 15, canceled: 2 },
  { name: 'Jul', completed: 34, pending: 18, canceled: 5 },
  { name: 'Aug', completed: 50, pending: 30, canceled: 10 },
];

const OrdersChart = () => {
  const isMobile = useIsMobile();
  
  // Calculate total orders
  const totalCompleted = data.reduce((sum, entry) => sum + entry.completed, 0);
  const totalPending = data.reduce((sum, entry) => sum + entry.pending, 0);
  const totalCanceled = data.reduce((sum, entry) => sum + entry.canceled, 0);
  const totalOrders = totalCompleted + totalPending + totalCanceled;
  
  // Calculate completion rate
  const completionRate = Math.round((totalCompleted / totalOrders) * 100);
  
  return (
    <DashboardCard title="Orders" subtitle="Monthly order statistics">
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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
      </div>
    </DashboardCard>
  );
};

export default OrdersChart;
