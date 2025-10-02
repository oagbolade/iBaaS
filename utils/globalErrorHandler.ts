import { AlertColor } from '@mui/material';
import axios from 'axios';
import { clearStoredUser } from './user-storage';
import { statusCodes } from '@/api/ResponseTypes/StatusCodes';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';

type GlobalError = { message: string; title: string; severity: AlertColor };
const ERROR_CODES = [
  -1,
  '-1',
  '-40',
  '10',
  '1000',
  '-1000',
  '20',
  '30',
  '11',
  '12',
  '13',
  '14',
  '15',
  '17',
  '18',
  '101',
  '150',
  '160',
  '165',
  '153',
  '409'
];

export const SUCCESS_CODES = [0, '0', '00', '20', 200];

export const globalErrorHandler = (
  data: APIResponse = {},
  errorResponse: any = {}
): GlobalError => {
  const severity: AlertColor = 'error';
  const SERVER_ERROR_TITLE = 'Server Error';
  const SERVER_ERROR = 'There was an error contacting the server.';

  // handle search endpoint error
  if (
    data.isSearch &&
    axios.isAxiosError(errorResponse) &&
    errorResponse?.response?.data?.error
  ) {
    const message =
      errorResponse?.response?.data?.message || SERVER_ERROR_TITLE;
    const title = errorResponse?.response?.data?.error || SERVER_ERROR;
    return { message, title, severity };
  }

  // handle search endpoint success
  if (data.isSearch && data?.data && data) {
    const message = 'Data retrieved successfully';
    const title = 'Successful';
    return { message, title, severity: 'success' };
  }

  // handle search endpoint invalid token
  if (
    data.isSearch &&
    errorResponse?.response?.data?.message === 'Invalid token'
  ) {
    const message = 'Invalid Token';
    const title = 'Unauthorized Access';
    return { message, title, severity };
  }

  if (data.responseCode === statusCodes.UNAUTHORIZED) {
    const message = data.responseDescription || 'Unauthorized';
    const title = 'Unauthorised User, please try again';
    return { message, title, severity };
  }

  if (ERROR_CODES.includes(data?.responseCode as string | number)) {
    const message =
      data.responseDescription ||
      data.ResponseDescription ||
      data.responseMessage ||
      'An error occured';
    const title = 'An Error Occured';
    return { message, title, severity };
  }

  if (SUCCESS_CODES.includes(data?.responseCode as string)) {
    const message =
      data.responseDescription ||
      data.ResponseDescription ||
      data.responseMessage ||
      'Success';
    const title = 'Successful';
    return { message, title, severity: 'success' };
  }

  if (
    axios.isAxiosError(errorResponse) &&
    errorResponse?.response?.status === statusCodes.AXIOS_BAD_REQUEST
  ) {
    const title = errorResponse?.response?.data?.title || 'Validation Error';
    const message = 'Some required fields are missing';
    return { message, title, severity };
  }

  if (
    axios.isAxiosError(errorResponse) &&
    errorResponse?.response?.status === statusCodes.AXIOS_UNAUTHORIZED
  ) {
    const title = 'Unauthorised user';
    const message = 'Unauthorised User. Please Login Again';
    clearStoredUser();
    return { message, title, severity };
  }

  if (
    axios.isAxiosError(errorResponse) &&
    errorResponse?.response?.data?.responseDescription ===
      statusCodes.AXIOS_UNAUTHORIZED
  ) {
    const title = 'Unauthorised user';
    const message = 'Unauthorised User. Please Login Again';
    clearStoredUser();
    return { message, title, severity };
  }

  const title = 'An error occured';
  const message =
    (axios.isAxiosError(errorResponse) &&
      errorResponse?.response?.data?.responseDescription) ||
    errorResponse?.response?.data?.ResponseDescription ||
    errorResponse?.response?.data?.responseMessage
      ? errorResponse?.response?.data?.responseDescription ||
        errorResponse?.response?.data?.ResponseDescription ||
        errorResponse?.response?.data?.responseMessage
      : SERVER_ERROR;

  return { message, title, severity };
};
