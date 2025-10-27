import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import { GenericResponse } from '../ResponseTypes/customer-service';
import {
  CreateAccountOfficerResponse,
  IAccountOfficers,
  IAccounts,
  SearchAccountOfficersResponse,
  TransferAccountOfficerFormValues,
  UseGetAccountOfficersResponse,
  UseGetCustomerAccountsByOfficerCodeResponse
} from '@/api/ResponseTypes/admin';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { CreateAccountOfficerFormValues } from '@/schemas/schema-values/admin';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { toast } from '@/utils/toast';
import { decryptData } from '@/utils/decryptData';
import { handleRedirect } from '@/utils';

export async function filterAccountOfficerSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/admin/search/accountofficers?page=${params?.page}&size=10`;

    const { data }: AxiosResponse<SearchAccountOfficersResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          branchCode: params?.branchID,
          status: params?.status,
          officerName: params?.fullName,
          email: params?.email,
          phoneNo: params?.phoneNo
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

async function deleteAccountOfficer(
  toastActions: IToastActions,
  officercode: string
): Promise<APIResponse> {
  let result: APIResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = `/Admin/Officer/DeleteOfficer?officercode=${officercode}`;

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

async function getAccountOfficerByCode(
  toastActions: IToastActions,
  officercode: string | null
): Promise<UseGetAccountOfficersResponse> {
  if (!officercode) {
    return {};
  }

  let result: UseGetAccountOfficersResponse = {
    responseCode: '',
    responseDescription: '',
    officers: [] as IAccountOfficers[]
  };

  try {
    const urlEndpoint = `/Admin/Officer/GetOfficerByOfficerCode?officercode=${officercode}`;

    const { data }: AxiosResponse<UseGetAccountOfficersResponse> =
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

async function getCustomerAccountsByOfficerCode(
  toastActions: IToastActions,
  officercode: string | null
): Promise<UseGetCustomerAccountsByOfficerCodeResponse> {
  let result: UseGetCustomerAccountsByOfficerCodeResponse = {
    responseCode: '',
    responseDescription: '',
    accounts: [] as IAccounts[]
  };

  try {
    const urlEndpoint = `/Admin/GetAccountsByOfficer?officerCode=${officercode}`;

    const { data }: AxiosResponse<UseGetCustomerAccountsByOfficerCodeResponse> =
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

async function getAccountOfficers(
  toastActions: IToastActions
): Promise<UseGetAccountOfficersResponse> {
  let result: UseGetAccountOfficersResponse = {
    responseCode: '',
    responseDescription: '',
    officers: [] as IAccountOfficers[],
    officer: [] as IAccountOfficers[]
  };

  try {
    const urlEndpoint = '/Admin/Officer/GetAllAccountOfficer';

    const { data }: AxiosResponse<UseGetAccountOfficersResponse> =
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

export function useGetAccountOfficers(): UseGetAccountOfficersResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAccountOfficersResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.accountOfficer],
    queryFn: () => getAccountOfficers(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetAccountOfficerByCode(
  officercode: string | null
): UseGetAccountOfficersResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAccountOfficersResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getAccountOfficerByCode,
      decryptData(officercode as string)
    ],
    queryFn: () =>
      getAccountOfficerByCode(toastActions, decryptData(officercode as string)),
    enabled: Boolean((officercode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetCustomerAccountsByOfficerCode(
  officercode: string | null
): UseGetCustomerAccountsByOfficerCodeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseGetCustomerAccountsByOfficerCodeResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getCustomerAccountsByOfficerCode,
      decryptData(officercode as string)
    ],
    queryFn: () =>
      getCustomerAccountsByOfficerCode(
        toastActions,
        decryptData(officercode as string)
      ),
    enabled: Boolean((officercode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useDeleteAccountOfficer(): APIResponse {
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (officercode: string) =>
      deleteAccountOfficer(toastActions, officercode),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.filterAccountOfficerSearch]
      });
    }
  });
  return { mutate, isPending, isError, error };
}

async function transferAccountOfficer(
  toastActions: IToastActions,
  body: TransferAccountOfficerFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/CustomerServices/TransferOfficer';
    const { data }: AxiosResponse<GenericResponse> = await axiosInstance({
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
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
}

async function createAccountOfficer(
  toastActions: IToastActions,
  body: CreateAccountOfficerFormValues,
  isUpdating: boolean,
  officercode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Admin/Officer/${
      isUpdating ? `UpdateOfficer?officercode=${officercode}` : 'CreateOfficer'
    }`;
    const { data }: AxiosResponse<CreateAccountOfficerResponse> =
      await axiosInstance({
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

export function useCreateAccountOfficer(
  isUpdating: boolean = false,
  officercode: string | null = null
) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateAccountOfficerFormValues) =>
      createAccountOfficer(
        toastActions,
        body,
        isUpdating,
        decryptData(officercode as string)
      ),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.accountOfficer],
        [queryKeys.filterAccountOfficerSearch],
        [queryKeys.getAccountOfficerByCode]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/admin/account-officers');
    }
  });

  return { mutate, isPending, isError, error };
}

export function useTransferAccountOfficer() {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: TransferAccountOfficerFormValues) =>
      transferAccountOfficer(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.accountOfficer],
        [queryKeys.filterAccountOfficerSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/customer-service/officer-transfer');
    }
  });

  return { mutate, isPending, isError, error };
}

export function useFilterAccountOfficerSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterAccountOfficerSearch,
      params?.branchID || '',
      params?.status || '',
      params?.fullName || '',
      params?.page || 1
    ],
    queryFn: () => filterAccountOfficerSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.fullName || '').length > 0 ||
        (params?.branchID || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
