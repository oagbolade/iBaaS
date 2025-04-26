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
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  GetAllIndustryResponse,
  IIndustry,
  SearchIndustryResponse
} from '@/api/ResponseTypes/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { CreateIndustryFormValues } from '@/schemas/schema-values/setup';
import { handleRedirect } from '@/utils';

import { decryptData } from '@/utils/decryptData';

async function createIndustry(
  toastActions: IToastActions,
  body: CreateIndustryFormValues,
  isUpdating: boolean,
  industrycode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Industry/${
      isUpdating
        ? `UpdateIndustry?Industrycode=${decryptData(industrycode as string)}`
        : 'CreateIndustry'
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

export async function filterIndustrySearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/indusctries?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchIndustryResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'POST',
        data: {
          status: params?.status,
          industryName: params?.industryName,
          industryCode: params?.industryCode
        },
        headers: {
          'Content-Type': 'application/json',
          token: `${getStoredUser()?.token}`
        }
      }
    );

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

async function getIndustryByCode(
  toastActions: IToastActions,
  industrycode: string | null
): Promise<GetAllIndustryResponse> {
  let result: GetAllIndustryResponse = {
    responseCode: '',
    responseDescription: '',
    industry: {} as IIndustry
  };

  try {
    const urlEndpoint = `/Configuration/Industry/GetIndustryById?Industrycode=${decryptData(industrycode as string)}`;

    const { data }: AxiosResponse<GetAllIndustryResponse> = await axiosInstance(
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

export function useFilterIndustrySearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterIndustrySearch,
      params?.industryCode || '',
      params?.status?.toString() || '',
      params?.industryName || '',
      params?.page || 1
    ],
    queryFn: () => filterIndustrySearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.industryCode || '').length > 0 ||
        (params?.industryName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
export function useGetIndustryByCode(
  industrycode: string | null
): GetAllIndustryResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllIndustryResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getIndustryByCode, industrycode],
    queryFn: () => getIndustryByCode(toastActions, industrycode),
    enabled: Boolean((industrycode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateIndustry(
  isUpdating: boolean = false,
  industrycode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateIndustryFormValues) =>
      createIndustry(toastActions, body, isUpdating, industrycode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getIndustryByCode],
        [queryKeys.filterIndustrySearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/setup/kyc/industry/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
