import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { InflowOutflowReportResponse } from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface IInflowOutflowParams {
  startDate?: string;
  endDate?: string;
  branchId?: string | null;
  tellerId?: string | null;
  pageSize?: number;
  pageNumber?: number;
  getAll?: boolean | null;
}

async function fetchInflowOutflowReport(
  params: IInflowOutflowParams,
  toastActions: IToastActions
): Promise<InflowOutflowReportResponse | null> {
  try {
    const urlEndpoint = '/ReportServices/InflowOutflowReport';
    const { data }: AxiosResponse<InflowOutflowReportResponse> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          startdate: params.startDate,
          Enddate: params.endDate,
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          searchWith: params?.tellerId,
          branchCode: params?.branchId,
          getAll: params?.getAll || false
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

export function useGetInflowOutflowReport(
  params: IInflowOutflowParams
): InflowOutflowReportResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as InflowOutflowReportResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.inflowOutflowReport,
      params?.startDate || '',
      params?.endDate || '',
      params?.pageNumber || '',
      params?.branchId || '',
      params?.tellerId || '',
      params?.getAll || false
    ],
    queryFn: () => fetchInflowOutflowReport(params, toastActions),
    enabled: Boolean((params?.branchId || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
