import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  UseGetAllAuth2fa,
  UseGetAllAuth2faCheck
} from '../ResponseTypes/admin';
import { Auth2FaAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { Aut2FaChcheckValue, Aut2FaValue } from '@/schemas/schema-values/auth';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';

const auth2fa = async (
  toastActions: IToastActions,
  body: Aut2FaValue
): Promise<UseGetAllAuth2fa> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const urlEndpoint = '/Subscription/ValidateToken';
    const response: AxiosResponse<UseGetAllAuth2fa> =
      await Auth2FaAxiosInstance.post(urlEndpoint, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const { message, title, severity } = globalErrorHandler(response.data);
    toast(message, title, severity, toastActions);
    if (!SUCCESS_CODES.includes(response.data.responseCode || '')) {
      throw new Error(response.data.responseMessage);
    }
    return response.data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
};

const auth2faCheck = async (
  body: Aut2FaChcheckValue
): Promise<UseGetAllAuth2faCheck> => {
  const urlEndpoint = '/Subscription/CheckFor2FA';
  const response: AxiosResponse<UseGetAllAuth2faCheck> =
    await Auth2FaAxiosInstance.post(urlEndpoint, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  return response.data;
};
export function useAuth2faCheck() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: Aut2FaChcheckValue) => auth2faCheck(body)
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

export function useAuth2fa() {
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: Aut2FaValue) => auth2fa(toastActions, body)
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
