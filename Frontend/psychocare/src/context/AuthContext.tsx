import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../models/User';
import { LoginResponse } from '../api/models/Auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (loginResponse: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (user && token) {
      setUser(JSON.parse(storedUser as string));
      setToken(storedToken);
    }
  }, []);

  const login = (data: LoginResponse) => {
    setUser({
      name: data.name,
      surname: data.surname,
      email: data.email,
      role: data.role,
    });
    setToken(data.token);
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
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
