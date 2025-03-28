import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { AlertColor } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { UseBranches } from '@/api/ResponseTypes/general';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';

//  query function for useQuery
async function getBranches(toastActions: IToastActions): Promise<UseBranches> {
  const toast = (message: string, title: string, severity: AlertColor) => {
    toastActions.toggleSnackbar();
    toastActions.setMessage(message);
    toastActions.setTitle(title);
    toastActions.setSeverity(severity);
  };

  let result: UseBranches = {
    responseCode: '',
    responseDescription: '',
    branches: []
  };

  try {
    const urlEndpoint = '/General/Branch/GetAllBranch';

    const { data }: AxiosResponse<UseBranches> = await axiosInstance({
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

export function useGetBranches(): UseBranches {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseBranches;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.branches],
    queryFn: () => getBranches(toastActions)
  });

  return { ...data, isError, isLoading };
}
