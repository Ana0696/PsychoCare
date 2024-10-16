import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DefaultLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const setSidebarFalse = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={setSidebarFalse} />
      <div className="flex flex-1 overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto mt-14 lg:ml-60">
          <div className="container min-h-full mx-auto px-4 py-6 bg-gray-100">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
