import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  GetAllDormantAccountResponse,
  GetAllPortfolioAtRiskResponse,
} from '../ResponseTypes/reports';
import { axiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface IDormantAccountParams {
  pageSize?: number;
  pageNumber?: number;
}

async function fetchAllDormantAccount(
  params: IDormantAccountParams,
  toastActions: IToastActions,
): Promise<GetAllDormantAccountResponse | null> {
  try {
    const urlEndpoint = '/ReportServices/DormantAccounts';
    const { data }: AxiosResponse<GetAllDormantAccountResponse> =
      await axiosInstance.get(urlEndpoint, {
        params: {
          pageSize: params.pageSize || 20,
          pageNumber: params.pageNumber || 1,
          getAll: false,
          branchCode: '001',
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`,
        },
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    return data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    return null;
  }
}

export function useGetAllDormantAccount(
  params: IDormantAccountParams,
): GetAllDormantAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllDormantAccountResponse;

  const {
    data = fallback,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [
      queryKeys.portfolioAtRisk,
      params?.pageNumber || '',
      params?.pageSize || '',
    ],
    queryFn: () => fetchAllDormantAccount(params, toastActions),
    enabled: Boolean(params?.pageNumber || '' || params.pageSize),
  });

  return { ...data, isError, isLoading };
}
