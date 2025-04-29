
import React, { useState } from 'react';
import { Container, Heading } from '@medusajs/ui';
import RevenueChart from '@/components/dashboard/RevenueChart';
import OrdersChart from '@/components/dashboard/OrdersChart';
import AccountBalance from '@/components/dashboard/AccountBalance';
import TimeRangeSelector, { TimeRange } from '@/components/dashboard/TimeRangeSelector';

const Home = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('last30days');
  const [customRange, setCustomRange] = useState<{ from: Date; to: Date } | undefined>(undefined);

  const handleTimeRangeChange = (range: TimeRange, custom?: { from: Date; to: Date }) => {
    setTimeRange(range);
    if (custom) {
      setCustomRange(custom);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <Heading level="h1" className="text-gray-900 mb-4 md:mb-0">Home</Heading>
              <TimeRangeSelector 
                value={timeRange}
                customRange={customRange}
                onChange={handleTimeRangeChange}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <RevenueChart timeRange={timeRange} customRange={customRange} />
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <OrdersChart timeRange={timeRange} customRange={customRange} />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <AccountBalance timeRange={timeRange} customRange={customRange} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
