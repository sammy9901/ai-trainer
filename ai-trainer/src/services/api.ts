import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
});

