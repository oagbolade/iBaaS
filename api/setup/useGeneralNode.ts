import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IGLNode,
  IGLTypeClass,
  SearchGLNodeResponse,
  UseGetAllGLNodeResponse
} from '../ResponseTypes/setup';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  CreateGlNodeFormValues,
  NodeSearchParams
} from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createGLNode(
  toastActions: IToastActions,
  body: CreateGlNodeFormValues,
  isUpdating: boolean,
  glNodeCode: string | null,
  prodCode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/GLNode/${
      isUpdating
        ? `UpdateNode?GLNodeCode=${decryptData(glNodeCode as string)}&ProdCode=${decryptData(prodCode as string)}`
        : `CreateGLNode?gltypeCode=${body.gL_NodeCodes}`
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

async function getGlNodeById(
  toastActions: IToastActions,
  glNodeCode: string | null
): Promise<UseGetAllGLNodeResponse> {
  let result: UseGetAllGLNodeResponse = {
    responseCode: '',
    responseDescription: '',
    node: {} as IGLNode
  };

  try {
    const urlEndpoint = `/Configuration/GLNode/GetNode?GLNodeCode=${decryptData(glNodeCode as string)}`;

    const { data }: AxiosResponse<UseGetAllGLNodeResponse> =
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

export async function filterGlNodeSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/glNode?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchGLNodeResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        gl_NodeCode: params?.gl_NodeCode,
        gl_NodeName: params?.gl_NodeName,
        status: params?.status
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
async function getGlType(
  toastActions: IToastActions
): Promise<UseGetAllGLNodeResponse> {
  let result: UseGetAllGLNodeResponse = {
    responseCode: '',
    responseDescription: '',
    glClasses: [] as IGLTypeClass[]
  };
  try {
    const urlEndpoint = '/Configuration/GLCLass/GetAllGLClasses';

    const { data }: AxiosResponse<UseGetAllGLNodeResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });
    const { message, title, severity } = globalErrorHandler(data);

    if (environment === 'development') {
      toast(message, title, severity, toastActions);
    }

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useFilterGLNodeSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterGlNodeSearch,
      params?.gl_NodeCode || '',
      params?.status || '',
      params?.gl_NodeName || '',
      params?.page || 1
    ],
    queryFn: () => filterGlNodeSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.gl_NodeCode || '').length > 0 ||
        (params?.gl_NodeName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetGLType(): UseGetAllGLNodeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllGLNodeResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGlType],
    queryFn: () => getGlType(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetGlNodeById(
  glNodeCode: string | null
): UseGetAllGLNodeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllGLNodeResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGlNodeById, glNodeCode],
    queryFn: () => getGlNodeById(toastActions, glNodeCode),
    enabled: Boolean((glNodeCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateGlNode(
  isUpdating: boolean = false,
  glNodeCode: string | null = null,
  prodCode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateGlNodeFormValues) =>
      createGLNode(toastActions, body, isUpdating, glNodeCode, prodCode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getGlNodeById],
        [queryKeys.filterGlNodeSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/product-gl/product-class/');
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
