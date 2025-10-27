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
  GetAllEducationResponse,
  IEducation,
  IEducationByCode,
  SearchEducationResponse
} from '@/api/ResponseTypes/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { CreateEducationFormValues } from '@/schemas/schema-values/setup';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createEducation(
  toastActions: IToastActions,
  body: CreateEducationFormValues,
  isUpdating: boolean,
  educationCode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Education/${
      isUpdating
        ? `UpdateEducation?EducationCode=${educationCode}`
        : 'CreateEducation'
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

export async function filterEducationSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/education?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchEducationResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          educationCode: params?.educationCode,
          educationname: params?.educationname
        },
        headers: {
          'Tenant-ID': getStoredUser()?.companyCode || '',
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

async function getEducationByCode(
  toastActions: IToastActions,
  educationCode: string | null
): Promise<GetAllEducationResponse> {
  let result: GetAllEducationResponse = {
    responseCode: '',
    responseDescription: '',
    education: {} as IEducationByCode
  };

  try {
    const urlEndpoint = `/Configuration/Education/GetEducation?EducationCode=${educationCode}`;

    const { data }: AxiosResponse<GetAllEducationResponse> =
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

async function getAllEducation(
  toastActions: IToastActions
): Promise<GetAllEducationResponse> {
  let result: GetAllEducationResponse = {
    responseCode: '',
    responseDescription: '',
    education: [] as IEducation[]
  };

  try {
    const urlEndpoint = '/Configuration/Education/GetAllEducation';

    const { data }: AxiosResponse<GetAllEducationResponse> =
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

export function useFilterEducationSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterEducationSearch,
      params?.educationCode || '',
      params?.educationname || '',
      params?.page || 1
    ],
    queryFn: () => filterEducationSearch(toastActions, params),
    enabled: Boolean(
      (params?.status || '').length > 0 ||
        (params?.educationCode || '').length > 0 ||
        (params?.educationname || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
export function useGetEducationByCode(
  educationCode: string | null
): GetAllEducationResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllEducationResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getEducationByCode, educationCode],
    queryFn: () => getEducationByCode(toastActions, educationCode),
    enabled: Boolean((educationCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateEducation(
  isUpdating: boolean = false,
  educationCode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateEducationFormValues) =>
      createEducation(toastActions, body, isUpdating, educationCode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getEducationByCode],
        [queryKeys.filterEducationSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/kyc/education/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
export function useGetAllEducation() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllEducationResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllEducation],
    queryFn: () => getAllEducation(toastActions)
  });

  return { ...data, isError, isLoading };
}
