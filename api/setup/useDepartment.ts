import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IDepartment,
  SearchDepartmentResponse,
  UseGetAllDepartmentResponse
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
import { CreateDepartmentFormValues } from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';

async function createDepartment(
  toastActions: IToastActions,
  body: CreateDepartmentFormValues,
  isUpdating: boolean,
  deptid: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Department/${
      isUpdating ? `UpdateDepartment?deptid=${deptid}` : 'CreateDepartment'
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

async function getDepartmentById(
  toastActions: IToastActions,
  deptid: string | null
): Promise<UseGetAllDepartmentResponse> {
  let result: UseGetAllDepartmentResponse = {
    responseCode: '',
    responseDescription: '',
    department: {} as IDepartment
  };

  try {
    const urlEndpoint = `/Configuration/Department/GetDepartment?deptid=${deptid}`;

    const { data }: AxiosResponse<UseGetAllDepartmentResponse> =
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

export function useGetDepartmentById(
  deptid: string | null
): UseGetAllDepartmentResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllDepartmentResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getDepartmentById, deptid],
    queryFn: () => getDepartmentById(toastActions, deptid),
    enabled: Boolean((deptid || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export async function filterDepartmantSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/department?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchDepartmentResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status,
          departmentName: params?.departmentName
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

export function useFilterDepartmentSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterDepartmantSearch,
      params?.status || '',
      params?.departmentName || '',
      params?.page || 1
    ],
    queryFn: () => filterDepartmantSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.departmentName || '').length > 0 ||
        (params?.page || 0) > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useCreateDepartment(
  isUpdating: boolean = false,
  deptid: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateDepartmentFormValues) =>
      createDepartment(toastActions, body, isUpdating, deptid),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getDepartmentById],
        [queryKeys.filterDepartmantSearch],
        [queryKeys.fetchRejectedRequest]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/company/department/');
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
