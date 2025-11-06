import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  IAccountEnquiryResponse,
  IAccountInDebitResponse,
  IGetTellerBalanceReportResponseType
} from '../ResponseTypes/reports';
import { axiosInstance, reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';
import { ISearchParams } from '@/app/api/search/route';

export interface IEnquiryParams {
  branchId?: string;
  customerId?: string;
  pageSize?: number;
  pageNumber?: number;
  startDate?: string | null;
  endDate?: string | null;
  getAll?: boolean | null;
}

async function getTellerBalanceReport(
  params: ISearchParams,
  toastActions: IToastActions
): Promise<IGetTellerBalanceReportResponseType | null> {
  try {
    const urlEndpoint = '/api/ReportServices/TellerBalanceReport';
    const { data }: AxiosResponse<IGetTellerBalanceReportResponseType> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          branchCode: params?.branchCode?.toString(),
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          startDate: '', // date make the api return [] data contact backend
          endDate: '', // date make the api return [] data contact backend
          getAll: params.getAll || false,
          searchWith: params.searchWith || ''
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

export function useGetTellerBalanceReport(
  params: ISearchParams
): IGetTellerBalanceReportResponseType {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IGetTellerBalanceReportResponseType;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getTellerBalanceReport,
      params?.branchCode?.toString() || '',
      params?.pageNumber || 1,
      params?.pageSize || 10,
      params?.startDate || '',
      params?.endDate || '',
      params?.search,
      params?.searchWith
    ],
    queryFn: () => getTellerBalanceReport(params, toastActions),
    enabled: Boolean(
      (params?.branchCode?.toString() || '').length > 0 ||
        params.startDate?.toString() ||
        params.endDate?.toString() ||
        params.searchWith?.toString()
    )
  });

  return { ...data, isError, isLoading };
}
