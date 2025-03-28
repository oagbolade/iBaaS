import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { status } from 'nprogress';
import { useRouter } from 'next/navigation';
import {
  IStateById,
  SearchStateResponse,
  UseGetAllStateResponse
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
import { UpdateStateFromValue } from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';
import { SetupAndCustomerModuleContext } from '@/context/SetupAndCustomerContext';

async function updateState(
  toastActions: IToastActions,
  body: UpdateStateFromValue,
  StateCode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/State/UpdateState?StateCode=${StateCode}`;
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'PUT',
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

async function getUpdateStateById(
  toastActions: IToastActions,
  stateCode: string | null
): Promise<UseGetAllStateResponse> {
  let result: UseGetAllStateResponse = {
    responseCode: '',
    responseDescription: '',
    state: {} as IStateById
  };

  try {
    const urlEndpoint = `/Configuration/State/GetStateById?StateCode=${stateCode}`;

    const { data }: AxiosResponse<UseGetAllStateResponse> = await axiosInstance(
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

export async function filterStateSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/states?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchStateResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        status: params?.status,
        stateName: params?.stateName,
        region: params?.region,
        stateCode: params?.stateCode
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

export function useFilterStateSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterStateSearch,
      params?.region || '',
      params?.stateCode || '',
      params?.status?.toString() || '',
      params?.stateName || '',
      params?.page || 1
    ],
    queryFn: () => filterStateSearch(toastActions, params),
    enabled: Boolean(
      (params?.stateCode || '').length > 0 ||
        (params?.stateName || '').length > 0 ||
        (params?.region || '').length > 0 ||
        (params?.status?.toString() || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetStateById(
  stateCode: string | null
): UseGetAllStateResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllStateResponse;

  const { setupAndCustomerData } = useContext(SetupAndCustomerModuleContext);
  const storedStateCode = setupAndCustomerData.stateCode.toString();

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getStateById, stateCode],
    queryFn: () =>
      getUpdateStateById(toastActions, stateCode || storedStateCode),
    enabled: Boolean(
      (stateCode || '').length > 0 || storedStateCode?.length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useCreateState(StateCode: string | null = null) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: UpdateStateFromValue) =>
      updateState(toastActions, body, StateCode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getAllStates],
        [queryKeys.filterStateSearch],
        [queryKeys.getStateById]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/company/state-management/');
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
