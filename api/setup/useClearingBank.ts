import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IClearingBank,
  IGetCommercialBank,
  SearchClearingBankResponse,
  UseGetAllClearingBankResponse
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
import { CreateClearingBankFormValues } from '@/schemas/schema-values/setup';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { ISearchParams } from '@/app/api/search/route';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createClearingBank(
  toastActions: IToastActions,
  body: CreateClearingBankFormValues,
  isUpdating: boolean,
  clearingid: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/ClearingBank/${
      isUpdating
        ? `UpdateClearingBank?clearingid=${clearingid}`
        : 'CreateClearingBank'
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

async function getClearingBankCode(
  toastActions: IToastActions,
  clearingid: string | null
): Promise<UseGetAllClearingBankResponse> {
  let result: UseGetAllClearingBankResponse = {
    responseCode: '',
    responseDescription: '',
    clearBanks: {} as IClearingBank
  };

  try {
    const urlEndpoint = `/Configuration/ClearingBank/GetClearingBank?clearingid=${clearingid}`;

    const { data }: AxiosResponse<UseGetAllClearingBankResponse> =
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

async function getAllCommercialBank(
  toastActions: IToastActions
): Promise<UseGetAllClearingBankResponse> {
  let result: UseGetAllClearingBankResponse = {
    responseCode: '',
    responseDescription: '',
    commBanks: [] as IGetCommercialBank[]
  };

  try {
    const urlEndpoint = '/Configuration/CommBank/GetAllCommBank';

    const { data }: AxiosResponse<UseGetAllClearingBankResponse> =
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

export async function filterClearingBankSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/clearingbanks?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchClearingBankResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status,
          bankName: params?.bankName,
          bankCode: params?.bankCode
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

export function useFilterClearingBankSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterClearingBankSearch,
      params?.bankCode || '',
      params?.status || '',
      params?.bankName || '',
      params?.page || 1
    ],
    queryFn: () => filterClearingBankSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.bankCode || '').length > 0 ||
        (params?.bankName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetCommercialBank(): UseGetAllClearingBankResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllClearingBankResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCommercialBank],
    queryFn: () => getAllCommercialBank(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetClearingBankByCode(
  clearingid: string | null
): UseGetAllClearingBankResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllClearingBankResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getClearingBankByCode,
      decryptData(clearingid as string)
    ],
    queryFn: () =>
      getClearingBankCode(toastActions, decryptData(clearingid as string)),
    enabled: Boolean((clearingid || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateClearingBank(
  isUpdating: boolean = false,
  clearingid: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateClearingBankFormValues) =>
      createClearingBank(
        toastActions,
        body,
        isUpdating,
        decryptData(clearingid as string)
      ),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getClearingBankByCode],
        [queryKeys.filterClearingBankSearch]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/operations/clearing-banks/');
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
