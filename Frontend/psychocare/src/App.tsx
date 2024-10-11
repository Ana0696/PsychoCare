import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/common/Header';
import { AuthProvider } from './context/AuthContext';
import Alert from './components/common/Alert';
import AppRoutes from './routes/Routes';
import NavBar from './components/common/NavBar';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Alert />
        <NavBar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
