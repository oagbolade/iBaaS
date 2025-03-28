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
import { ChartOfAccountResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';
import { REPORT_BASE_URL } from '@/axiosInstance/constants';

export async function getChartOfAccount(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: ChartOfAccountResponse = {} as ChartOfAccountResponse;
  try {
    const urlEndpoint = `${REPORT_BASE_URL}/ReportServices/ChartsofAccounts?pageNumber=${params?.pageNumber || 1}&pageSize=${params?.pageSize || 10}`;

    // TODO: Uncomment the below line when the API is ready to accept branchID and searchWith
    // const urlEndpoint = `${REPORT_BASE_URL}/ReportServices/ChartsofAccounts?branchCode=${params?.branchID}&pageNumber=${params?.pageNumber || 1}&pageSize=${params?.pageSize || 10}&searchWith=${params?.searchWith}&getAll=${params?.getAll || false}`;

    const { data }: AxiosResponse<ChartOfAccountResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      }
    );
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

export function useGetChartOfAccount(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ChartOfAccountResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.chartAccount, params?.pageNumber || 1],
    queryFn: () => getChartOfAccount(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.searchWith || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
