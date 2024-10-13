import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../models/User';
import { LoginResponse } from '../api/models/Auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (loginResponse: LoginResponse, rememberMe: boolean) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser as string));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (data: LoginResponse, rememberMe: boolean) => {
    setUser({
      name: data.name,
      surname: data.surname,
      email: data.email,
      role: data.role,
    });
    setToken(data.token);
    if (rememberMe) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: data.name,
          surname: data.surname,
          email: data.email,
          role: data.role,
        }),
      );
      localStorage.setItem('token', data.token);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
