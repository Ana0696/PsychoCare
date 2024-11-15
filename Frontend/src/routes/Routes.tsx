import { Navigate, Route, Routes } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import useAuth from '../hooks/useAuth';
import Login from '../pages/login/Login';
import DefaultLayout from '../components/layout/DefaultLayout';
import SimpleLayout from '../components/layout/SimpleLayout';
import CreateUser from '../pages/user-management/CreateUser';
import EditUser from '../pages/user-management/EditUser';
import { UserRole } from '../models/Enums';
import ListUser from '../pages/user-management/ListUser';
import ListScreening from '../pages/screening/ListScreening';
import ListRoom from '../pages/room/ListRoom';
import CreateRoom from '../pages/room/CreateRoom';
import EditRoom from '../pages/room/EditRoom';
import ListPatient from '../pages/patient/ListPatient';
import CreatePatient from '../pages/patient/CreatePatient';
import ViewPatient from '../pages/patient/ViewPatient';
import Calendar from '../pages/appointment/Calendar';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>carregando...</div>;
  }

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[UserRole.intern, UserRole.secretary, UserRole.manager, UserRole.supervisor]}
            />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[UserRole.secretary, UserRole.manager]} />}>
          <Route path="/room" element={<ListRoom />} />
          <Route path="/room/create" element={<CreateRoom />} />
          <Route path="/room/edit/:id" element={<EditRoom />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[UserRole.secretary, UserRole.manager, UserRole.supervisor]} />}>
          <Route path="/user-management" element={<ListUser />} />
          <Route path="/user-management/create" element={<CreateUser />} />
          <Route path="/user-management/edit/:id" element={<EditUser />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[UserRole.secretary, UserRole.manager, UserRole.intern]} />}>
          <Route path="/screening" element={<ListScreening />} />
          <Route path="/patient" element={<ListPatient />} />
          <Route path="/patient/create" element={<CreatePatient />} />
          <Route path="/patient/:id" element={<ViewPatient />} />
          <Route path="/appointments" element={<Calendar />} />
        </Route>
      </Route>

      <Route element={<SimpleLayout />}>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
};

export default AppRoutes;
