import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { queryKeys } from '@/react-query/constants';
import { TrailBalanceResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';
import { getCurrentIsoDate } from '@/utils/getCurrentDate';

export async function getTrialBalance(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: TrailBalanceResponse = {} as TrailBalanceResponse;
  try {
    const urlEndpoint = `/ReportServices/TrialBalanceByDate?pageNumber=${params?.pageNumber || 1}&pageSize=${params?.pageSize || 10}`;
    const { data }: AxiosResponse<TrailBalanceResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        branch: params?.branchID,
        reportdate: params?.reportDate || `${getCurrentIsoDate()}`,
        reportType: params?.reportType
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });
    const { message, title, severity } = globalErrorHandler({
      ...data
    });
    toast(message, title, severity, toastActions);
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}
export function useGetTrialBalance(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as TrailBalanceResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.plainTrialBalance,
      params?.branchID,
      params?.reportDate,
      params?.reportType
    ],
    queryFn: () => getTrialBalance(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.reportType || '').length > 0 ||
        (params?.reportDate || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
