import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Unauthorized from '../pages/Unauthorized';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import { UserRole } from '../models/User';
import useAuth from '../hooks/useAuth';
import Screening from '../pages/screening/Screening';
import NavBar from '../components/common/NavBar';
import List from '../pages/user-management/List';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              UserRole.intern,
              UserRole.secretary,
              UserRole.psychologist,
              UserRole.supervisor,
            ]}
          />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route
        element={
          <ProtectedRoute
            allowedRoles={[UserRole.secretary, UserRole.psychologist]}
          />
        }
      >
        <Route path="/user-management" element={<List />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
