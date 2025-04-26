import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IRegionByCode,
  SearchRegionResponse,
  UseGetAllRegionResponse
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
  CreateRegionFormValues,
  RegionSearchParams
} from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createRegion(
  toastActions: IToastActions,
  body: CreateRegionFormValues,
  isUpdating: boolean,
  regionCode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Region/${
      isUpdating ? `UpdateRegion?RegionCode=${regionCode}` : 'CreateRegion'
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
async function getRegion(
  toastActions: IToastActions
): Promise<UseGetAllRegionResponse> {
  let result: UseGetAllRegionResponse = {
    responseCode: '',
    responseDescription: '',
    region: [] as IRegionByCode[]
  };

  try {
    const urlEndpoint = '/General/Region/GetAllRegion';

    const { data }: AxiosResponse<UseGetAllRegionResponse> =
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
async function getRegionById(
  toastActions: IToastActions,
  regionCode: string | null
): Promise<UseGetAllRegionResponse> {
  let result: UseGetAllRegionResponse = {
    responseCode: '',
    responseDescription: '',
    region: {} as IRegionByCode
  };

  try {
    const urlEndpoint = `/Configuration/Region/GetRegionById?RegionCode=${regionCode}`;

    const { data }: AxiosResponse<UseGetAllRegionResponse> =
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

export async function filterRegionSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/regions?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchRegionResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        status: params?.status,
        regionName: params?.regionName,
        regionCode: params?.regionCode
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

export function useFilterRegionSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterRegionSearch,
      params?.regionCode || '',
      params?.status?.toString() || '',
      params?.regionName || '',
      params?.page || 1
    ],
    queryFn: () => filterRegionSearch(toastActions, params),
    enabled: Boolean(
      (params?.regionCode || '').length > 0 ||
        (params?.status?.toString() || '').length > 0 ||
        (params?.regionName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
export function useGetRegion(): UseGetAllRegionResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllRegionResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getRegion],
    queryFn: () => getRegion(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetRegionById(
  regionCode: string | null
): UseGetAllRegionResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllRegionResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getRegionById, regionCode],
    queryFn: () => getRegionById(toastActions, regionCode),
    enabled: Boolean((regionCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateRegion(
  isUpdating: boolean = false,
  regionCode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateRegionFormValues) =>
      createRegion(toastActions, body, isUpdating, regionCode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getRegionById],
        [queryKeys.filterRegionSearch]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/company/region/');
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
