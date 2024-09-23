import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {user && (
        <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <h1 className="text-2xl">PsychoCare</h1>
          <div className="relative">
            <FaUserCircle className="text-3xl cursor-pointer" />
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
              <p className="p-2 border-b">{user?.name}</p>
              <button
                className="w-full text-left p-2 hover:bg-gray-200"
                onClick={() => navigate('/change-password')}
              >
                Change Password
              </button>
              <button
                className="w-full text-left p-2 hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
