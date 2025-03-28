import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IAccountEnquiryResponse } from '../ResponseTypes/reports';
import { axiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';

export interface IEnquiryParams {
  branchId?: string;
  customerId?: string;
  pageSize?: number;
  pageNumber?: number;
  getAll?: boolean | null;
  startDate?: string | null;
  endDate?: string | null;
}

async function fetchAccountEnquiry(
  params: IEnquiryParams,
  toastActions: IToastActions
): Promise<IAccountEnquiryResponse | null> {
  try {
    const urlEndpoint = '/ReportServices/AccountsinDebitReport';
    const { data }: AxiosResponse<IAccountEnquiryResponse> =
      await axiosInstance.get(urlEndpoint, {
        params: {
          branch: params.branchId,
          customerId: params.customerId,
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

export function useGetAccountEnquiryByBranchId(
  params: IEnquiryParams
): IAccountEnquiryResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IAccountEnquiryResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.accountEnquiry,
      params?.branchId || '',
      params?.customerId || '',
      params?.pageSize || 1
    ],
    queryFn: () => fetchAccountEnquiry(params, toastActions),
    enabled: Boolean((params?.branchId || '').length > 0 || params.customerId)
  });

  return { ...data, isError, isLoading };
}
