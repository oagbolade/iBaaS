import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { nipAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { NipLoginResponse, NipLoginValue } from '@/schemas/schema-values/auth';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';

const nipAuth = async (body: NipLoginValue): Promise<NipLoginResponse> => {
  const urlEndpoint = 'tenants/login';
  const response: AxiosResponse<NipLoginResponse> = await nipAxiosInstance.post(
    urlEndpoint,
    body,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};

export function useNipAuth() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: NipLoginValue) => nipAuth(body)
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
