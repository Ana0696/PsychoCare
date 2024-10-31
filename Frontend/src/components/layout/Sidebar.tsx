import React from 'react';
import SidebarItem from './SidebarItem';
import GridViewIcon from '@mui/icons-material/GridView';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
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
          className={`fixed top-0 left-0 z-40 w-60 h-screen pt-20 transition-transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 bg-white border-r border-gray-200 dark:bg-slate-900 dark:border-slate-900`}
          aria-label="Sidebar"
          onClick={toggleSidebar}
        >
          <div className="h-full w-full px-3 pb-4 overflow-y-auto bg-white dark:bg-slate-900 ">
            <ul className="space-y-2 font-medium">
              <SidebarItem icon={<GridViewIcon />} label="Dashboard" onClick={() => navigate('/dashboard')} />
              <SidebarItem
                icon={<PersonAddIcon />}
                label="Gestão de usuários"
                onClick={() => navigate('/user-management')}
              />
              <SidebarItem icon={<AssignmentTurnedInIcon />} label="Triagem" onClick={() => navigate('/screening')} />
              <SidebarItem icon={<InsertInvitationIcon />} label="Agenda" onClick={() => navigate('/agenda')} />
              <SidebarItem icon={<ContentPasteIcon />} label="Pastas" onClick={() => navigate('/folders')} />
              <SidebarItem icon={<LocalAtmIcon />} label="Financeiro" onClick={() => navigate('/financial')} />
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
