import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IAccountEnquiryResponse } from '../ResponseTypes/reports';
import { axiosInstance, reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';
import { ISearchParams } from '@/app/api/search/route';
import { REPORT_BASE_URL } from '@/axiosInstance/constants';

export interface IEnquiryParams {
  branchCode?: string;
  accountNo?: string;
  pageSize?: number;
  pageNumber?: number;
  getAll?: boolean | null;
  startDate?: string | null;
  endDate?: string | null;
  searchWith?: string;
}

async function fetchAccountEnquiry(
  params: ISearchParams,
  toastActions: IToastActions
): Promise<IAccountEnquiryResponse | null> {
  try {
    const urlEndpoint = '/api/ReportServices/CustomerAccountEnquery';
    const { data }: AxiosResponse<IAccountEnquiryResponse> =
      await reportsAxiosInstance({
        url: urlEndpoint,
        params: {
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          searchWith: params.search,
          branchCode: params.branchID,
          getAll: params.getAll || false,
          accountNo: params.accountNo
        },
        method: 'GET',
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
  params: ISearchParams
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
      params?.branchID || '',
      params?.accountNo || '',
      params?.pageSize || 1,
      params?.searchWith,
      params?.getAll,
      params?.pageNumber || 10
    ],
    queryFn: () => fetchAccountEnquiry(params, toastActions),
    enabled: Boolean(
      (params?.search || '').length > 0 || (params?.branchID || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
