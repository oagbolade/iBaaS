import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  IDisbursedLoanReportResponse,
  ILoanOverdueReportResponse
} from '../ResponseTypes/reports';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { axiosInstance, reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface DisbursedLoanParams {
  branch?: string | null;
  search?: string | null;
  product?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  pageSize?: number | null;
  pageNumber?: number | null;
  getAll?: boolean | null;
}

async function fetchDisbursedLoanReport(
  params: DisbursedLoanParams,
  toastActions: IToastActions
): Promise<IDisbursedLoanReportResponse | null> {
  try {
    const urlEndpoint = 'ReportServices/DisbursedLoansReport';
    const { data }: AxiosResponse<APIResponse> = await reportsAxiosInstance.get(
      urlEndpoint,
      {
        params: {
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          searchWith: params.search?.trim(),
          startdate: params.startDate,
          enddate: params.endDate,
          productcode: params?.product,
          branchcode: params?.branch,
          getAll: params.getAll || false
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      }
    );

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    return data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    return null;
  }
}

export function useGetDisbursedLoanReport(
  params: DisbursedLoanParams
): IDisbursedLoanReportResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IDisbursedLoanReportResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.overloanDueReport,
      params?.branch || '',
      params?.product || '',
      params?.startDate || '',
      params?.endDate || '',
      params?.getAll || false,
      params?.search || '',
      params?.pageSize || 10,
      params?.pageNumber || 1
    ],
    queryFn: () => fetchDisbursedLoanReport(params, toastActions),
    enabled: Boolean((params?.branch || '').length > 0 || params.search)
  });

  return { ...data, isError, isLoading };
}
