import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ILoanOverdueReportResponse } from '../ResponseTypes/reports';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { axiosInstance } from '@/axiosInstance';
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
  date1?: string | null;
  pageSize?: number | null;
  pageNumber?: number | null;
}

async function fetchLoanOverdueReport(
  params: LoanOverdueParams,
  toastActions: IToastActions
): Promise<ILoanOverdueReportResponse | null> {
  try {
    const urlEndpoint = `/ReportServices/LoanOverDueReport?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`;
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        date1: params.date1,
        branchselect: params.branch
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
      params?.date1 || '',
      params?.search || '',
      params?.pageSize || 10,
      params?.pageNumber || 1
    ],
    queryFn: () => fetchLoanOverdueReport(params, toastActions),
    enabled: Boolean((params?.branch || '').length > 0 || params.search)
  });

  return { ...data, isError, isLoading };
}
