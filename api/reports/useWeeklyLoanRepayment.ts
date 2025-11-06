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
import { LoanWeeklyRepaymentResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';
import { REPORT_BASE_URL } from '@/axiosInstance/constants';

export async function geWeeklyLoanRepayment(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: LoanWeeklyRepaymentResponse = {} as LoanWeeklyRepaymentResponse;
  try {
    const queryParams = new URLSearchParams({
      branchcode: params?.branchID || '',
      productcode: params?.prodCode || '000',
      groupid: params?.groupId || '000',
      startDate: params?.startDate || '',
      endDate: params?.endDate || '',
      pageNumber: params?.pageNumber?.toString() || '1',
      pageSize: params?.pageSize?.toString() || '10',
      getAll: params?.getAll?.toString() || 'false',
      searchWith: params?.searchWith || ''
    }).toString();

    const urlEndpoint = `/api/ReportServices/LoanWeeklyRepaymentReport?${queryParams}`;
    const { data }: AxiosResponse<LoanWeeklyRepaymentResponse> =
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

export function useGetWeeklyLoanRepayment(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as LoanWeeklyRepaymentResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.weeklyLoanRepayment,
      params?.branchID,
      params?.prodCode,
      params?.searchWith,
      params?.startDate,
      params?.endDate,
      params?.prodCode,
      params?.groupId,
      params?.getAll,
      params?.pageNumber,
      params?.pageSize,
      params?.page
    ],
    queryFn: () => geWeeklyLoanRepayment(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.startDate || '').length > 0 ||
        (params?.searchWith || '').length > 0 ||
        (params?.endDate || '').length > 0 ||
        (params?.prodCode || '').length > 0 ||
        (params?.groupId || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
