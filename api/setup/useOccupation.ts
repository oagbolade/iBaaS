import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { GetAllOccupationResponse } from '@/api/ResponseTypes/setup';

async function getAllOccupation(
  toastActions: IToastActions
): Promise<GetAllOccupationResponse> {
  let result: GetAllOccupationResponse = {
    responseCode: '',
    responseDescription: '',
    professions: []
  };

  try {
    const urlEndpoint = '/General/Occupation/GetAllOccupation';

    const { data }: AxiosResponse<GetAllOccupationResponse> =
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

export function useGetAllOccupation() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllOccupationResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllOccupation],
    queryFn: () => getAllOccupation(toastActions)
  });

  return { ...data, isError, isLoading };
}
