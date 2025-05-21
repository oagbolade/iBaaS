import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { AlertColor } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import {
  axiosInstance,
  environment,
  reportsAxiosInstance
} from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { UseIAReportType } from '@/api/ResponseTypes/general';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';

//  query function for useQuery
async function getIAReportType(
  toastActions: IToastActions
): Promise<UseIAReportType> {
  const toast = (message: string, title: string, severity: AlertColor) => {
    toastActions.toggleSnackbar();
    toastActions.setMessage(message);
    toastActions.setTitle(title);
    toastActions.setSeverity(severity);
  };

  let result: UseIAReportType = {
    responseCode: '',
    responseDescription: '',
    data: []
  };

  try {
    const urlEndpoint = '/ReportServices/IAReportType';

    const { data }: AxiosResponse<UseIAReportType> = await reportsAxiosInstance(
      {
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      }
    );
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

export function useGetIAReportType(): UseIAReportType {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseIAReportType;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.iAReportType],
    queryFn: () => getIAReportType(toastActions)
  });

  return { ...data, isError, isLoading };
}
