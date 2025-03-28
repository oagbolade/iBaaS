import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { GetAllTitlesResponse } from '@/api/ResponseTypes/customer-service';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';

async function getAllTitles(
  toastActions: IToastActions
): Promise<GetAllTitlesResponse> {
  let result: GetAllTitlesResponse = {
    responseCode: '',
    responseDescription: '',
    title: []
  };

  try {
    const urlEndpoint = '/General/Title/GetAllTitle';

    const { data }: AxiosResponse<GetAllTitlesResponse> = await axiosInstance({
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

export function useGetAllTitles() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllTitlesResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllTitles],
    queryFn: () => getAllTitles(toastActions)
  });

  return { ...data, isError, isLoading };
}
