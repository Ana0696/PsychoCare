import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/common/Header';
import { AuthProvider } from './context/AuthContext';
import Alert from './components/common/Alert';
import AppRoutes from './routes/Routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Alert />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
