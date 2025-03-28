import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  GetPendingRequestResponse,
  IGetPendingRequest
} from '../ResponseTypes/loans';
import { IToastActions } from '@/constants/types';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';

async function fetchPendingRequest(
  toastActions: IToastActions
): Promise<GetPendingRequestResponse> {
  let result: GetPendingRequestResponse = {
    responseCode: '',
    responseDescription: '',
    authsdetails: [] as IGetPendingRequest[]
  };

  try {
    const urlEndpoint = '/Auth/AuthItems';

    const { data }: AxiosResponse<GetPendingRequestResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    
    if (environment === 'development') {
      toast(message, title, severity, toastActions);
    }

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useGetPendingRequest(): GetPendingRequestResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetPendingRequestResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.fetchPendingRequest],
    queryFn: () => fetchPendingRequest(toastActions)
  });

  return { ...data, isError, isLoading };
}
