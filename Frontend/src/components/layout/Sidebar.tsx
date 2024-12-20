import React from 'react';
import SidebarItem from './SidebarItem';
import GridViewIcon from '@mui/icons-material/GridView';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ChairIcon from '@mui/icons-material/Chair';
import AssessmentIcon from '@mui/icons-material/Assessment';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../models/Enums';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated, user } = useAuth();
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
              {user?.role &&
                (user.role === UserRole.manager ||
                  user.role === UserRole.secretary ||
                  user.role === UserRole.supervisor) && (
                  <SidebarItem
                    icon={<PersonAddIcon />}
                    label="Gestão de usuários"
                    onClick={() => navigate('/user-management')}
                  />
                )}
              {user?.role &&
                (user.role === UserRole.manager ||
                  user.role === UserRole.secretary ||
                  user.role === UserRole.intern) && (
                  <>
                    <SidebarItem
                      icon={<AssignmentTurnedInIcon />}
                      label="Triagens"
                      onClick={() => navigate('/screening')}
                    />
                    <SidebarItem
                      icon={<InsertInvitationIcon />}
                      label="Agenda"
                      onClick={() => navigate('/appointments')}
                    />
                    <SidebarItem icon={<ContentPasteIcon />} label="Pastas" onClick={() => navigate('/patient')} />
                  </>
                )}

              {user?.role && (user.role === UserRole.manager || user.role === UserRole.secretary) && (
                <SidebarItem icon={<ChairIcon />} label="Salas" onClick={() => navigate('/room')} />
              )}

              {user?.role && (user.role === UserRole.manager || user.role === UserRole.supervisor) && (
                <SidebarItem icon={<AssessmentIcon />} label="Relatório" onClick={() => navigate('/report')} />
              )}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
