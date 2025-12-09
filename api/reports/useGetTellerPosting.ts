import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetTellerPostingReport } from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface ITellerPostingParams {
  pageSize?: number;
  pageNumber?: number;
  search?: string;
  branchCode: string;
  reportDate?: string | null;
  endDate?: string | null;
  getAll?: boolean | null;
}

async function getTellerPosting(
  params: ITellerPostingParams,
  toastActions: IToastActions
): Promise<GetTellerPostingReport | null> {
  try {
    const urlEndpoint = '/api/ReportServices/TellerPostingsSummary';
    const { data }: AxiosResponse<GetTellerPostingReport> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          userId: params.search?.trim(),
          postByDate: params.reportDate,
          branchcode: params.branchCode,
          getAll: params.getAll || false
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

export function useGetTellerPosting(
  params: ITellerPostingParams
): GetTellerPostingReport {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetTellerPostingReport;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.detailedpPortfolioAtRisk,
      params?.branchCode || '',
      params?.pageNumber || '',
      params?.pageSize || '',
      params?.search,
      params?.reportDate || '',
      params?.getAll || false,
      params?.endDate || ''
    ],
    queryFn: () => getTellerPosting(params, toastActions),
    enabled: Boolean((params?.branchCode || '').length > 0 ||
      (params?.search || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
