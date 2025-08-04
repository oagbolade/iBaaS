/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';
import {
  AuthFaBaseUrl,
  baseUrl,
  nipBaseUrl,
  reportsBaseUrl
} from './constants';
import { UserLoginResponse } from '@/api/ResponseTypes/login';
import { getStoredUser, USER_LOCALSTORAGE_KEY } from '@/utils/user-storage';
import { encryptData } from '@/utils/encryptData';
import { decryptData } from '@/utils/decryptData';

export const environment = process.env.NODE_ENV || 'production';

export function getJWTHeader(user: UserLoginResponse): Record<string, string> {
  return { Authorization: `Bearer ${user.token}` };
}

export function extendTokenExpirationTime(
  newTokenExpirationTime: string | null
): void {
  const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  const userObject = JSON.parse(decryptData(user as string) || '');
  userObject.tokenExpire = newTokenExpirationTime;
  const updatedUser = JSON.stringify(userObject);
  localStorage.setItem(USER_LOCALSTORAGE_KEY, String(encryptData(updatedUser)));
}

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  headers: {
    'Tenant-ID': getStoredUser()?.companyCode || ''
  }
};

export const axiosInstance = axios.create(config);

export const nipAxiosInstance = axios.create({
  baseURL: nipBaseUrl
});
export const AuthFaAxiosInstance = axios.create({
  baseURL: AuthFaBaseUrl
});

export const reportsAxiosInstance = axios.create({
  baseURL: reportsBaseUrl
});

// Any status code that lie within the range of 2xx causes this function to trigger
axiosInstance.interceptors.response.use(
  (response) => {
    const headers = response?.headers;

    if (
      headers instanceof AxiosHeaders &&
      headers.has('new-token-expiration-time')
    ) {
      const newTokenExpirationTime = headers['new-token-expiration-time'];
      extendTokenExpirationTime(newTokenExpirationTime);
    }

    if (environment === 'development') {
      console.log(
        'newTokenExpirationTime',
        response?.headers['new-token-expiration-time']
      );
    }

    return response;
  },
  (error) => {
    if (environment === 'development') {
      console.log('error', error);
    }

    return Promise.reject(error);
  }
);
