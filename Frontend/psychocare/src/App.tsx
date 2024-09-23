import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Login from './components/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Alert from './components/common/Alert';
import { UserRole } from './models/User';
import Unauthorized from './pages/Unauthorized';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Alert />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<ProtectedRoute allowedRoles={[UserRole.intern]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
