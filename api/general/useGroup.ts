import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  GetGroupByIdResponse,
  GetGroupMembersbyGroupIdResponse,
  IGroup,
  IGroupMembers,
  SearchGroupResponse,
  SearchResultsGenericResponse
} from '../ResponseTypes/general';
import { RemoveGroupMembersRequest } from '../RequestTypes/CommonTypes';
import {
  GenericResponse,
  GetAllGroupsResponse
} from '@/api/ResponseTypes/customer-service';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { decryptData } from '@/utils/decryptData';

// TODO: remove hardcoded branches once we have more branch options in the DB change to ${params.branchID}
export async function filterGroupSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/customer-service/search/groups?page=${params?.page}&size=10`;

    const { data }: AxiosResponse<SearchGroupResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        branchCode: params?.branchID,
        groupName: params?.groupName
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

export async function getGroupById(
  toastActions: IToastActions,
  groupID: string
): Promise<GetGroupByIdResponse> {
  let result: GetGroupByIdResponse = {
    responseCode: '',
    responseDescription: '',
    group: {} as IGroup
  };

  try {
    const urlEndpoint = `/Configuration/Group/GetGroupById?GroupID=${groupID}`;

    const { data }: AxiosResponse<GetGroupByIdResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
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

export async function getGroupMembersbyGroupId(
  toastActions: IToastActions,
  groupID: string
): Promise<GetGroupMembersbyGroupIdResponse> {
  let result: GetGroupMembersbyGroupIdResponse = {
    responseCode: '',
    responseDescription: '',
    groupInfo: [] as IGroupMembers[]
  };

  try {
    const urlEndpoint = `/CustomerServices/FetchGroupMembers?GroupID=${groupID}`;

    const { data }: AxiosResponse<GetGroupMembersbyGroupIdResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
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

async function removeGroupMembers(
  toastActions: IToastActions,
  body: RemoveGroupMembersRequest
): Promise<void> {
  try {
    const urlEndpoint = '/CustomerServices/RemoveGroupMembers';
    const { data }: AxiosResponse<GenericResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'PUT',
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

async function getAllGroups(
  toastActions: IToastActions
): Promise<GetAllGroupsResponse> {
  let result: GetAllGroupsResponse = {
    responseCode: '',
    responseDescription: '',
    groups: []
  };

  try {
    const urlEndpoint = '/General/Group/GetAllGroup';

    const { data }: AxiosResponse<GetAllGroupsResponse> = await axiosInstance({
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

export function useGetAllGroups() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllGroupsResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllGroups],
    queryFn: () => getAllGroups(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetGroupById(groupID: string) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetGroupByIdResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGroupById, decryptData(groupID)],
    queryFn: () => getGroupById(toastActions, decryptData(groupID) as string),
    enabled: Boolean(groupID.length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetGroupMembersbyGroupId(groupID: string) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetGroupMembersbyGroupIdResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGroupMembersbyGroupId, decryptData(groupID)],
    queryFn: () =>
      getGroupMembersbyGroupId(toastActions, decryptData(groupID) as string),
    enabled: Boolean(groupID.length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useRemoveGroupMembers() {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: RemoveGroupMembersRequest) =>
      removeGroupMembers(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getGroupMembersbyGroupId]
      });
    }
  });

  return { mutate, isPending, isError, error };
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
      params?.branchID || '',
      params?.groupName || '',
      params?.page || 1
    ],
    queryFn: () => filterGroupSearch(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.groupName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
