import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IGlMainGroupResponse } from '../ResponseTypes/reports';
import { axiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface IGlMainParams {
  pageSize?: number;
  pageNumber?: number;
  branchId?: string;
  search?: string;
  reportType?: string;
}

async function fetchGlMainGroupReport(
  params: IGlMainParams,
  toastActions: IToastActions
): Promise<IGlMainGroupResponse | null> {
  try {
    const urlEndpoint = '/ReportServices/GlMainGroupReport';
    const { data }: AxiosResponse<IGlMainGroupResponse> =
      await axiosInstance.get(urlEndpoint, {
        params: {
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1
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

export function useGetGlMainGroupReport(
  params: IGlMainParams
): IGlMainGroupResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IGlMainGroupResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.glMainGroupReport,
      params?.pageSize || 1,
      params.pageNumber || 10
    ],
    queryFn: () => fetchGlMainGroupReport(params, toastActions),
    enabled: Boolean(params.pageNumber && params.pageSize)
  });

  return { ...data, isError, isLoading };
}
