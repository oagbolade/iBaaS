import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IGLClass,
  SearchGLClassResponse,
  UseGetAllGLClassResponse,
  UseGetAllGLNodeResponse
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
import { CreateGlClassFormValues } from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';

async function createGLClass(
  toastActions: IToastActions,
  body: CreateGlClassFormValues,
  isUpdating: boolean,
  glClassCode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/GLCLass/${
      isUpdating ? `UpdateGLClass?GL_ClassCode=${glClassCode}` : 'CreateGLClass'
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

async function getGlClassByCode(
  toastActions: IToastActions,
  glClassCode: string | null
): Promise<UseGetAllGLNodeResponse> {
  let result: UseGetAllGLClassResponse = {
    responseCode: '',
    responseDescription: '',
    gl: {} as IGLClass
  };

  try {
    const urlEndpoint = `/Configuration/GLClass/GetGLClassByClassCode?GL_ClassCode=${glClassCode}`;

    const { data }: AxiosResponse<UseGetAllGLClassResponse> =
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
export async function filterGlClassSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/glclass?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchGLClassResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        gl_ClassCode: params?.gl_ClassCode,
        gl_ClassName: params?.gl_ClassName,
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

export function useFilterGLClassSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterGlClassSearch,
      params?.gl_ClassCode || '',
      params?.status || '',
      params?.gl_ClassName || '',
      params?.page || 1
    ],
    queryFn: () => filterGlClassSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.gl_ClassCode || '').length > 0 ||
        (params?.gl_ClassName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetGlClassByCode(
  glClassCode: string | null
): UseGetAllGLClassResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllGLClassResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGlClassCode, glClassCode],
    queryFn: () => getGlClassByCode(toastActions, glClassCode),
    enabled: Boolean((glClassCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateGlClass(
  isUpdating: boolean = false,
  glClassCode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateGlClassFormValues) =>
      createGLClass(toastActions, body, isUpdating, glClassCode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getGlClassCode],
        [queryKeys.filterGlClassSearch],
        [queryKeys.node]
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
