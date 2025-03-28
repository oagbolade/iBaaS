import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IInterest,
  SearchInterestResponse,
  UseAllInterestResponse
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
import {
  CreateInterestFormValues,
  interestsSearchParams
} from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';

import { decryptData } from '@/utils/decryptData';

async function createInterest(
  toastActions: IToastActions,
  body: CreateInterestFormValues,
  isUpdating: boolean,
  intCode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Interest/${
      isUpdating
        ? `UpdateInterest?intCode=${decryptData(intCode as string)}`
        : 'CreateInterest'
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

async function getInterestByCode(
  toastActions: IToastActions,
  interestCode: string | null
): Promise<UseAllInterestResponse> {
  let result: UseAllInterestResponse = {
    responseCode: '',
    responseDescription: '',
    interest: {} as IInterest
  };

  try {
    const urlEndpoint = `/Configuration/Interest/GetInterestbyCode?interestCode=${decryptData(interestCode as string)}`;

    const { data }: AxiosResponse<UseAllInterestResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      }
    );

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export async function filterInterestSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/interests?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchInterestResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'POST',
        data: {
          intName: params?.intName,
          status: params?.status,
          intcode: params?.intcode
        },
        headers: {
          'Content-Type': 'application/json',
          token: `${getStoredUser()?.token}`
        }
      }
    );

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

export function useFilterInterestSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterInterestSearch,
      params?.intName || '',
      params?.status || '',
      params?.intcode || '',
      params?.page || 1
    ],
    queryFn: () => filterInterestSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.intcode || '').length > 0 ||
        (params?.intName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetInterestByCode(
  interestCode: string | null
): UseAllInterestResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseAllInterestResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getInterest, interestCode],
    queryFn: () => getInterestByCode(toastActions, interestCode),
    enabled: Boolean((interestCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateInterest(
  isUpdating: boolean = false,
  intCode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateInterestFormValues) =>
      createInterest(toastActions, body, isUpdating, intCode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getInterest],
        [queryKeys.filterInterestSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/setup/product-gl/interest/');
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
