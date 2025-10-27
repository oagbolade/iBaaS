import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IBranch,
  ISetupBranch,
  SearchBranchResponse,
  UseGetSetUpBranchResponse
} from '../ResponseTypes/setup';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import {
  BranchSearchParams,
  CreateBranchFormValues
} from '@/schemas/schema-values/setup';
import { toast } from '@/utils/toast';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function getBranches(
  toastActions: IToastActions
): Promise<UseGetSetUpBranchResponse> {
  let result: UseGetSetUpBranchResponse = {
    responseCode: '',
    responseDescription: '',
    branches: {} as ISetupBranch
  };

  try {
    const urlEndpoint = '/Configuration/Branch/GetAllBranches';

    const { data }: AxiosResponse<UseGetSetUpBranchResponse> =
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

export async function filterBranchSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/branches?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchBranchResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        branchName: params?.branchName,
        branchCode: params?.branchCode,
        status: params?.status
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
export function useFilterBranchSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterBranchSearch,
      params?.page || 1,
      params?.branchCode,
      params?.branchName,
      params?.status
    ],
    queryFn: () => filterBranchSearch(toastActions, params),
    enabled: Boolean(
      (params?.branchCode || '').length > 0 ||
        (params?.status?.toString() || '').length > 0 ||
        (params?.branchName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetBranches(): UseGetSetUpBranchResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetSetUpBranchResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getBranches],
    queryFn: () => getBranches(toastActions)
  });

  return { ...data, isError, isLoading };
}

async function CreateBranch(
  toastActions: IToastActions,
  body: CreateBranchFormValues,
  isUpdating: boolean,
  code: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Branch/${isUpdating ? `UpdateBranch?code=${decryptData(code as string)}` : 'CreateBranch'}`;
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

export function useCreateBranch(
  isUpdating: boolean = false,
  code: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateBranchFormValues) =>
      CreateBranch(toastActions, body, isUpdating, decryptData(code as string)),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.filterBranchSearch],
        [queryKeys.getBranchByCode]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/company/branch/');
    }
  });

  return { mutate, isPending, isError, error };
}

async function getBranch(
  toastActions: IToastActions,
  branchName: string | null
): Promise<UseGetSetUpBranchResponse> {
  if (!branchName) {
    return {};
  }

  let result: UseGetSetUpBranchResponse = {
    responseCode: '',
    responseDescription: '',
    branch: [] as IBranch[]
  };

  try {
    const urlEndpoint = `/Configuration/Branch/GetBranchByName?name=${branchName}`;

    const { data }: AxiosResponse<UseGetSetUpBranchResponse> =
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

async function getAllBranch(
  toastActions: IToastActions
): Promise<UseGetSetUpBranchResponse> {
  let result: UseGetSetUpBranchResponse = {
    responseCode: '',
    responseDescription: '',
    branches: [] as IBranch[]
  };

  try {
    const urlEndpoint = '/Configuration/Branch/GetAllBranches';

    const { data }: AxiosResponse<UseGetSetUpBranchResponse> =
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
async function getBranchByCode(
  toastActions: IToastActions,
  code: string | null
): Promise<UseGetSetUpBranchResponse> {
  let result: UseGetSetUpBranchResponse = {
    responseCode: '',
    responseDescription: '',
    branch: {} as IBranch
  };

  try {
    const urlEndpoint = `/Configuration/Branch/GetBranch?code=${decryptData(code as string)}`;

    const { data }: AxiosResponse<UseGetSetUpBranchResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}
export function useGetAllBranch(): UseGetSetUpBranchResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetSetUpBranchResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllBranch],
    queryFn: () => getAllBranch(toastActions)
  });

  return { ...data, isError, isLoading };
}
export function useGetBranchByCode(
  code: string | null
): UseGetSetUpBranchResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseGetSetUpBranchResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getBranchByCode, decryptData(code as string)],
    queryFn: () => getBranchByCode(toastActions, decryptData(code as string))
  });

  return { ...data, isError, isLoading };
}

export function useGetBranch(
  branchName: string | null
): UseGetSetUpBranchResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetSetUpBranchResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getBranchByCode, branchName],
    queryFn: () => getBranch(toastActions, branchName)
  });

  return { ...data, isError, isLoading };
}
