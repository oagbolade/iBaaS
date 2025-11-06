import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { reportsAxiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { queryKeys } from '@/react-query/constants';
import { TrailBalanceResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';

export async function getTrialBalance(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: TrailBalanceResponse = {} as TrailBalanceResponse;
  try {
    const urlEndpoint = '/api/ReportServices/TrialBalanceByDate';
    const { data }: AxiosResponse<TrailBalanceResponse> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          branchCode: params?.branchID,
          searchWith: params?.customerID,
          pageSize: Number(params?.pageSize) || 10,
          pageNumber: Number(params?.pageNumber) || 1,
          startDate: params?.startDate,
          endDate: params?.endDate,
          reportType: Number(params?.reportType),
          classCode: params?.gl_ClassCode,
          getAll: params?.getAll || false,
          nodeCode: Number(params?.glNodeCode),
          prodtypecode: Number(params?.glTypeCode)
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
      queryKeys.trialBalanceByDate,
      params?.branchID,
      params?.reportDate,
      params?.startDate,
      params?.customerID,
      params?.getAll,
      params?.pageSize || 10,
      params?.pageNumber || 1,
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
