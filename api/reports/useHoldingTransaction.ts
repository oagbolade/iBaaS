import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { IHoldingTransactionReportResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';
import { REPORT_BASE_URL } from '@/axiosInstance/constants';

export async function getHoldingTransactionReport(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: IHoldingTransactionReportResponse =
    {} as IHoldingTransactionReportResponse;
  try {
    const queryParams = {
      BranchCode: params?.branchID || '',
      pageNumber: String(params?.pageNumber || '1'),
      pageSize: String(params?.pageSize || '10'),
      getAll: String(params?.getAll || 'false'),
      startDate: params?.startDate || '',
      endDate: params?.endDate || '',
      searchWith: params?.searchWith || ''
    };

    const urlEndpoint = `${REPORT_BASE_URL}/ReportServices/HoldTranReport?${new URLSearchParams(queryParams)}`;

    const { data }: AxiosResponse<IHoldingTransactionReportResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });
    const { message, title, severity } = globalErrorHandler({
      ...data,
      data: Array.isArray(data.data) ? data.data : [data.data],
      isSearch: true
    });
    toast(message, title, severity, toastActions);
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetHoldingTransactionReport(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IHoldingTransactionReportResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      params?.branchID,
      params?.searchWith,
      params?.startDate,
      params?.endDate,
      params?.pageNumber,
      params?.pageSize
    ],
    queryFn: () => getHoldingTransactionReport(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.searchWith || '').length > 0 ||
        (params?.startDate || '').length > 0 ||
        (params?.endDate || '').length > 0 ||
        (params?.pageNumber || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
