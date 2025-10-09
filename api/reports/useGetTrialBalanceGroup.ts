import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TrailBalanceGroupResponse } from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { queryKeys } from '@/react-query/constants';
import { toast } from '@/utils/toast';

export async function getTrialBalanceGroup(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<TrailBalanceGroupResponse | null> {
  try {
    const urlEndpoint = '/ReportServices/TrialBalanceByDateByGroup';
    const { data }: AxiosResponse<TrailBalanceGroupResponse> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          branchCode: params?.branchID,
          searchWith: params?.customerID,
          pageSize: Number(params?.pageSize) || 10,
          pageNumber: Number(params?.pageNumber) || 1,
          startDate: params?.reportDate,
          endDate: params?.endDate,
          reportType: Number(params?.reportType),
          getAll: params?.getAll || false
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
export function useGetTrialBalanceGroup(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as TrailBalanceGroupResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getTrialBalanceByGroup,
      params?.branchID || '',
      params?.customerID || '',
      params?.pageNumber || 1,
      params?.reportDate || '',
      params?.reportType || '',
      params?.endDate || '',
      params?.getAll || ''
    ],
    queryFn: () => getTrialBalanceGroup(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.reportType || '').length > 0 ||
        (params?.search || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
