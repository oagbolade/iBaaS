import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { AlertColor } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { UseGetDepartment } from '@/api/ResponseTypes/general';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';

async function getDepartments(
  toastActions: IToastActions
): Promise<UseGetDepartment> {
  const toast = (message: string, title: string, severity: AlertColor) => {
    toastActions.toggleSnackbar();
    toastActions.setMessage(message);
    toastActions.setTitle(title);
    toastActions.setSeverity(severity);
  };

  let result: UseGetDepartment = {
    responseCode: '',
    responseDescription: '',
    departments: []
  };

  try {
    const urlEndpoint = '/Configuration/Department/GetAllDepartment';

    const { data }: AxiosResponse<UseGetDepartment> = await axiosInstance({
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

export function useGetDepartments(): UseGetDepartment {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetDepartment;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.department],
    queryFn: () => getDepartments(toastActions)
  });

  return { ...data, isError, isLoading };
}
