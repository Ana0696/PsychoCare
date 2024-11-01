import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { LoginRequest } from '../../api/models/Auth';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../api/requests/auth';
import { showAlert } from '../../components/common/Alert';

interface LoginValues extends LoginRequest {
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const initialValues: LoginValues = { email: '', password: '', rememberMe: true };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
  });

  const handleSubmit = async (values: LoginValues) => {
    try {
      const response = await loginApi(values);
      if (response.success === true) {
        login(response.data!, values.rememberMe);
        navigate('/dashboard');
      } else if (response.message) {
        showAlert(response.message, 'error');
      } else {
        showAlert('Falha no login. Por favor, verifique suas credenciais.', 'error');
      }
    } catch (error) {
      showAlert('Falha no login. Por favor, verifique suas credenciais.', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Faça login na sua conta</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-600" />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Senha"
                />
                <ErrorMessage name="password" component="div" className="text-red-600" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Field
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="rememberMe" className="block ml-2 text-sm text-gray-900">
                  Lembre-se de mim
                </label>
              </div>

              <div className="text-sm">
                <button className="font-medium text-cyan-700 hover:text-slate-800">Esqueceu sua senha?</button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-slate-900 border border-transparent rounded-md shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
