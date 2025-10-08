import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetAllPortfolioAtRiskResponse } from '../ResponseTypes/reports';
import { axiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface IPortfolioAtRiskParams {
  pageSize?: number;
  pageNumber?: number;
  getAll?: boolean;
}

async function fetchAllPortfolioAtRisk(
  params: IPortfolioAtRiskParams,
  toastActions: IToastActions
): Promise<GetAllPortfolioAtRiskResponse | null> {
  try {
    const urlEndpoint = '/ReportServices/PortfolioatRiskReport';
    const { data }: AxiosResponse<GetAllPortfolioAtRiskResponse> =
      await axiosInstance.get(urlEndpoint, {
        params: {
          pageSize: params.pageSize || 20,
          pageNumber: params.pageNumber || 1,
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

export function useGetAllPortfolioAtRisk(
  params: IPortfolioAtRiskParams
): GetAllPortfolioAtRiskResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllPortfolioAtRiskResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.portfolioAtRisk,
      params?.pageNumber || '',
      params?.pageSize || '',
      params?.getAll || ''
    ],
    queryFn: () => fetchAllPortfolioAtRisk(params, toastActions),
    enabled: Boolean(params?.pageNumber || '' || params.pageSize)
  });

  return { ...data, isError, isLoading };
}
