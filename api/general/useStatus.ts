import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { AlertColor } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { UseGetAllStatus } from '../ResponseTypes/general';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { queryKeys } from '@/react-query/constants';

async function getAllStatus(
  toastActions: IToastActions
): Promise<UseGetAllStatus> {
  const toast = (message: string, title: string, severity: AlertColor) => {
    toastActions.toggleSnackbar();
    toastActions.setMessage(message);
    toastActions.setTitle(title);
    toastActions.setSeverity(severity);
  };

  let result: UseGetAllStatus = {
    responseCode: '',
    responseDescription: '',
    status: []
  };

  try {
    const urlEndpoint = '/Operations/GetStatus';

    const { data }: AxiosResponse<UseGetAllStatus> = await axiosInstance({
      url: urlEndpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    const { message, title, severity } = globalErrorHandler(data);

    if (environment === 'development') {
      toast(message, title, severity);
    }

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity);
  }

  return result;
}

export function useGetStatus(): UseGetAllStatus {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllStatus;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.status],
    queryFn: () => getAllStatus(toastActions)
  });

  return { ...data, isError, isLoading };
}
