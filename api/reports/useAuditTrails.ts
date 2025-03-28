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
import { AuditTrailsResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';

export async function getAllAuditTrailReports(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: AuditTrailsResponse = {} as AuditTrailsResponse;
  const userId = getStoredUser()?.profiles.userid;
  try {
    const urlEndpoint = `/ReportServices/AUDITTRAILREPORT?userId=${userId}&startdate=${params?.startDate}&Enddate=${params?.endDate}`;
    const { data }: AxiosResponse<AuditTrailsResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'GET',
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
export function useGetAllAuditTrailReports(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as AuditTrailsResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getAuditTrails,
      params?.startDate || '',
      params?.endDate || '',
      params?.page || 1
    ],
    queryFn: () => getAllAuditTrailReports(toastActions, params || {}),
    enabled: Boolean(
      (params?.startDate || '').length > 0 || (params?.endDate || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
