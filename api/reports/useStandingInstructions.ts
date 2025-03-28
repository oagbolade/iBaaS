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
  GetAllGroupLoanReportResponse,
  GetAllStandingInstructionsResponse
} from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';

export async function getStandingInstruction(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: GetAllStandingInstructionsResponse =
    {} as GetAllStandingInstructionsResponse;
  try {
    const urlEndpoint = `/ReportServices/SITransactionReport?pageNumber=${params?.pageNumber || 1}&pageSize=${params?.pageSize || 10}&getAll=${params?.getAll || false}`;
    const { data }: AxiosResponse<GetAllStandingInstructionsResponse> =
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

export function useGetStandingIntruction(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllStandingInstructionsResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getStandingInstruction,
      params?.branchID || '',
      params?.startDate || '',
      params?.endDate || '',
      params?.page || 1
    ],
    queryFn: () => getStandingInstruction(toastActions, params || {}),
    enabled: Boolean(
      (params?.startDate || '').length > 0 ||
        (params?.branchID || '').length > 0 ||
        (params?.endDate || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
