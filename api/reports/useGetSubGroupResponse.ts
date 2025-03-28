import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IGlSubGroupResponse } from '../ResponseTypes/reports';
import { axiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface IEnquiryParams {
  nodeCode?: number;
  pageSize?: number;
  pageNumber?: number;
}

async function fetchGlSubGroupReport(
  params: IEnquiryParams,
  toastActions: IToastActions
): Promise<IGlSubGroupResponse | null> {
  try {
    const urlEndpoint = '/ReportServices/GlSubGroupReport';
    const { data }: AxiosResponse<IGlSubGroupResponse> =
      await axiosInstance.get(urlEndpoint, {
        params: {
          NodeCode: params.nodeCode,
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

export function useGetGlSubGroupReport(
  params: IEnquiryParams
): IGlSubGroupResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IGlSubGroupResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.glSubGroupReport,
      params?.pageNumber || 10,
      params?.pageSize || 1
    ],
    queryFn: () => fetchGlSubGroupReport(params, toastActions),
    enabled: Boolean(params?.pageNumber || params.pageSize)
  });

  return { ...data, isError, isLoading };
}
