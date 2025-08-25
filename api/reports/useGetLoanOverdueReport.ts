import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ILoanOverdueReportResponse } from '../ResponseTypes/reports';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { axiosInstance, reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface LoanOverdueParams {
  branch?: string | null;
  search?: string | null;
  product?: string | null;
  reportDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  pageSize?: number | null;
  pageNumber?: number | null;
  getAll?: boolean | null;
  branchcode?: string | null;
  productcode?: string | null;
}

async function fetchLoanOverdueReport(
  params: LoanOverdueParams,
  toastActions: IToastActions
): Promise<ILoanOverdueReportResponse | null> {
  try {
    const urlEndpoint = 'ReportServices/LoanOverDueReport';
    const { data }: AxiosResponse<APIResponse> = await reportsAxiosInstance.get(
      urlEndpoint,
      {
        params: {
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          searchWith: params.search?.trim(),
          selectedDate: params.reportDate,
          productCode: params?.product,
          branchCode: params?.branch,
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

export function useGetLoanOverdueReport(
  params: LoanOverdueParams
): ILoanOverdueReportResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ILoanOverdueReportResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.overloanDueReport,
      params?.branch || '',
      params?.product || '',
      params?.reportDate || '',
      params?.search || '',
      params?.getAll || false,
      params?.pageSize || 10,
      params?.pageNumber || 1
    ],
    queryFn: () => fetchLoanOverdueReport(params, toastActions),
    enabled: Boolean((params?.branch || '').length > 0 || params.search)
  });

  return { ...data, isError, isLoading };
}
