import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import {
  SearchPostingLimitResponse,
  UseGetAllPostingLimit,
  UseGetPostingLimitByBranchCodeAndRoleid
} from '@/api/ResponseTypes/admin';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { CreatePostingLimitFormValues } from '@/schemas/schema-values/admin';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { ISearchParams } from '@/app/api/search/route';
import { toast } from '@/utils/toast';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

export async function filterPostingLimitSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/admin/search/postinglimit?page=${params?.page}&size=10`;

    const { data }: AxiosResponse<SearchPostingLimitResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          branchCode: params?.branchID,
          branchCredit: params?.branchCredit,
          branchDebit: params?.branchDebit
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

    if (environment === 'development') {
      toast(message, title, severity, toastActions);
    }

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

async function getPostingLimit(
  toastActions: IToastActions
): Promise<UseGetAllPostingLimit> {
  let result: UseGetAllPostingLimit = {
    responseCode: '',
    responseDescription: '',
    limit: []
  };

  try {
    const urlEndpoint = '/Admin/PostingLimit/GetAllPostingLimit';

    const { data }: AxiosResponse<UseGetAllPostingLimit> = await axiosInstance({
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

async function getPostingLimitByBranchCodeAndRoleid(
  toastActions: IToastActions,
  roleid: string | null,
  branchCode: string | null
): Promise<UseGetPostingLimitByBranchCodeAndRoleid> {
  let result: UseGetPostingLimitByBranchCodeAndRoleid = {
    responseCode: '',
    responseDescription: '',
    limit: []
  };

  try {
    const urlEndpoint = `/Admin/PostingLimit/GetPostingLimit?roleId=${roleid}&branchCode=${branchCode}`;

    const { data }: AxiosResponse<UseGetPostingLimitByBranchCodeAndRoleid> =
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

export function useGetPostingLimitByBranchCode(
  roleid: string | null,
  branchCode: string | null
): UseGetPostingLimitByBranchCodeAndRoleid {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetPostingLimitByBranchCodeAndRoleid;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getPostingLimitByBranchCodeAndRoleid,
      roleid,
      branchCode
    ],
    queryFn: () =>
      getPostingLimitByBranchCodeAndRoleid(
        toastActions,
        decryptData(roleid as string),
        decryptData(branchCode as string)
      ),
    enabled: Boolean((roleid || '').length > 0 || (branchCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export async function searchPostingLimit(
  toastActions: IToastActions,
  params: ISearchParams
): Promise<UseGetAllPostingLimit> {
  let result: UseGetAllPostingLimit = {
    responseCode: '',
    responseDescription: '',
    limits: []
  };

  try {
    const urlEndpoint = `http://localhost:3000${process.env.DOMAIN}/api/search?search=${params.search}&action=posting-limit`;

    const { data }: AxiosResponse<UseGetAllPostingLimit> = await axiosInstance({
      url: urlEndpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
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

export function useGetPostingLimit(): UseGetAllPostingLimit {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllPostingLimit;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.postingLimit],
    queryFn: () => getPostingLimit(toastActions)
  });

  return { ...data, isError, isLoading };
}

async function CreatePostingLimit(
  toastActions: IToastActions,
  body: CreatePostingLimitFormValues,
  isUpdating: boolean
): Promise<void> {
  try {
    const urlEndpoint = `/Admin/${
      isUpdating
        ? `PostingLimit/UpdatePostingLimit?roleId=${body.roleId}&branchCode=${body.branchCode}`
        : 'Posting/CreatePostingLimit'
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
    if (!SUCCESS_CODES.includes(data.responseCode || '')) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

export function useCreatePostingLimit(isUpdating: boolean = false) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreatePostingLimitFormValues) =>
      CreatePostingLimit(toastActions, body, isUpdating),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.filterPostingLimitSearch]
      });
      handleRedirect(router, '/admin/posting-limit');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

export function useFilterPostingLimitSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterPostingLimitSearch,
      params?.branchID || '',
      params?.branchCredit || '',
      params?.branchDebit || '',
      params?.page || 1
    ],
    queryFn: () => filterPostingLimitSearch(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.branchCredit || '').length > 0 ||
        (params?.branchDebit || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
