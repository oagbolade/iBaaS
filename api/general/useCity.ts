import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { GetAllCitiesResponse } from '@/api/ResponseTypes/general';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';

//  query function for useQuery
async function getCity(
  toastActions: IToastActions
): Promise<GetAllCitiesResponse> {
  let result: GetAllCitiesResponse = {
    responseCode: '',
    responseDescription: '',
    towns: []
  };
  try {
    const urlEndpoint = '/General/City/GetAllCity';

    const { data }: AxiosResponse<GetAllCitiesResponse> = await axiosInstance({
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

export function useGetCitys(): GetAllCitiesResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllCitiesResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCity],
    queryFn: () => getCity(toastActions)
  });

  return { ...data, isError, isLoading };
}
