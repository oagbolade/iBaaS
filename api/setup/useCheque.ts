import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  ICheque,
  SearchChequeBookResponse,
  UseGetAllChequeResponse
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
  ChequeSearchParams,
  CreateChequeBookFormValues
} from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createCheque(
  toastActions: IToastActions,
  body: CreateChequeBookFormValues,
  isUpdating: boolean,
  typeid: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Chequebook/${
      isUpdating
        ? `UpdateChequeBook?typeid=${decryptData(typeid as string)}`
        : 'CreateChequebook'
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
    if (!SUCCESS_CODES.includes(data.responseCode || '')) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

export async function filterChequeSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/cheques?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchChequeBookResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status,
          typeId: params?.typeId,
          typeDesc: params?.typeDesc
        },
        headers: {
          'Tenant-ID': getStoredUser()?.companyCode || '',
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

export function useFilterChequeSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterChequeSearch,
      params?.typeId || '',
      params?.status || '',
      params?.typeDesc || '',
      params?.page || 1
    ],
    queryFn: () => filterChequeSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.typeId || '').length > 0 ||
        (params?.typeDesc || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

async function getChequeById(
  toastActions: IToastActions,
  typeid: string | null
): Promise<UseGetAllChequeResponse> {
  let result: UseGetAllChequeResponse = {
    responseCode: '',
    responseDescription: '',
    checkbooks: {} as ICheque
  };

  try {
    const urlEndpoint = `/Configuration/ChequeBook/GetChequeBookByTypeid?typeid=${decryptData(typeid as string)}`;

    const { data }: AxiosResponse<UseGetAllChequeResponse> =
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

export function useGetChequeById(
  typeid: string | null
): UseGetAllChequeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseGetAllChequeResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getChequeBookById, decryptData(typeid as string)],
    queryFn: () => getChequeById(toastActions, decryptData(typeid as string)),
    enabled: Boolean((typeid || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateCheque(
  isUpdating: boolean = false,
  typeid: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateChequeBookFormValues) =>
      createCheque(
        toastActions,
        body,
        isUpdating,
        decryptData(typeid as string)
      ),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getChequeBookById],
        [queryKeys.filterChequeSearch]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/operations/cheque-book/');
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
