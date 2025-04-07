import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { ResetPasswordPayload } from '../RequestTypes/admin';
import { UseResetpasswordResponse } from '../ResponseTypes/admin';
import { IToastActions } from '@/constants/types';
import { axiosInstance } from '@/axiosInstance';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';

async function changePassword(
  toastActions: IToastActions,
  body: ResetPasswordPayload
): Promise<UseResetpasswordResponse> {
  try {
    const { data }: AxiosResponse<UseResetpasswordResponse> =
      await axiosInstance.post('/Login/ChangePassword', body);
    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);
    return data;
  } catch (error) {
    const { message, title, severity } = globalErrorHandler({}, error);
    toast(message, title, severity, toastActions);
    throw error;
  }
}

export function useResetPassword() {
  const toastActions = useContext(ToastMessageContext);

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      changePassword(toastActions, payload)
  });
}
