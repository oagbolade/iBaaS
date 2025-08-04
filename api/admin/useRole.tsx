import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { sanitize } from 'dompurify';
import {
  IPriviledgeList,
  SearchResultsGenericResponse
} from '../ResponseTypes/general';
import {
  CreateRoleResponse,
  GetAllAssignedAuthPriviledgeResponse,
  GetAllAssignedDataCaptureResponse,
  GetAllRolesResponse,
  IRoles,
  SearchRoleResponse
} from '@/api/ResponseTypes/admin';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { CreateRoleFormValues } from '@/schemas/schema-values/admin';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { ISearchParams } from '@/app/api/search/route';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { toast } from '@/utils/toast';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

/**
 * Searches for users by role and returns the search results.
 *
 * @param {IToastActions} toastActions - actions for displaying toast messages
 * @param {ISearchParams | null} params - search parameters (role ID, user ID, full name, email, phone number, and page number)
 * @return {Promise<any>} search results
 */
export async function filterUserByRoleSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/admin/search/userbyrole?size=10&page=${sanitize(String(params?.page ?? 1))}`;

    const { data }: AxiosResponse<SearchRoleResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        roleId: params?.roleID,
        userId: params?.userID,
        fullName: params?.fullName,
        email: params?.email,
        phoneNo: params?.phoneNo
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

export async function filterRoleSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/admin/search/role?size=10&page=${sanitize(String(params?.page ?? 1))}`;

    const { data }: AxiosResponse<SearchRoleResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        roleName: params?.roleName
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

async function deleteRole(
  toastActions: IToastActions,
  roleid: string
): Promise<APIResponse> {
  let result: APIResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = `/Admin/Product/DeleteRoleByRoleid?roleid=${sanitize(roleid ?? '')}`;

    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'DELETE',
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

//  query function for useQuery
async function getRoles(
  toastActions: IToastActions
): Promise<GetAllRolesResponse> {
  let result: GetAllRolesResponse = {
    responseCode: '',
    responseDescription: '',
    roles: []
  };

  try {
    const urlEndpoint = '/Admin/Product/GetAllRole';

    const { data }: AxiosResponse<GetAllRolesResponse> = await axiosInstance({
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

export function useGetRoles(): GetAllRolesResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllRolesResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.role],
    queryFn: () => getRoles(toastActions)
  });

  return { ...data, isError, isLoading };
}

async function getRoleByID(
  toastActions: IToastActions,
  roleid: string | null
): Promise<GetAllRolesResponse> {
  let result: GetAllRolesResponse = {
    responseCode: '',
    responseDescription: '',
    role: {} as IRoles
  };

  try {
    const urlEndpoint = `/Admin/Product/GetRoleByRoleid?roleid=${sanitize(roleid ?? '')}`;

    const { data }: AxiosResponse<GetAllRolesResponse> = await axiosInstance({
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

async function getAssignedDataCaptureByRoleID(
  toastActions: IToastActions,
  roleid: string | null
): Promise<GetAllAssignedDataCaptureResponse> {
  let result: GetAllAssignedDataCaptureResponse = {
    responseCode: '',
    responseDescription: '',
    dataCapture: {} as IPriviledgeList[]
  };

  try {
    const urlEndpoint = `/General/Product/GetAssignedDataCaptureByRole?roleid=${sanitize(roleid ?? '')}`;

    const { data }: AxiosResponse<GetAllRolesResponse> = await axiosInstance({
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

async function getAssignedAuthPriviledgesByRoleID(
  toastActions: IToastActions,
  roleid: string | null
): Promise<GetAllAssignedAuthPriviledgeResponse> {
  let result: GetAllAssignedAuthPriviledgeResponse = {
    responseCode: '',
    responseDescription: '',
    authPriv: {} as IPriviledgeList[]
  };

  try {
    const urlEndpoint = `/General/Product/GetAssignedAuthPriv?roleid=${sanitize(roleid ?? '')}`;

    const { data }: AxiosResponse<GetAllRolesResponse> = await axiosInstance({
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

export function useGetRoleByID(
  roleid: string | null = null
): GetAllRolesResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllRolesResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getRoleByID, decryptData(roleid as string)],
    queryFn: () => getRoleByID(toastActions, decryptData(roleid as string)),
    enabled: Boolean((roleid || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetAssignedDataCaptureByRoleID(
  roleid: string | null = null
): GetAllAssignedDataCaptureResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllAssignedDataCaptureResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getAssignedDataCaptureByRoleID,
      decryptData(roleid as string)
    ],
    queryFn: () =>
      getAssignedDataCaptureByRoleID(
        toastActions,
        decryptData(roleid as string)
      ),
    enabled: Boolean((roleid || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetAssignedAuthPriviledgesByRoleID(
  roleid: string | null = null
): GetAllAssignedAuthPriviledgeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllAssignedAuthPriviledgeResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getAssignedAuthPriviledgesByRoleID,
      decryptData(roleid as string)
    ],
    queryFn: () =>
      getAssignedAuthPriviledgesByRoleID(
        toastActions,
        decryptData(roleid as string)
      ),
    enabled: Boolean((roleid || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

// for when we need functions for useMutation
async function createRole(
  toastActions: IToastActions,
  body: CreateRoleFormValues,
  isUpdating: boolean,
  roleid: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Admin/Product/${
      isUpdating
        ? `UpdateRoles?role_id=${sanitize(roleid ?? '')}`
        : 'CreateRoles'
    }`;
    const { data }: AxiosResponse<CreateRoleResponse> = await axiosInstance({
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
    if (!SUCCESS_CODES.includes(data.responseCode)) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

export function useDeleteRole(): APIResponse {
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (roleid: string) => deleteRole(toastActions, roleid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.filterRoleSearch] });
    }
  });
  return { mutate, isPending, isError, error };
}

export function useCreateRole(
  isUpdating: boolean,
  roleid: string | null = null
) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateRoleFormValues) =>
      createRole(toastActions, body, isUpdating, decryptData(roleid as string)),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getRoleByID],
        [queryKeys.filterRoleSearch],
        [queryKeys.getAssignedDataCaptureByRoleID],
        [queryKeys.getAssignedAuthPriviledgesByRoleID]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/admin/roles/');
    }
  });

  return { mutate, isPending, isError, error };
}

export function useFilterRoleSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterRoleSearch,
      params?.roleName || '',
    ],
    queryFn: () => filterRoleSearch(toastActions, params),
    enabled: Boolean((params?.roleName?.toString() || '').length > 0 || params?.page)
  });

  return { ...data, isError, isLoading };
}

export function useFilterUserByRoleSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterUserByRoleSearch,
      params?.userID || '',
      params?.fullName || '',
      params?.page || 1
    ],
    queryFn: () => filterUserByRoleSearch(toastActions, params),
    enabled: Boolean(
      (params?.userID || '').length > 0 || (params?.fullName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
