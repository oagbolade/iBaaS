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
import {
  GetAllTransactionClearingReportResponse,
  TrailBalanceResponse
} from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';
import { getCurrentIsoDate } from '@/utils/getCurrentDate';

export async function geTransactionClearing(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: GetAllTransactionClearingReportResponse =
    {} as GetAllTransactionClearingReportResponse;
  try {
    const urlEndpoint = `/ReportServices/TransactionsinClearingReport?pageNumber=${params?.pageNumber || 1}&pageSize=${params?.pageSize || 10}&getAll=${params?.getAll || false}`;
    const { data }: AxiosResponse<GetAllTransactionClearingReportResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status?.toString(),
          startDate: params?.startDate,
          endDate: params?.endDate,
          branch: params?.branchID,
          accountNumber: params?.accountNumber
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
export function useGetTransactionClearing(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllTransactionClearingReportResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.geTransactionClearing,
      params?.status?.toString(),
      params?.startDate,
      params?.endDate
    ],
    queryFn: () => geTransactionClearing(toastActions, params || {}),
    enabled: Boolean(
      (params?.startDate?.toString() || '').length > 0 ||
        (params?.status || '').length > 0 ||
        (params?.endDate || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
