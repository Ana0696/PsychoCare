import React, { useState } from 'react';
import { login as loginApi } from '../../api/auth';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../components/common/Alert';

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
        navigate('/user-management');
      } else {
        showAlert(response.message, 'error');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      showAlert('Login failed. Please check your credentials.', 'error');
    }
  };

  return (
    <div className="flex justify-around items-center min-h-screen gap-12 bg-gradient-to-tl from-emerald-300 to-slate-400">
      <div className="bg-gray-100 flex justify-center justify-items-center w-72 h-60 ml-24 rounded-lg p-1 shadow-md">
        <h2 className="self-center font-medium font-serif">Welcome text</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col p-6 rounded-lg shadow-md min-w-96 min-h-96"
      >
        <h2 className="text-2xl mb-4 text-center font-medium">Login</h2>
        <div className="flex-col justify-center justify-items-center">
          <div className="justify-between self-center gap-1">
            <h2 className="mb-1">Email:</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full mb-4 p-2 border rounded"
            />
            <h2 className="mb-1">Senha:</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
              className="w-full mb-4 p-2 border rounded"
            />
          </div>

          <div className="flex justify-end">
            <span
              onClick={() => alert('')}
              className="w-full text-cyan-500 flex-1 text-right text-sm hover:underline cursor-pointer"
            >
              Esqueceu sua senha?
            </span>
          </div>
        </div>
        <div className="flex-1 gap-2 mt-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-cyan-700 text-white p-2 rounded"
          >
            Login
          </button>
          <button
            type="submit"
            className="w-full text-black p-2 rounded underline"
          >
            Criar nova conta
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
      <div className=" flex justify-center justify-items-center justify-self-center w-72 h-60 mr-10 rounded-lg p-1">
        <h2 className="self-center">image</h2>
      </div>
    </div>
  );
};

export default Login;
