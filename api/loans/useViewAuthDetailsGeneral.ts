import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ViewAuthDetailsGeneral } from '../ResponseTypes/loans';
import { IToastActions } from '@/constants/types';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { ViewDetailsResponseType } from '@/mocks';

async function viewAuthDetailsGeneral(
  toastActions: IToastActions,
  id: number
): Promise<ViewAuthDetailsGeneral> {
  let result: ViewAuthDetailsGeneral = {
    responseCode: '',
    responseDescription: '',
    columns: [] as ViewDetailsResponseType[]
  };

  try {
    const urlEndpoint = `/Auth/ViewAuthDetailsGeneral?id=${id}`;

    const { data }: AxiosResponse<ViewAuthDetailsGeneral> = await axiosInstance(
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
    toast(message, title, severity, toastActions);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useViewAuthDetailsGeneral(id: number): ViewAuthDetailsGeneral {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ViewAuthDetailsGeneral;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.viewAuthDetailsGeneral, id],
    queryFn: () => viewAuthDetailsGeneral(toastActions, id),
    enabled: Boolean(id?.toString().length > 0|| Boolean(id !== 0))
  });

  return { ...data, isError, isLoading };
}
