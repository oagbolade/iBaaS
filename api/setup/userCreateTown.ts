import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertColor } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  ITownName,
  SearchTownResponse,
  UseGetAllTownResponse
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
import { CreateTownFormValues } from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';

import { decryptData } from '@/utils/decryptData';

async function createTown(
  toastActions: IToastActions,
  body: CreateTownFormValues,
  isUpdating: boolean,
  towncode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Town/${
      isUpdating ? `UpdateTown?TownCode=${towncode}` : 'CreateTown'
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

async function getTownByName(
  toastActions: IToastActions,
  townname: string | null
): Promise<UseGetAllTownResponse> {
  let result: UseGetAllTownResponse = {
    responseCode: '',
    responseDescription: '',
    towns: [] as ITownName[]
  };

  try {
    const urlEndpoint = `/Configuration/Town/GetTownByName?TownName=${townname}`;

    const { data }: AxiosResponse<UseGetAllTownResponse> = await axiosInstance({
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
async function getTownByCode(
  toastActions: IToastActions,
  townCode: string | null
): Promise<UseGetAllTownResponse> {
  let result: UseGetAllTownResponse = {
    responseCode: '',
    responseDescription: '',
    town: {} as ITownName
  };

  try {
    const urlEndpoint = `/Configuration/Town/GetTownById?TownCode=${townCode}`;

    const { data }: AxiosResponse<UseGetAllTownResponse> = await axiosInstance({
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

export async function filterTownSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/towns?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchTownResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        stateCode: params?.stateCode,
        townName: params?.townName,
        townCode: params?.townCode
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

export function useFilterTownSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterTownSearch,
      params?.townCode || '',
      params?.stateCode?.toString() || '',
      params?.townName || '',
      params?.page || 1
    ],
    queryFn: () => filterTownSearch(toastActions, params),
    enabled: Boolean(
      (params?.townCode || '').length > 0 ||
        (params?.stateCode?.toString() || '').length > 0 ||
        (params?.townName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
export function useGetTownByCode(
  townCode: string | null
): UseGetAllTownResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllTownResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getTownByCode, townCode],
    queryFn: () => getTownByCode(toastActions, townCode)
  });

  return { ...data, isError, isLoading };
}

export function useGetTownByName(
  townname: string | null
): UseGetAllTownResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllTownResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getTownByName, townname],
    queryFn: () => getTownByName(toastActions, townname)
  });

  return { ...data, isError, isLoading };
}

export function useCreateTown(
  isUpdating: boolean = false,
  towncode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateTownFormValues) =>
      createTown(toastActions, body, isUpdating, towncode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.filterTownSearch],
        [queryKeys.getTownByCode]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/company/town/');
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
