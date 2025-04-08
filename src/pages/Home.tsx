
import React from 'react';
import { Container, Heading } from '@medusajs/ui';
import RevenueChart from '@/components/dashboard/RevenueChart';
import OrdersChart from '@/components/dashboard/OrdersChart';
import AccountBalance from '@/components/dashboard/AccountBalance';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <Heading level="h1" className="text-gray-900">Dashboard</Heading>
              <div className="flex space-x-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Store Online
                </span>
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-medusa-primary hover:bg-medusa-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medusa-accent"
                >
                  Refresh Data
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <RevenueChart />
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <OrdersChart />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <AccountBalance />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
