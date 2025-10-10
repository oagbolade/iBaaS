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
  params: IEnquiryParams,
  toastActions: IToastActions
): Promise<IGetTellerBalanceReportResponseType | null> {
  try {
    const urlEndpoint = '/ReportServices/TellerBalanceReport';
    const { data }: AxiosResponse<IGetTellerBalanceReportResponseType> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          branchCode: params.branchId,
          customerId: params.customerId,
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
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

export function useGetTellerBalanceReport(
  params: IEnquiryParams
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
      params?.branchId || '',
      params?.customerId || '',
      params?.pageNumber || 1,
      params?.startDate || '',
      params?.endDate || '',
      params?.getAll || false,
    ],
    queryFn: () => getTellerBalanceReport(params, toastActions),
    enabled: Boolean((params?.branchId || '').length > 0 || params.customerId)
  });

  return { ...data, isError, isLoading };
}
