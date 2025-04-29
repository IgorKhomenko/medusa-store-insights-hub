
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import DashboardCard from './DashboardCard';
import { TimeRange } from './TimeRangeSelector';
import { subDays, subYears, startOfDay } from 'date-fns';

// Full balance data by date (simulated)
const balanceHistory = [
  // Last year
  { date: new Date('2024-04-29'), available: 10000, pending: 2500, reserved: 1500 },
  { date: new Date('2024-07-15'), available: 12000, pending: 3000, reserved: 1800 },
  { date: new Date('2024-10-01'), available: 14000, pending: 3200, reserved: 1900 },
  { date: new Date('2025-01-15'), available: 15000, pending: 3500, reserved: 2000 },
  // Recent days (last 30 days)
  ...Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), i);
    const baseAvailable = 15000 + Math.floor(Math.random() * 1000);
    const basePending = 3500 + Math.floor(Math.random() * 500);
    const baseReserved = 2000 + Math.floor(Math.random() * 300);
    
    return {
      date,
      available: baseAvailable,
      pending: basePending,
      reserved: baseReserved,
    };
  })
];

interface AccountBalanceProps {
  timeRange: TimeRange;
  customRange?: { from: Date; to: Date };
}

const AccountBalance = ({ timeRange, customRange }: AccountBalanceProps) => {
  const filteredData = useMemo(() => {
    const today = startOfDay(new Date());
    
    switch (timeRange) {
      case 'today':
        return balanceHistory.filter(item => 
          item.date.getDate() === today.getDate() &&
          item.date.getMonth() === today.getMonth() &&
          item.date.getFullYear() === today.getFullYear()
        )[0] || balanceHistory[0];
      case 'last7days':
        const last7Days = subDays(today, 7);
        return balanceHistory.filter(item => item.date >= last7Days).pop() || balanceHistory[0];
      case 'last30days':
        const last30Days = subDays(today, 30);
        return balanceHistory.filter(item => item.date >= last30Days).pop() || balanceHistory[0];
      case 'lastyear':
        const lastYear = subYears(today, 1);
        return balanceHistory.filter(item => item.date >= lastYear).pop() || balanceHistory[0];
      case 'custom':
        if (customRange?.from && customRange?.to) {
          const filteredByDate = balanceHistory.filter(
            item => item.date >= customRange.from && item.date <= customRange.to
          );
          return filteredByDate.pop() || balanceHistory[0];
        }
        return balanceHistory[0];
      default:
        return balanceHistory[0];
    }
  }, [timeRange, customRange]);
  
  const data = useMemo(() => [
    { name: 'Available', value: filteredData?.available || 15000 },
    { name: 'Pending', value: filteredData?.pending || 3500 },
    { name: 'Reserved', value: filteredData?.reserved || 2000 },
  ], [filteredData]);
  
  const COLORS = ['#8b5cf6', '#f59e0b', '#94a3b8'];
  
  // Calculate total balance
  const totalBalance = data.reduce((sum, entry) => sum + entry.value, 0);
  
  return (
    <DashboardCard title="Account Balance" subtitle="Financial status for selected period">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-1">
          <div className="mb-4 space-y-4">
            <div className="bg-medusa-light-bg rounded-lg p-4">
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-3xl font-bold">${totalBalance.toLocaleString()}</p>
            </div>
            
            {data.map((entry, index) => (
              <div key={`balance-item-${index}`} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{entry.name}</span>
                </div>
                <span className="font-semibold">${entry.value.toLocaleString()}</span>
              </div>
            ))}
            
            <div className="mt-4 p-4 border border-dashed border-medusa-accent rounded-lg">
              <h4 className="font-semibold mb-2">Need to withdraw funds?</h4>
              <p className="text-sm text-gray-600 mb-4">You can request a payout of your available balance.</p>
              <button 
                className="bg-medusa-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all"
              >
                Request Payout
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 h-[300px] mb-6 md:mb-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value}`, '']}
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              />
              <Legend 
                formatter={(value) => <span className="text-sm">{value}</span>}
                layout="horizontal" 
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardCard>
  );
};

export default AccountBalance;
