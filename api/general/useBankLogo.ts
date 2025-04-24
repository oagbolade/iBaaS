import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { IBankLogo, UseBankLogo } from '@/api/ResponseTypes/general';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';

//  query function for useQuery
async function getBankLogo(toastActions: IToastActions): Promise<UseBankLogo> {
  let result: UseBankLogo = {
    responseCode: '',
    responseDescription: '',
    logo: {} as IBankLogo
  };

  try {
    const urlEndpoint = '/General/Product/GetBankLogo';

    const { data }: AxiosResponse<UseBankLogo> = await axiosInstance({
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

export function useGetBankLogo(): UseBankLogo {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseBankLogo;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.bankLogo],
    queryFn: () => getBankLogo(toastActions)
  });

  return { ...data, isError, isLoading };
}
