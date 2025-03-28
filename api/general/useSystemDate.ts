import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  GetAllSystemDateResponse,
  ISystemDate
} from '../ResponseTypes/operation';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';

async function getSystemDate(
  toastActions: IToastActions
): Promise<GetAllSystemDateResponse> {
  let result: GetAllSystemDateResponse = {
    responseCode: '',
    responseDescription: '',
    sysmodel: {} as ISystemDate
  };

  try {
    const urlEndpoint = '/Operations/GetSystemDate';

    const { data }: AxiosResponse<GetAllSystemDateResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useGetSystemDate(): GetAllSystemDateResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllSystemDateResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getSystemDate],
    queryFn: () => getSystemDate(toastActions)
  });

  return { ...data, isError, isLoading };
}
