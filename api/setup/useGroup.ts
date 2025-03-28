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
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  GetAllGroupResponse,
  IGroup,
  SearchGroupsResponse
} from '@/api/ResponseTypes/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { CreateGroupFormValues } from '@/schemas/schema-values/setup';

async function createGroup(
  toastActions: IToastActions,
  body: CreateGroupFormValues,
  isUpdating: boolean,
  groupID: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Group/${
      isUpdating ? `UpdateGroup?GroupID=${groupID}` : 'InsertGroup'
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

export async function filterGroupSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/groups?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchGroupsResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        status: params?.status,
        branchCode: params?.branchCode,
        groupName: params?.groupName,
        groupId: params?.groupId
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

async function getGroupById(
  toastActions: IToastActions,
  groupID: string | null
): Promise<GetAllGroupResponse> {
  let result: GetAllGroupResponse = {
    responseCode: '',
    responseDescription: '',
    group: {} as IGroup
  };

  try {
    const urlEndpoint = `/Configuration/Group/GetGroupById?GroupID=${groupID}`;

    const { data }: AxiosResponse<GetAllGroupResponse> = await axiosInstance({
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

export function useCreateGroup(
  isUpdating: boolean = false,
  groupID: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateGroupFormValues) =>
      createGroup(toastActions, body, isUpdating, groupID),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getGroupByID],
        [queryKeys.filterGroupIdSearch],
        [queryKeys.filterGroupSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/kyc/group/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

export function useFilterGroupSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterGroupSearch,
      params?.groupId?.toString() || '',
      params?.status || '',
      params?.groupName || '',
      params?.page || 1,
      params?.branchCode?.toString() || ''
    ],
    queryFn: () => filterGroupSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.groupId?.toString() || '').length > 0 ||
        (params?.groupName || '').length > 0 ||
        (params?.branchCode?.toString() || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetGroupById(groupID: string | null): GetAllGroupResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllGroupResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGroupByID, groupID],
    queryFn: () => getGroupById(toastActions, groupID),
    enabled: Boolean((groupID || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
