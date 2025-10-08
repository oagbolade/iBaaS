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
import { ITermDepositMaturityReportResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';

export async function getTermDeporitMaturityReport(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: ITermDepositMaturityReportResponse =
    {} as ITermDepositMaturityReportResponse;

  try {
    const urlEndpoint = '/ReportServices/TDMaturityReport';

    const { data }: AxiosResponse<ITermDepositMaturityReportResponse> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          reportType: params?.reportType,
          branch: params?.branchID,
          customerId: params?.customerID,
          pageSize: params?.pageSize || 10,
          pageNumber: params?.pageNumber || 1,
          startDate: params?.startDate,
          endDate: params?.endDate,
          getAll: params?.getAll || false,
          searchWith: params?.searchWith
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

export function useTermDeporitMaturityReport(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ITermDepositMaturityReportResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.termDeporitMaturityReport,
      params?.startDate || '',
      params?.endDate || '',
      params?.reportType || '',
      params?.pageNumber || 1,
      params?.getAll
    ],
    queryFn: () => getTermDeporitMaturityReport(toastActions, params || {}),
    enabled: Boolean(
      (params?.startDate || '').length > 0 ||
        (params?.endDate || '').length > 0 ||
        (params?.reportType || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
