import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  IZone,
  SearchZoneResponse,
  UseAllZoneResponse
} from '@/api/ResponseTypes/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { CreateZoneFormValues } from '@/schemas/schema-values/setup';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createZone(
  toastActions: IToastActions,
  body: CreateZoneFormValues,
  isUpdating: boolean,
  zoneid: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Zone/${
      isUpdating
        ? `UpdateZone?zoneid=${decryptData(zoneid as string)}`
        : 'CreateZone'
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

export async function filterZoneSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/zones?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchZoneResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        status: params?.status,
        zoneName: params?.zoneName,
        zoneid: params?.zoneid
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

async function getZoneById(
  toastActions: IToastActions,
  zoneid: string | null
): Promise<UseAllZoneResponse> {
  let result: UseAllZoneResponse = {
    responseCode: '',
    responseDescription: '',
    zone: {} as IZone
  };

  try {
    const urlEndpoint = `/Configuration/Zone/GetZoneById?zoneid=${decryptData(zoneid as string)}`;

    const { data }: AxiosResponse<UseAllZoneResponse> = await axiosInstance({
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

export function useFilterZoneSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterZoneSearch,
      params?.zoneid || '',
      params?.status?.toString() || '',
      params?.zoneName || '',
      params?.page || 1
    ],
    queryFn: () => filterZoneSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.zoneid || '').length > 0 ||
        (params?.zoneName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
export function useGetZoneById(zoneid: string | null): UseAllZoneResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseAllZoneResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getZoneById, zoneid],
    queryFn: () => getZoneById(toastActions, decryptData(zoneid as string)),
    enabled: Boolean((zoneid || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateZone(
  isUpdating: boolean = false,
  zoneid: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateZoneFormValues) =>
      createZone(toastActions, body, isUpdating, decryptData(zoneid as string)),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getZoneById],
        [queryKeys.filterZoneSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/kyc/zone-setup/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
