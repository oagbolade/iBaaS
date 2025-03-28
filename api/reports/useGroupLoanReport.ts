import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { queryKeys } from '@/react-query/constants';
import {
  ChequeBookStatusResponse,
  GetAllGroupLoanReportResponse
} from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';

export async function getGroupLoan(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: GetAllGroupLoanReportResponse =
    {} as GetAllGroupLoanReportResponse;
  try {
    const urlEndpoint = `/ReportServices/GroupLoanReport?pageNumber=${params?.pageNumber || 1}&pageSize=${params?.pageSize || 10}&getAll=${params?.getAll || false}`;
    const { data }: AxiosResponse<GetAllGroupLoanReportResponse> =
      await axiosInstance({
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
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetGroupLoan(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllGroupLoanReportResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getGroupLoan,
      params?.branchID || '',
      params?.tellerName || '',
      params?.page || 1
    ],
    queryFn: () => getGroupLoan(toastActions, params || {}),
    enabled: Boolean(
      (params?.tellerName || '').length > 0 ||
        (params?.branchID || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
