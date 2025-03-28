import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FetchAllUserRequestResponse,
  IFetchAllUserRequest
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
): Promise<FetchAllUserRequestResponse> {
  let result: FetchAllUserRequestResponse = {
    responseCode: '',
    responseDescription: '',
    data: [] as IFetchAllUserRequest[]
  };

  try {
    const urlEndpoint = '/Auth/FetchUserRequests';

    const { data }: AxiosResponse<FetchAllUserRequestResponse> =
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

export function useFetchAllUserRequest(): FetchAllUserRequestResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as FetchAllUserRequestResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.fetchAllUserRequest],
    queryFn: () => fetchAllUserRequest(toastActions)
  });

  return { ...data, isError, isLoading };
}
