import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';
import {
  baseUrl,
  nipBaseUrl,
  REPORT_BASE_URL,
  imageUploadBaseUrl,
  Auth2FABaseUrl,
  END_OF_DAY_BASE_URL
} from './constants';
import { UserLoginResponse } from '@/api/ResponseTypes/login';
import { getStoredUser, USER_LOCALSTORAGE_KEY } from '@/utils/user-storage';
import { encryptData } from '@/utils/encryptData';
import { decryptData } from '@/utils/decryptData';

export const environment = process.env.NODE_ENV || 'production' || 'UAT';

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

const tenantID: AxiosRequestConfig = {
  headers: {
    'Tenant-ID': getStoredUser()?.companyCode || ''
  }
};

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  ...tenantID
});

export const nipAxiosInstance = axios.create({
  baseURL: nipBaseUrl
});

export const Auth2FaAxiosInstance = axios.create({
  baseURL: Auth2FABaseUrl
});

export const ImageUploadAxiosInstance = axios.create({
  baseURL: imageUploadBaseUrl
});

export const EndOfDayAxiosInstance = axios.create({
  baseURL: END_OF_DAY_BASE_URL
});

export const reportsAxiosInstance = axios.create({
  baseURL: REPORT_BASE_URL,
  ...tenantID
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
