
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
            <Heading level="h1" className="text-gray-900 mb-8">Home</Heading>
            
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
