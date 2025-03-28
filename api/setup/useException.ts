import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IException,
  SearchExceptionResponse,
  UseGetAllExceptionResponse
} from '../ResponseTypes/setup';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { CreateExceptionFormValues } from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createException(
  toastActions: IToastActions,
  body: CreateExceptionFormValues,
  isUpdating: boolean,
  exceptioncode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Exception/${
      isUpdating
        ? `UpdateException?Exceptioncode=${exceptioncode}`
        : 'CreateException'
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
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
}
export async function filterExceptionSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/exceptions?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchExceptionResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          behaviour: params?.behaviour,
          exceptionDesc: params?.exceptionDesc,
          exceptioncode: params?.exceptioncode
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

async function getExceptionByCode(
  toastActions: IToastActions,
  exceptioncode: string | null
): Promise<UseGetAllExceptionResponse> {
  let result: UseGetAllExceptionResponse = {
    responseCode: '',
    responseDescription: '',
    exceptionData: {} as IException
  };

  try {
    const urlEndpoint = `/Configuration/Exception/GetException?Exceptioncode=${exceptioncode}`;

    const { data }: AxiosResponse<UseGetAllExceptionResponse> =
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
export function useFilterExceptionSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterExceptionSearch,
      params?.exceptioncode || '',
      params?.behaviour || '',
      params?.exceptionDesc || '',
      params?.page || 1
    ],
    queryFn: () => filterExceptionSearch(toastActions, params),
    enabled: Boolean(
      (params?.behaviour || '').length > 0 ||
        (params?.exceptioncode || '').length > 0 ||
        (params?.exceptionDesc || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetExceptionByCode(
  exceptioncode: string | null
): UseGetAllExceptionResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllExceptionResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getExceptionByCode,
      decryptData(exceptioncode as string)
    ],
    queryFn: () =>
      getExceptionByCode(toastActions, decryptData(exceptioncode as string)),
    enabled: Boolean((exceptioncode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateException(
  isUpdating: boolean = false,
  exceptioncode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateExceptionFormValues) =>
      createException(
        toastActions,
        body,
        isUpdating,
        decryptData(exceptioncode as string)
      ),
    onSuccess: () => {
      const keysToInvalidate = [[queryKeys.getExceptionByCode], [queryKeys.filterExceptionSearch]];
      keysToInvalidate.forEach(key => queryClient.invalidateQueries({ queryKey: key }));

      handleRedirect(router, '/setup/product-gl/exception/');
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
