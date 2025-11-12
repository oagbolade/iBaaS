import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetDetailedPortfolioReport } from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface IDetailedPortfolioAtRiskParams {
  pageSize?: number;
  pageNumber?: number;
  productCode?: string;
  branchCode?: string;
  searchWith?: string;
  startDate?: string | null;
  endDate?: string | null;
  getAll?: boolean | null;
}

async function fetchDetailedPortfolioAtRisk(
  params: IDetailedPortfolioAtRiskParams,
  toastActions: IToastActions
): Promise<GetDetailedPortfolioReport | null> {
  try {
    const urlEndpoint = '/api/ReportServices/PortfolioatRiskDetailReport';
    const { data }: AxiosResponse<GetDetailedPortfolioReport> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          productcode: params.productCode?.trim(),
          branchcode: params.branchCode,
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          searchWith: params.searchWith,
          startDate: params.startDate,
          endDate: params.endDate,
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

export function useGetDetailedPortfolioReport(
  params: IDetailedPortfolioAtRiskParams
): GetDetailedPortfolioReport {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetDetailedPortfolioReport;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.detailedpPortfolioAtRisk,
      params?.branchCode || '',
      params?.productCode || '',
      params?.pageNumber || '',
      params?.pageSize || '',
      params?.searchWith || '',
      params?.startDate || '',
      params?.endDate || '',
      params?.getAll || false
    ],
    queryFn: () => fetchDetailedPortfolioAtRisk(params, toastActions),
    enabled: Boolean(
      (params?.branchCode || '').length > 0 ||
        (params?.productCode || '').length > 0 ||
        (params?.searchWith || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
