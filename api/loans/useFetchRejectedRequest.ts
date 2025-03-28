import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  GetRejectectedRequestResponse,
  IFetchRejectedRequest
} from '../ResponseTypes/loans';
import { IToastActions } from '@/constants/types';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';

async function fetchAllUserRequest(
  toastActions: IToastActions
): Promise<GetRejectectedRequestResponse> {
  let result: GetRejectectedRequestResponse = {
    responseCode: '',
    responseDescription: '',
    data: [] as IFetchRejectedRequest[]
  };

  try {
    const urlEndpoint = '/Auth/FetchRejectRequests';

    const { data }: AxiosResponse<GetRejectectedRequestResponse> =
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

export function useFetchRejectedRequest(): GetRejectectedRequestResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetRejectectedRequestResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.fetchRejectedRequest],
    queryFn: () => fetchAllUserRequest(toastActions)
  });

  return { ...data, isError, isLoading };
}
