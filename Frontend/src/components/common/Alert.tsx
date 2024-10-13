import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert: React.FC = () => {
  return <ToastContainer />;
};

export const showAlert = (message: string, type: 'success' | 'error') => {
  if (type === 'success') {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

export default Alert;
