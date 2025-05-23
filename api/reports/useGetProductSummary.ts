import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetProductSummaryReport } from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface IProdutSummaryParams {
  pageSize?: number;
  pageNumber?: number;
  search?: string;
  branchId?: string | null;
  endDate?: string | null;
  getAll?: boolean | null;
}

async function getProductSummary(
  params: IProdutSummaryParams,
  toastActions: IToastActions
): Promise<GetProductSummaryReport | null> {
  try {
    const urlEndpoint = '/ReportServices/ProductSummary';
    const { data }: AxiosResponse<GetProductSummaryReport> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          searchWith: params.search,
          branchCode: params.branchId,
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

export function useGetProductSummary(
  params: IProdutSummaryParams
): GetProductSummaryReport {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetProductSummaryReport;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.detailedpPortfolioAtRisk,
      params?.pageNumber || '',
      params?.pageSize || '',
      params?.search,
      params?.branchId || '',
      params?.getAll || false
    ],
    queryFn: () => getProductSummary(params, toastActions),
    enabled: Boolean(
      (params?.search || '').length > 0 || (params?.branchId || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
