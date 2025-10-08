import { useContext } from 'react';
import { AxiosResponse  } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { reportsAxiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { queryKeys } from '@/react-query/constants';
import { ChequeBookStatusResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';

export async function getChequebookStatus(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: ChequeBookStatusResponse = {} as ChequeBookStatusResponse;
  try {
    const urlEndpoint = `/ReportServices/Chequebookstatus?status=${params?.status}&startDate=${params?.startDate}&endDate=${params?.endDate}&acctno=${params?.accountNumber || ''}&pageNumber=${params?.pageNumber || 1}&pageSize=${params?.pageSize || 10}&getAll=${params?.getAll || false}`;
    const { data }: AxiosResponse<ChequeBookStatusResponse> =
      await reportsAxiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });
    const { message, title, severity } = globalErrorHandler({
      ...data
    });
    toast(message, title, severity, toastActions);
    if (data.chequeBookList === null) {
      data.chequeBookList = [];
    }
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetCheckbookStatus(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ChequeBookStatusResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.chequeBook,
      params?.accountNumber || '',
      params?.status?.toString || '',
      params?.branchID?.toString || '',
      params?.startDate || '',
      params?.endDate || '',
      params?.page || 1,
      params?.status
    ],
    queryFn: () => getChequebookStatus(toastActions, params || {}),
    enabled: Boolean(
      (params?.accountNumber || '').length > 0 ||
        (params?.status?.toString || '').length > 0 ||
        (params?.branchID?.toString || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
