
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, Users, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <span className="font-bold text-lg text-medusa-primary">Medusa Store</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-medusa-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Home className="mr-2 h-4 w-4" /> Dashboard
              </Link>
              <Link
                to="/orders"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Orders
              </Link>
              <Link
                to="/customers"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Users className="mr-2 h-4 w-4" /> Customers
              </Link>
              <Link
                to="/settings"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div>
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medusa-primary">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-medusa-accent flex items-center justify-center text-medusa-primary font-bold">
                    MS
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
