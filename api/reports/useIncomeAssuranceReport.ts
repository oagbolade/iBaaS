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
  GetAllIncomeAssuranceReportResponse,
  GetAllStandingInstructionsResponse
} from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';

export async function getincomeAssurance(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: GetAllIncomeAssuranceReportResponse =
    {} as GetAllIncomeAssuranceReportResponse;
  try {
    const urlEndpoint = `/ReportServices/IncomeAssuranceReport?actionCode=${params?.pCode}&Startdate=${params?.startDate}&enddate=${params?.endDate}&pageNumber=${params?.pageNumber || 1}&pageSize=${params?.pageSize || 10}`;
    const { data }: AxiosResponse<GetAllIncomeAssuranceReportResponse> =
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

export function useGetIncomeAssuranceReport(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllIncomeAssuranceReportResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getincomeAssurance,
      params?.pCode || '',
      // params?.branchID || '',
      params?.startDate || '',
      params?.endDate || '',
      params?.page || 1
    ],
    queryFn: () => getincomeAssurance(toastActions, params || {}),
    enabled: Boolean(
      (params?.startDate || '').length > 0 ||
      (params?.pCode || '').length > 0 ||
        (params?.branchID || '').length > 0 ||
        (params?.endDate || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
