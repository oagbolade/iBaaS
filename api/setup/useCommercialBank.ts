import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  ICommercialBank,
  SearchCommercialBankResponse,
  UseGetAllCommercialBankResponse
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
import { CreateCommercialBankFormValues } from '@/schemas/schema-values/setup';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { ISearchParams } from '@/app/api/search/route';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createCommercialBank(
  toastActions: IToastActions,
  body: CreateCommercialBankFormValues,
  isUpdating: boolean,
  bankCode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/CommBank/${
      isUpdating ? `UpdateCommBank?bankcode=${bankCode}` : 'CreateCommBank'
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

async function getCommercialBankCode(
  toastActions: IToastActions,
  bankcode: string | null
): Promise<UseGetAllCommercialBankResponse> {
  let result: UseGetAllCommercialBankResponse = {
    responseCode: '',
    responseDescription: '',
    commBanks: {} as ICommercialBank
  };

  try {
    const urlEndpoint = `/Configuration/CommBank/GetCommBank?Bankcode=${bankcode}`;

    const { data }: AxiosResponse<UseGetAllCommercialBankResponse> =
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

export async function filterCommercialBankSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/commercialbanks?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchCommercialBankResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status,
          bankName: params?.bankName,
          bankCode: params?.bankCode,
          bankshortname: params?.bankshortname
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

export function useFilterCommercialBankSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterCommercialBankSearch,
      params?.bankCode || '',
      params?.status || '',
      params?.bankName || '',
      params?.page || 1
    ],
    queryFn: () => filterCommercialBankSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.bankCode || '').length > 0 ||
        (params?.bankName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetCommercialBankByCode(
  bankCode: string | null
): UseGetAllCommercialBankResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllCommercialBankResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getCommercialBankByCode,
      decryptData(bankCode as string)
    ],
    queryFn: () =>
      getCommercialBankCode(toastActions, decryptData(bankCode as string)),
    enabled: Boolean((bankCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateCommercialBank(
  isUpdating: boolean = false,
  glClassCode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateCommercialBankFormValues) =>
      createCommercialBank(
        toastActions,
        body,
        isUpdating,
        decryptData(glClassCode as string)
      ),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getCommercialBankByCode],
        [queryKeys.filterCommercialBankSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/operations/commercial_bank/');
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
