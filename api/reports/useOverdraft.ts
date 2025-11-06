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
import { IOverdraftReportResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';
import { REPORT_BASE_URL } from '@/axiosInstance/constants';

export async function getOverdraftReport(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: IOverdraftReportResponse = {} as IOverdraftReportResponse;
  try {
    const queryParams: Record<string, string> = {
      branchcode: params?.branchID || '',
      pageNumber: params?.pageNumber ? String(params.pageNumber) : '1',
      pageSize: params?.pageSize ? String(params.pageSize) : '10',
      getAll: String(params?.getAll || 'false'),
      startdate: params?.startDate || '',
      enddate: params?.endDate || '',
      searchWith: params?.searchWith || ''
    };

    const urlEndpoint = `/api/ReportServices/OverDraftReport?${new URLSearchParams(queryParams)}`;
    const { data }: AxiosResponse<IOverdraftReportResponse> =
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
    if (data.overDraftReport === null) {
      data.overDraftReport = [];
    }
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  if (
    result?.overDraftReport === null ||
    result?.overDraftReport === undefined
  ) {
    result.overDraftReport = [];
  }

  return result;
}

export function useGetOverdraftReport(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IOverdraftReportResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.maturityLoan,
      params?.branchID,
      params?.prodCode,
      params?.searchWith,
      params?.pageNumber,
      params?.pageSize,
      params?.getAll,
      params?.startDate,
      params?.endDate
    ],
    queryFn: () => getOverdraftReport(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.prodCode || '').length > 0 ||
        (params?.startDate || '').length > 0 ||
        (params?.endDate || '').length > 0 ||
        (params?.searchWith || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
