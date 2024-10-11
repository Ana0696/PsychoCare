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
        <header className="p-4 text-white flex justify-between items-center bg-gradient-to-tl from-gray-600 to-slate-700">
          <h1 className="text-2xl">PsychoCare</h1>
          <div className="flex flex-row gap-12">
            <div>data/hora</div>
            <div className="flex flex-row gap-6">
              <button className="flex">notification</button>
              <button className="flex">
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
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
