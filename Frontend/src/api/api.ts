import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from './models/ApiResponse';

const api = axios.create({
  baseURL: 'https://localhost:44330/api', // Altere para a URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Pega o token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para redirecionar em caso de erros 401 e 403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 401) {
        // Redirecionar para a página de login
        window.location.href = '/login';
      } else if (status === 403) {
        // Redirecionar para a dashboard
        window.location.href = '/dashboard';
      }
    }
    return Promise.reject(error);
  },
);

export const get = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error('Erro ao conectar com o servidor.');
  }
};

export const post = async <T = void, R = void>(url: string, data: R): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.post(url, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error('Erro ao conectar com o servidor.');
  }
};

export const put = async <T, R>(url: string, data: R): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.put(url, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error('Erro ao conectar com o servidor.');
  }
};

export const patch = async <T, R>(url: string, data: R): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.patch(url, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error('Erro ao conectar com o servidor.');
  }
};

export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.delete(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error('Erro ao conectar com o servidor.');
  }
};

export const getFile = async <T>(url: string, config?: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erro ao conectar com o servidor.');
    }
    throw new Error('Erro ao conectar com o servidor.');
  }
};

export const postFile = async <T = void, R = any>(url: string, data: R): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.post(url, data, {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error('Erro ao conectar com o servidor.');
  }
};
