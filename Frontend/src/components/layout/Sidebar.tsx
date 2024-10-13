import React from 'react';
import SidebarItem from './SidebarItem';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {isAuthenticated() && (
        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
          onClick={toggleSidebar}
        >
          <div className="h-full w-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <SidebarItem icon={<PersonAddIcon />} label="Dashboard" onClick={() => navigate('/dashboard')} />
              <SidebarItem
                icon={<PersonAddIcon />}
                label="Gestão de usuários"
                onClick={() => navigate('/user-management')}
              />
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
