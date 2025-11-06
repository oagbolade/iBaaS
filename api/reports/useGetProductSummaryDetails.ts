import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetProductSummaryDetailsReport } from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface IProdutSummaryDetailsParams {
  pageSize?: number;
  pageNumber?: number;
  search?: string;
  productCode?: string | null;
  endDate?: string | null;
  getAll?: boolean | null;
}

async function getProductSummaryDetails(
  params: IProdutSummaryDetailsParams,
  toastActions: IToastActions
): Promise<GetProductSummaryDetailsReport | null> {
  try {
    const urlEndpoint = '/api/ReportServices/ProductSummaryDetails';
    const { data }: AxiosResponse<GetProductSummaryDetailsReport> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          searchWith: params.search,
          productCode: params.productCode,
          getAll: params.getAll || false
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    return data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    return null;
  }
}

export function useGetProductSummaryDetails(
  params: IProdutSummaryDetailsParams
): GetProductSummaryDetailsReport {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetProductSummaryDetailsReport;

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
      params?.productCode || '',
      params?.getAll || false
    ],
    queryFn: () => getProductSummaryDetails(params, toastActions),
    enabled: Boolean(
      (params?.search || '').length > 0 ||
        (params?.productCode || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
