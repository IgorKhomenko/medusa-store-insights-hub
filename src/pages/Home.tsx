
import React from 'react';
import { Container } from '@medusajs/ui';
import Navbar from '@/components/layout/Navbar';
import RevenueChart from '@/components/dashboard/RevenueChart';
import OrdersChart from '@/components/dashboard/OrdersChart';
import AccountBalance from '@/components/dashboard/AccountBalance';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 pb-12">
        <header className="bg-white shadow">
          <Container>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
            </div>
          </Container>
        </header>
        <main>
          <Container>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
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
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Home;
