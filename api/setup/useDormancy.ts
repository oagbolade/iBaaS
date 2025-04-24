import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IDormancy,
  SearchDormancyResponse,
  UseGetAllDormancyResponse
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
  CreateDormancyFormValues,
  DormancySearchParams
} from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createDormancy(
  toastActions: IToastActions,
  body: CreateDormancyFormValues,
  isUpdating: boolean,
  prodCode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Dormancy/${
      isUpdating ? `UpdateDormancy?ProdCode=${prodCode}` : 'CreateDormancy'
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

async function getDormancyByCode(
  toastActions: IToastActions,
  prodCode: string | null
): Promise<UseGetAllDormancyResponse> {
  let result: UseGetAllDormancyResponse = {
    responseCode: '',
    responseDescription: '',
    dormancyData: {} as IDormancy
  };

  try {
    const urlEndpoint = `/Configuration/Dormancy/GetDormancybyProdCode?ProdCode=${prodCode}`;

    const { data }: AxiosResponse<UseGetAllDormancyResponse> =
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

export async function filterDormancySearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/dormancycriteria?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchDormancyResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status,
          prodCode: params?.prodCode,
          narration: params?.narration
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

export function useFilterDormancySearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterDormancySearch,
      params?.prodCode || '',
      params?.status || '',
      params?.narration || '',
      params?.page || 1
    ],
    queryFn: () => filterDormancySearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.prodCode || '').length > 0 ||
        (params?.narration || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetDormancyByCode(
  prodCode: string | null
): UseGetAllDormancyResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllDormancyResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getDormancyByCode, prodCode],
    queryFn: () => getDormancyByCode(toastActions, prodCode),
    enabled: Boolean((prodCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateDormancy(
  isUpdating: boolean = false,
  prodCode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateDormancyFormValues) =>
      createDormancy(toastActions, body, isUpdating, prodCode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getDormancyByCode],
        [queryKeys.filterDormancySearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/operations/dormancy-criteria/');
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
