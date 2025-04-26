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
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  GetAllProfessionResponse,
  IProfession,
  SearchProfessionResponse
} from '@/api/ResponseTypes/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { CreateProfessionFormValues } from '@/schemas/schema-values/setup';
import { handleRedirect } from '@/utils';

import { decryptData } from '@/utils/decryptData';

async function createProfession(
  toastActions: IToastActions,
  body: CreateProfessionFormValues,
  isUpdating: boolean,
  profcode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Profession/${
      isUpdating
        ? `UpdateProfession?Profcode=${decryptData(profcode as string)}`
        : 'CreateProfession'
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

export async function filterProfessionSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/professions?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchProfessionResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status,
          profname: params?.profname,
          profcode: params?.profcode
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

async function getProfessionByCode(
  toastActions: IToastActions,
  profcode: string | null
): Promise<GetAllProfessionResponse> {
  let result: GetAllProfessionResponse = {
    responseCode: '',
    responseDescription: '',
    profession: {} as IProfession
  };

  try {
    const urlEndpoint = `/Configuration/Profession/GetProfessionById?Profcode=${decryptData(profcode as string)}`;

    const { data }: AxiosResponse<GetAllProfessionResponse> =
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

export function useFilterProfessionSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterProfessionSearch,
      params?.profcode || '',
      params?.status?.toString() || '',
      params?.profname || '',
      params?.page || 1
    ],
    queryFn: () => filterProfessionSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.profcode || '').length > 0 ||
        (params?.profname || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
export function useGetProfessionByCode(
  profcode: string | null
): GetAllProfessionResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllProfessionResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getProfessionByCode, profcode],
    queryFn: () => getProfessionByCode(toastActions, profcode),
    enabled: Boolean((profcode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateProfession(
  isUpdating: boolean = false,
  profcode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateProfessionFormValues) =>
      createProfession(toastActions, body, isUpdating, profcode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getProfessionByCode],
        [queryKeys.filterProfessionSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/kyc/profession/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
