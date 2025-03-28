import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import {
  SearchUserResponse,
  UseGetAllUsersResponse,
  UseGetSupervisorByIdResponse
} from '@/api/ResponseTypes/admin';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import {
  ChangePasswordFormValues,
  CreateUserFormValues,
  ResetUserFormValues
} from '@/schemas/schema-values/admin';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { ISearchParams } from '@/app/api/search/route';
import { ValidatePasswordRequest } from '@/api/RequestTypes/admin';
import { toast } from '@/utils/toast';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

export async function filterUserSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/admin/search/user?&page=${params?.page}&size=10`;

    const { data }: AxiosResponse<SearchUserResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        branchCode: params?.branchID,
        status: params?.status,
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

export async function deleteUser(
  toastActions: IToastActions,
  userid: string
): Promise<APIResponse> {
  let result: APIResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = `/Admin/UserProfile/DeleteUser?userid=${userid}`;

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

async function validatePassword(
  toastActions: IToastActions,
  body: ValidatePasswordRequest
): Promise<APIResponse> {
  let result: APIResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = `/Login/ValidateOldPwrd?userid=${body.userid}&oldpassword=${body.oldpassword}&tenantid=${body.tenantid}`;

    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

async function resetUser(
  toastActions: IToastActions,
  body: ResetUserFormValues | ChangePasswordFormValues
): Promise<APIResponse> {
  let result: APIResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = '/Admin/ResetUser';

    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { ...body },
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

async function changePassword(
  toastActions: IToastActions,
  body: ChangePasswordFormValues
): Promise<APIResponse> {
  let result: APIResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = '/Login/ChangePassword';

    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { ...body },
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

async function lockOrUnlockUser(
  toastActions: IToastActions,
  userid: string,
  lockStatus: number
): Promise<APIResponse> {
  let result: APIResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = `/Admin/Product/Lock-Unlock-User?lockStatus=${lockStatus}&userid=${userid}`;

    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
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
async function getUsers(
  toastActions: IToastActions
): Promise<UseGetAllUsersResponse> {
  let result: UseGetAllUsersResponse = {
    responseCode: '',
    responseDescription: '',
    users: []
  };

  try {
    const urlEndpoint = '/Admin/Product/GetAllUsers';

    const { data }: AxiosResponse<UseGetAllUsersResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      }
    );

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useGetAllUsers(): UseGetAllUsersResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllUsersResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: () => getUsers(toastActions)
  });

  return { ...data, isError, isLoading };
}

async function createUser(
  toastActions: IToastActions,
  body: CreateUserFormValues,
  isUpdating: boolean
): Promise<void> {
  try {
    const urlEndpoint = `/Admin/Product/${
      isUpdating ? 'UpdateUsers' : 'CreateUsers'
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

export async function searchUsers(
  toastActions: IToastActions,
  params: ISearchParams
): Promise<UseGetAllUsersResponse> {
  let result: UseGetAllUsersResponse = {
    responseCode: '',
    responseDescription: '',
    userDetails: []
  };

  try {
    const urlEndpoint = `http://localhost:3000${process.env.DOMAIN}/api/search?branchID=${params.branchID}&status=${params.status}&search=${params.search}&action=users`;

    const { data }: AxiosResponse<UseGetAllUsersResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

async function getUserByID(
  toastActions: IToastActions,
  userid: string | null
): Promise<UseGetAllUsersResponse> {
  if (userid === null) {
    return {};
  }

  let result: UseGetAllUsersResponse = {
    responseCode: '',
    responseDescription: '',
    userDetails: []
  };

  try {
    const urlEndpoint = `/Admin/Product/GetUserbyId?userid=${userid}`;

    const { data }: AxiosResponse<UseGetAllUsersResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      }
    );

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export async function getSupervisorByID(
  toastActions: IToastActions,
  branchcode: string | null,
  deptcode: string | null
): Promise<UseGetSupervisorByIdResponse> {
  if (deptcode === null || branchcode === null) {
    return {};
  }

  let result: UseGetSupervisorByIdResponse = {
    responseCode: '',
    responseDescription: '',
    supervisors: []
  };

  try {
    const urlEndpoint = `/Admin/GetSupervisorsById?branchcode=${branchcode}&deptcode=${deptcode}`;

    const { data }: AxiosResponse<UseGetSupervisorByIdResponse> =
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

export function useDeleteUser(): APIResponse {
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (userid: string) => deleteUser(toastActions, userid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.filterUserSearch] });
    }
  });
  return { mutate, isPending, isError, error };
}

export function useChangePassword(): APIResponse {
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: ChangePasswordFormValues) =>
      resetUser(toastActions, body), // ChangePassword for other users uses resetuser endpoint
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.filterUserSearch] });
      handleRedirect(router, '/admin/users');
    }
  });
  return { mutate, isPending, isError, error };
}

export function useResetUser(): APIResponse {
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: ResetUserFormValues) => resetUser(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.filterUserSearch] });
      handleRedirect(router, '/admin/users');
    }
  });
  return { mutate, isPending, isError, error };
}

export function useLockOrUnlockUser(
  userid: string,
  lockStatus: number
): APIResponse {
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => lockOrUnlockUser(toastActions, userid, lockStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.filterUserSearch] });
    }
  });
  return { mutate, isPending, isError, error };
}

export function useValidatePassword(): APIResponse {
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: ValidatePasswordRequest) =>
      validatePassword(toastActions, body)
  });
  return { mutate, isPending, isError, error };
}

export function useGetUserByID(
  userid: string | null = null
): UseGetAllUsersResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllUsersResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getUserByID, decryptData(userid as string)],
    queryFn: () => getUserByID(toastActions, decryptData(userid as string)),
    enabled: Boolean((userid || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateUser(isUpdating: boolean = false) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateUserFormValues) =>
      createUser(toastActions, body, isUpdating),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getUserByID],
        [queryKeys.filterUserSearch]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/admin/users');
    }
  });

  return { mutate, isPending, isError, error };
}

export function useFilterUserSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterUserSearch,
      params?.branchID || '',
      params?.status || '',
      params?.fullName || '',
      params?.page || 1
    ],
    queryFn: () => filterUserSearch(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.status || '').length > 0 ||
        (params?.fullName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
