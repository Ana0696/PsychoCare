import React, { useState } from 'react';
import { login as loginApi } from '../../api/auth';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../common/Alert';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginApi({ email, password });
      if (response.success === true) {
        login(response.data);
        showAlert('Login successful!', 'success');
        navigate('/dashboard');
      } else {
        showAlert(response.message, 'error');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      showAlert('Login failed. Please check your credentials.', 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
