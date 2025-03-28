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
import { CustomerBalanceResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';
import { REPORT_BASE_URL } from '@/axiosInstance/constants';

export async function getCustomerBalance(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: CustomerBalanceResponse = {} as CustomerBalanceResponse;
  try {
    const urlEndpoint = `${REPORT_BASE_URL}/ReportServices/Customerbalances?BranchCode=${params?.branchID}&pageNumber=${params?.page}&pageSize=${params?.pageSize}&getAll=${params?.getAll}`;

    // TODO : Uncomment the below line when the API is ready to accept searchWith, startDate, endDate and pCode
    // const urlEndpoint = `${REPORT_BASE_URL}/ReportServices/Customerbalances?BranchCode=${params?.branchID}&startDate=${params?.startDate}&endDate=${params?.endDate}&pageNumber=${params?.page}&pCode=${params?.pCode}&pageSize=${params?.pageSize}&searchWith=${params?.searchWith}&getAll=${params?.getAll}`;
    const { data }: AxiosResponse<CustomerBalanceResponse> =
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

export function useGetCustomerBalance(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as CustomerBalanceResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.customerBalance,
      params?.branchID || '',
      params?.searchWith || '',
      params?.pCode || '',
      params?.startDate || '',
      params?.endDate || '',
      params?.getAll || false,
      params?.pageSize || 10,
      params?.page || 1
    ],
    queryFn: () => getCustomerBalance(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        params?.searchWith ||
        params?.pCode ||
        params?.startDate ||
        params?.endDate
    )
  });
  return { ...data, isError, isLoading };
}
