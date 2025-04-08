
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import DashboardCard from './DashboardCard';

// Sample data - in a real app, this would come from an API
const data = [
  { name: 'Available', value: 15000 },
  { name: 'Pending', value: 3500 },
  { name: 'Reserved', value: 2000 },
];

const COLORS = ['#8b5cf6', '#f59e0b', '#94a3b8'];

const AccountBalance = () => {
  // Calculate total balance
  const totalBalance = data.reduce((sum, entry) => sum + entry.value, 0);
  
  return (
    <DashboardCard title="Account Balance" subtitle="Current financial status">
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
