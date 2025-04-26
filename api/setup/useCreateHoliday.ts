import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IHoliday,
  SearchHolidayResponse,
  UseGetAllHolidaysResponse
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
  CreateHolidayFromValue,
  HolidaySearchParams
} from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createHoliday(
  toastActions: IToastActions,
  body: CreateHolidayFromValue,
  isUpdating: boolean,
  id: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Holiday/${
      isUpdating ? `UpdateHoliday?id=${id}` : 'CreateHoliday'
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

async function getHolidayById(
  toastActions: IToastActions,
  id: string | null
): Promise<UseGetAllHolidaysResponse> {
  let result: UseGetAllHolidaysResponse = {
    responseCode: '',
    responseDescription: '',
    holiday: {} as IHoliday
  };

  try {
    const urlEndpoint = `/Configuration/Holiday/GetHolidayById?id=${id}`;

    const { data }: AxiosResponse<UseGetAllHolidaysResponse> =
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

export async function filterHolidaySearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/holidays?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchHolidayResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        holidaydays: params?.holidaydays,
        holidayDesc: params?.holidayDesc,
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

export function useFilterHolidaySearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterHolidaySearch,
      params?.holidaydays || '',
      params?.status || '',
      params?.holidayDesc || '',
      params?.page || 1
    ],
    queryFn: () => filterHolidaySearch(toastActions, params),
    enabled: Boolean(
      (params?.holidaydays?.toString() || '').length > 0 ||
        (params?.status?.toString() || '').length > 0 ||
        (params?.holidayDesc || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetHolidayById(
  id: string | null
): UseGetAllHolidaysResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllHolidaysResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getHolidayById, id],
    queryFn: () => getHolidayById(toastActions, id),
    enabled: Boolean((id || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateHoliday(
  isUpdating: boolean = false,
  id: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateHolidayFromValue) =>
      createHoliday(toastActions, body, isUpdating, id),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.filterHolidaySearch],
        [queryKeys.getHolidayById]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/company/holidays/');
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
