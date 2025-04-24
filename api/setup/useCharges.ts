import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  ICharge,
  SearchChargeResponse,
  UseGetAllChargeResponse
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
import { CreateChargeFormValues } from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createCharge(
  toastActions: IToastActions,
  body: CreateChargeFormValues,
  isUpdating: boolean,
  chargecode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/General/Product/${
      isUpdating ? `UpdateCharges/${chargecode}` : 'CreateCharges'
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
export async function filterChargeSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/charges?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchChargeResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        status: params?.status,
        chargeCode: params?.chargeCode,
        chargeDesc: params?.chargeDesc
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

async function getChargeByCode(
  toastActions: IToastActions,
  chargecode: string | null
): Promise<UseGetAllChargeResponse> {
  let result: UseGetAllChargeResponse = {
    responseCode: '',
    responseDescription: '',
    charge: {} as ICharge
  };

  try {
    const urlEndpoint = `/General/Product/GetChargesbyChargeCode?chargecode=${chargecode}`;

    const { data }: AxiosResponse<UseGetAllChargeResponse> =
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
export function useFilterChargeSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterChargeSearch,
      params?.status?.toString() || '',
      params?.chargeCode || '',
      params?.chargeDesc || '',
      params?.page || 1
    ],
    queryFn: () => filterChargeSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.chargeCode || '').length > 0 ||
        (params?.chargeDesc || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetChargeByCode(
  chargecode: string | null
): UseGetAllChargeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllChargeResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getChargeByCode, chargecode],
    queryFn: () => getChargeByCode(toastActions, chargecode),
    enabled: Boolean((chargecode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateCharge(
  isUpdating: boolean = false,
  chargeCode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateChargeFormValues) =>
      createCharge(toastActions, body, isUpdating, chargeCode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getChargeByCode],
        [queryKeys.filterChargeSearch]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/product-gl/charge/');
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
