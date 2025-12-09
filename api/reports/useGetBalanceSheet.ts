import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  GetAllBalanceSheetResponse,
  GetAllBalanceSheetByItemIdResponse
} from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';
import { ISearchParams } from '@/app/api/search/route';

async function fetchAllBalanceSheet(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: GetAllBalanceSheetResponse = {} as GetAllBalanceSheetResponse;

  try {
    const urlEndpoint = `/api/ReportServices/groupedBalanceSheetAndPAndL?
    startFrom=${params?.startFrom || ''}
    &pageNumber=${params?.page}
    &pageSize=${params?.pageSize || 10}
    &getAll=${params?.getAll || false}
    &searchWith=${params?.searchWith || ''}`;

    const { data }: AxiosResponse<GetAllBalanceSheetResponse> = await reportsAxiosInstance.get(
      urlEndpoint,
      {
        params: {
          startFrom: params?.startFrom,
          pageNumber: params?.page || 1,
          pageSize: params?.pageSize || 10,
          getAll: params?.getAll || false,
          searchWith: params?.searchWith?.trim()
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      }
    );

    const { message, title, severity } = globalErrorHandler({ ...data });
    toast(message, title, severity, toastActions);
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetAllBalanceSheet(
  params: ISearchParams | null
): GetAllBalanceSheetResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllBalanceSheetResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.balanceSheet,
      params?.branchID || '',
      params?.branchCode,
      params?.startFrom || '',
      params?.getAll || false,
      params?.pageSize || 10,
      params?.page || 1,
      params?.searchWith || ''
    ],
    queryFn: () => fetchAllBalanceSheet(toastActions, params || {}),
    enabled: Boolean((params?.branchID || '').length > 0 || params?.startFrom)
  });

  return { ...data, isError, isLoading };
}

async function fetchAllBalanceSheetByItemId(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: GetAllBalanceSheetByItemIdResponse =
    {} as GetAllBalanceSheetByItemIdResponse;

  try {
    const urlEndpoint = `/api/ReportServices/balanceSheetAndPAndLByItemId?itemcode=${params?.itemcode}&startFrom=2025-05-18&pageNumber=${params?.page}&pageSize=${params?.pageSize || 10}&getAll=${params?.getAll || false}&searchWith=${params?.searchWith || ''}`;
    const { data }: AxiosResponse<GetAllBalanceSheetByItemIdResponse> =
      await reportsAxiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler({ ...data });
    toast(message, title, severity, toastActions);
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetAllBalanceSheetByItemId(
  params: ISearchParams | null
): GetAllBalanceSheetByItemIdResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllBalanceSheetByItemIdResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.balanceSheetbyId,
      params?.itemcode || '',
      params?.getAll || false,
      params?.pageSize || 10,
      params?.page || 1,
      params?.searchWith || ''
    ],
    queryFn: () => fetchAllBalanceSheetByItemId(toastActions, params || {}),
    enabled: Boolean(
      params?.itemcode ||
        '' ||
        params?.getAll ||
        false ||
        params?.pageSize ||
        10 ||
        params?.page ||
        '' ||
        params?.pageSize ||
        params?.searchWith
    )
  });

  return { ...data, isError, isLoading };
}
