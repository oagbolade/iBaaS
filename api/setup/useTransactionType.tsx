import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  ITransactionType,
  SearchTransactionResponse,
  UseGetAllTransactionTypeResponse
} from '../ResponseTypes/setup';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  CreateTransactionTypeFormValues,
  TransactionTypeSearchParams
} from '@/schemas/schema-values/setup';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { ISearchParams } from '@/app/api/search/route';
import { handleRedirect } from '@/utils';

import { decryptData } from '@/utils/decryptData';

async function createTransactionType(
  toastActions: IToastActions,
  body: CreateTransactionTypeFormValues,
  isUpdating: boolean,
  tranCode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/TransactType/${
      isUpdating
        ? `UpdateTransactType?TranCode=${decryptData(tranCode as string)}`
        : 'CreateTransactType'
    }`;
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: isUpdating ? 'PUT' : 'POST',
      data: { ...body },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);
    if (!SUCCESS_CODES.includes(data?.responseCode as string)) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
}

async function getTransactionTypeByCode(
  toastActions: IToastActions,
  tranCode: string | null
): Promise<UseGetAllTransactionTypeResponse> {
  let result: UseGetAllTransactionTypeResponse = {
    responseCode: '',
    responseDescription: '',
    transactType: {} as ITransactionType
  };

  try {
    const urlEndpoint = `/Configuration/TransactType/GetTransactTypeById?TranCode=${decryptData(tranCode as string)}`;

    const { data }: AxiosResponse<UseGetAllTransactionTypeResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export async function filterTransactionSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/transactiontype?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchTransactionResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status,
          tranCode: params?.tranCode,
          tranName: params?.tranName
        },
        headers: {
          'Content-Type': 'application/json',
          token: `${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler({
      ...data,
      isSearch: true
    });
    toast(message, title, severity, toastActions);
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler(
      { isSearch: true },
      errorResponse
    );
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useFilterTransactionSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterTransactionSearch,
      params?.tranCode || '',
      params?.status || '',
      params?.tranName || '',
      params?.page || 1
    ],
    queryFn: () => filterTransactionSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.tranCode || '').length > 0 ||
        (params?.tranName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetTransactionTypeByCode(
  tranCode: string | null
): UseGetAllTransactionTypeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseGetAllTransactionTypeResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getTransactionTypeByCode, tranCode],
    queryFn: () => getTransactionTypeByCode(toastActions, tranCode),
    enabled: Boolean((tranCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateTransactionType(
  isUpdating: boolean = false,
  clearingid: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateTransactionTypeFormValues) =>
      createTransactionType(toastActions, body, isUpdating, clearingid),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getTransactionTypeByCode],
        [queryKeys.filterTransactionSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/operations/transaction-type/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

// Return the user object and auth methods
