import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  IAccountInDebitResponseType
} from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
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
}

async function fetchAccountInDebit(
  params: ISearchParams,
  toastActions: IToastActions
): Promise<IAccountInDebitResponseType | null> {
  try {
    const urlEndpoint = '/ReportServices/AccountsinDebitReport';

    const { data }: AxiosResponse<IAccountInDebitResponseType> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          branch: params.branchID,
          customerId: params.customerID,
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          startDate: params.startDate,
          endDate: params.endDate,
          getAll: params.getAll || false,
          searchWith: params.searchWith
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

export function useGetAccountInDebit(
  params: ISearchParams
): IAccountInDebitResponseType {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IAccountInDebitResponseType;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getAccountInDebit,
      params?.branchID || '',
      params?.customerID || '',
      params?.pageSize || 1,
      params?.pageNumber || 1,
      params?.getAll
    ],
    queryFn: () => fetchAccountInDebit(params, toastActions),
    enabled: Boolean((params?.branchID || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
