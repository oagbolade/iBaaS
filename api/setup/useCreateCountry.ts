import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertColor } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  ICountry,
  SearchCountryResponse,
  UseGetAllCountryResponse
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
import {
  CountrySearchParams,
  CreateCountryFormValues
} from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createCountry(
  toastActions: IToastActions,
  body: CreateCountryFormValues,
  isUpdating: boolean,
  countrycode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Country/${
      isUpdating ? `UpdateCountry?countrycode=${countrycode}` : 'CreateCountry'
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
async function getCountryByCode(
  toastActions: IToastActions,
  CountryCode: string | null
): Promise<UseGetAllCountryResponse> {
  let result: UseGetAllCountryResponse = {
    responseCode: '',
    responseDescription: '',
    country: {} as ICountry
  };

  try {
    const urlEndpoint = `/Configuration/Country/GetCountry?CountryCode=${CountryCode}`;

    const { data }: AxiosResponse<UseGetAllCountryResponse> =
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

async function getCountryByName(
  toastActions: IToastActions,
  countryname: string | null
): Promise<UseGetAllCountryResponse> {
  let result: UseGetAllCountryResponse = {
    responseCode: '',
    responseDescription: '',
    countries: [] as ICountry[]
  };

  try {
    const urlEndpoint = `/Configuration/Country/GetCountryByName?countryname=${countryname}`;

    const { data }: AxiosResponse<UseGetAllCountryResponse> =
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

export async function filterCountrySearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/countries?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchCountryResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        countryCode: params?.countryCode,
        countryName: params?.countryName,
        status: params?.status
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

export function useFilterCountrySearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterCountrySearch,
      params?.page || 1,
      params?.countryCode || '',
      params?.status || '',
      params?.countryName || ''
    ],
    queryFn: () => filterCountrySearch(toastActions, params),
    enabled: Boolean(
      (params?.countryCode || '').length > 0 ||
        (params?.status?.toString() || '').length > 0 ||
        (params?.countryName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
export function useGetCountryByCode(
  CountryCode: string | null
): UseGetAllCountryResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllCountryResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCountryByCode, CountryCode],
    queryFn: () => getCountryByCode(toastActions, CountryCode),
    enabled: Boolean((CountryCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetCountryByName(
  countryname: string | null
): UseGetAllCountryResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllCountryResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCountryByName, countryname],
    queryFn: () => getCountryByName(toastActions, countryname),
    enabled: Boolean((countryname || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateCountry(
  isUpdating: boolean = false,
  countrycode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateCountryFormValues) =>
      createCountry(
        toastActions,
        body,
        isUpdating,
        decryptData(countrycode as string)
      ),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getCountryByCode],
        [queryKeys.filterCountrySearch]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/company/country/');
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
