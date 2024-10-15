import React from 'react';
import { Outlet } from 'react-router-dom';

const SimpleLayout: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

export default SimpleLayout;
