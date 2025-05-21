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
import { IPostingJournalResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';
import { REPORT_BASE_URL } from '@/axiosInstance/constants';

export async function getPostingJournal(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: IPostingJournalResponse = {} as IPostingJournalResponse;
  try {
    const queryParams = {
      branchCode: params?.branchID || '',
      till: params?.till || '001110010010002',
      pageNumber: params?.pageNumber || '1',
      pageSize: params?.pageSize || '10',
      getAll: String(params?.getAll || false),
      startDate: params?.startDate || '',
      endDate: params?.endDate || '',
      searchWith: params?.searchWith || ''
    };
    const urlEndpoint = `${REPORT_BASE_URL}/ReportServices/PostingJournal?${new URLSearchParams(queryParams)}`;
    const { data }: AxiosResponse<IPostingJournalResponse> =
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
    if (data.postingJournalList === null) {
      data.postingJournalList = [];
    }
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetPostingJournal(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IPostingJournalResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.maturityLoan,
      params?.branchID,
      params?.prodCode,
      params?.startDate,
      params?.endDate,
      params?.searchWith,
      params?.pageNumber,
      params?.pageSize,
      params?.getAll
    ],
    queryFn: () => getPostingJournal(toastActions, params || {}),
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
