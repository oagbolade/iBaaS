import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import { SearchRelationshipResponse } from '../ResponseTypes/setup';
import {
  GetAllRelationshipResponse,
  IRelationship
} from '@/api/ResponseTypes/customer-service';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { ISearchParams } from '@/app/api/search/route';
import { CreateRelationShipFormValues } from '@/schemas/schema-values/setup';
import { handleRedirect } from '@/utils';

import { decryptData } from '@/utils/decryptData';

async function createRelationship(
  toastActions: IToastActions,
  body: CreateRelationShipFormValues,
  isUpdating: boolean,
  relationid: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Relationship/${
      isUpdating
        ? `UpdateRelationship?relationid=${decryptData(relationid as string)}`
        : 'CreateRelationship'
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

export async function filterRelationshipSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/relationship?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchRelationshipResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status,
          relationname: params?.relationname,
          relationid: params?.relationid
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

async function getRelationshipById(
  toastActions: IToastActions,
  relationid: string | null
): Promise<GetAllRelationshipResponse> {
  let result: GetAllRelationshipResponse = {
    responseCode: '',
    responseDescription: '',
    relationship: {} as IRelationship
  };

  try {
    const urlEndpoint = `/Configuration/Relationship/GetRelationshipById?relationid=${decryptData(relationid as string)}`;

    const { data }: AxiosResponse<GetAllRelationshipResponse> =
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

export function useFilterRelationshipSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterRelationshipSearch,
      params?.relationid || '',
      params?.status?.toString() || '',
      params?.relationname || '',
      params?.page || 1
    ],
    queryFn: () => filterRelationshipSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.relationid || '').length > 0 ||
        (params?.relationname || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
export function useGetRelationshipById(
  relationid: string | null
): GetAllRelationshipResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllRelationshipResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getRelationshipById, relationid],
    queryFn: () => getRelationshipById(toastActions, relationid),
    enabled: Boolean((relationid || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateRelationship(
  isUpdating: boolean = false,
  relationid: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateRelationShipFormValues) =>
      createRelationship(toastActions, body, isUpdating, relationid),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getRelationshipById],
        [queryKeys.filterRelationshipSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/kyc/relationship/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

async function getAllRelationships(
  toastActions: IToastActions
): Promise<GetAllRelationshipResponse> {
  let result: GetAllRelationshipResponse = {
    responseCode: '',
    responseDescription: '',
    relationships: [] as IRelationship[]
  };

  try {
    const urlEndpoint = '/Configuration/Relationship/GetRelationship';

    const { data }: AxiosResponse<GetAllRelationshipResponse> =
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

export function useGetAllRelationships() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllRelationshipResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllRelationships],
    queryFn: () => getAllRelationships(toastActions)
  });

  return { ...data, isError, isLoading };
}
