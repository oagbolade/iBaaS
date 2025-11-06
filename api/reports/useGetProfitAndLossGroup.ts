import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ProfitAndLossResponse } from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { queryKeys } from '@/react-query/constants';
import { toast } from '@/utils/toast';

export async function getProfitAndLossGroup(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<ProfitAndLossResponse | null> {
  try {
    const urlEndpoint = '/api/ReportServices/ProfitOrLoss';
    const { data }: AxiosResponse<ProfitAndLossResponse> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          branchCode: params?.branchID,
          pageSize: Number(params?.pageSize) || 10,
          pageNumber: Number(params?.pageNumber) || 1,
          startFrom: params?.reportDate,
          getAll: params?.getAll
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
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
export function useGetProfitAndLossGroup(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ProfitAndLossResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.profitAndLoss,
      params?.branchID || '',
      params?.pageNumber || 1,
      params?.reportDate || '',
      params?.endDate || '',
      params?.getAll
    ],
    queryFn: () => getProfitAndLossGroup(toastActions, params || {}),
    enabled: Boolean((params?.branchID || '').length > 0)
  });
  return { ...data, isError, isLoading };
}
