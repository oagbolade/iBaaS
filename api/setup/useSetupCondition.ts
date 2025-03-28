import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  ISetupCondition,
  SearchSetupConditionResponse,
  UseAllSetupConditionResponse
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
import { CreateSetupConditionFormValues } from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createSetupCondition(
  toastActions: IToastActions,
  body: CreateSetupConditionFormValues,
  isUpdating: boolean,
  code: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/ConditionPrecedence/${
      isUpdating
        ? `UpdateConditionPrecedence?code=${decryptData(code as string)}`
        : 'CreateConditionPrecedence'
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
export async function filterSetupConditionSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/conditionprecedent?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchSetupConditionResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          code: params?.code,
          description: params?.description
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
async function getSetupConditionByCode(
  toastActions: IToastActions,
  code: string | null
): Promise<UseAllSetupConditionResponse> {
  let result: UseAllSetupConditionResponse = {
    responseCode: '',
    responseDescription: '',
    conditionPrecedence: {} as ISetupCondition
  };

  try {
    const urlEndpoint = `/Configuration/ConditionPrecedence/GetConditionPrecedence?code=${decryptData(code as string)}`;

    const { data }: AxiosResponse<UseAllSetupConditionResponse> =
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

export function useGetSetupConditionByCode(
  code: string
): UseAllSetupConditionResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseAllSetupConditionResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getSetupCondition, code],
    queryFn: () => getSetupConditionByCode(toastActions, code),
    enabled: Boolean((code || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
export function useFilterSetupConditionSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterSetupConditionSearch,
      params?.code || '',
      params?.description || '',
      params?.page || 1
    ],
    queryFn: () => filterSetupConditionSearch(toastActions, params),
    enabled: Boolean(
      (params?.description || '').length > 0 || (params?.code || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useSetupCondition(
  isUpdating: boolean = false,
  code: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateSetupConditionFormValues) =>
      createSetupCondition(toastActions, body, isUpdating, code),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getSetupCondition],
        [queryKeys.filterSetupConditionSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/setup/product-gl/setup-condition/');
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
