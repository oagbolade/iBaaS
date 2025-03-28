import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IDocumentById,
  SearchDocumentResponse,
  UseGetAllDocumentResponse
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
import { CreateDocumentFormValues } from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createDocument(
  toastActions: IToastActions,
  body: CreateDocumentFormValues,
  isUpdating: boolean,
  docid: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/MeansofId/${
      isUpdating ? `UpdateMeansofId?docid=${docid}` : 'CreateMeansofId'
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

async function getDocumentById(
  toastActions: IToastActions,
  docid: string | null
): Promise<UseGetAllDocumentResponse> {
  let result: UseGetAllDocumentResponse = {
    responseCode: '',
    responseDescription: '',
    documents: {} as IDocumentById
  };

  try {
    const urlEndpoint = `Configuration/MeansofId/GetMeansofId?docid=${docid}`;

    const { data }: AxiosResponse<UseGetAllDocumentResponse> =
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

export async function filterDocumentSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/documents?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchDocumentResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status,
          docName: params?.docName,
          docShortname: params?.docShortname
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

export function useFilterDocumentSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterDocumentSearch,
      params?.docId || '',
      params?.status?.toString() || '',
      params?.docName || '',
      params?.page || 1
    ],
    queryFn: () => filterDocumentSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.docId || '').length > 0 ||
        (params?.docName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
export function useGetDocumentById(
  docid: string | null
): UseGetAllDocumentResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseGetAllDocumentResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getDocumentById, docid],
    queryFn: () => getDocumentById(toastActions, docid),
    enabled: Boolean((docid || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateDocument(
  isUpdating: boolean = false,
  docid: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateDocumentFormValues) =>
      createDocument(toastActions, body, isUpdating, docid),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getDocumentById],
        [queryKeys.filterDocumentSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/kyc/document/');
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
