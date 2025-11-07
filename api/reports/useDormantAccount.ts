import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetAllDormantAccountResponse } from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';
import { ISearchParams } from '@/app/api/search/route';

async function fetchAllDormantAccount(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: GetAllDormantAccountResponse = {} as GetAllDormantAccountResponse;

  try {
    const urlEndpoint = `/api/ReportServices/DormantAccounts?pageNumber=${params?.page}&pageSize=${params?.pageSize || 10}&getAll=${params?.getAll || false}&branchCode=${params?.branchID}&startDate=${params?.startDate}&endDate=${params?.endDate}&searchWith=${params?.searchWith || ''}`;
    const { data }: AxiosResponse<GetAllDormantAccountResponse> =
      await reportsAxiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler({ ...data });
    toast(message, title, severity, toastActions);
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetAllDormantAccount(
  params: ISearchParams | null
): GetAllDormantAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllDormantAccountResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.dormantAccount,
      params?.branchID || '',
      params?.getAll || false,
      params?.pageSize || 10,
      params?.page || 1,
      params?.searchWith || '',
      params?.startDate || '',
      params?.endDate || ''
    ],
    queryFn: () => fetchAllDormantAccount(toastActions, params || {}),
    enabled: Boolean(
      params?.pageSize ||
      (params?.branchID || '').length > 0 ||
      (params?.searchWith || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
