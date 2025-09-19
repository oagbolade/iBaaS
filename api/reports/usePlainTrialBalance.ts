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
import { PlainTrialBalanceResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';

import { REPORT_BASE_URL } from '@/axiosInstance/constants';

export async function getPlainTrialBalance(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: PlainTrialBalanceResponse = {} as PlainTrialBalanceResponse;
  try {
    // report url
    const urlEndpoint = `${REPORT_BASE_URL}/ReportServices/PLAINTRIALBALANCE?reportdate=${params?.reportDate}&reporttype=${params?.reportType}&branchcode=${params?.branchID}&pageNumber=${params?.pageNumber}&pageSize=${params?.pageSize || '10'}&getAll=${params?.getAll}&searchWith=${params?.searchWith|| ''}`;
  
    const { data }: AxiosResponse<PlainTrialBalanceResponse> =
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

export function useGetPlainTrialBalance(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as PlainTrialBalanceResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.plainTrialBalance,
      params?.branchID,
      params?.reportDate,
      params?.reportType,
      params?.searchWith,
      params?.getAll,
      params?.pageNumber,
      params?.pageSize,
      params?.page
    ],
    queryFn: () => getPlainTrialBalance(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.reportType || '').length > 0 ||
        (params?.searchWith || '').length > 0 ||
        (params?.reportDate || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
