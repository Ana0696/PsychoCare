import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from './models/ApiResponse';

const api = axios.create({
  baseURL: 'https://localhost:44330/api', // Altere para a URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

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
