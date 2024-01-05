import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from './constants';
import { UserLoginResponse } from '@/constants/Responses';

export function getJWTHeader(user: UserLoginResponse): Record<string, string> {
  return { Authorization: `Bearer ${user.token}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
