import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { AlertColor } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { UseGetAuthPriviledgeList } from '@/api/ResponseTypes/general';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';

async function getAuthPriviledgeList(
  toastActions: IToastActions
): Promise<UseGetAuthPriviledgeList> {
  const toast = (message: string, title: string, severity: AlertColor) => {
    toastActions.toggleSnackbar();
    toastActions.setMessage(message);
    toastActions.setTitle(title);
    toastActions.setSeverity(severity);
  };

  let result: UseGetAuthPriviledgeList = {
    responseCode: '',
    responseDescription: '',
    authPriv: []
  };

  try {
    const urlEndpoint = '/General/Product/GetAuthPrivList';

    const { data }: AxiosResponse<UseGetAuthPriviledgeList> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity);
  }

  return result;
}

export function useAuthPriviledge(): UseGetAuthPriviledgeList {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAuthPriviledgeList;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.authPriviledge],
    queryFn: () => getAuthPriviledgeList(toastActions)
  });

  return { ...data, isError, isLoading };
}
