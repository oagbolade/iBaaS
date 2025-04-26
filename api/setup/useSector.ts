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
  GetAllSectorResponse,
  ISector,
  SearchSectorsResponse
} from '@/api/ResponseTypes/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { CreateSectorFormValues } from '@/schemas/schema-values/setup';
import { decryptData } from '@/utils/decryptData';

async function createSector(
  toastActions: IToastActions,
  body: CreateSectorFormValues,
  isUpdating: boolean,
  sectorCode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Sector/${
      isUpdating
        ? `UpdateSector?SectorCode=${decryptData(sectorCode as string)}`
        : 'CreateSector'
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

export async function filterSectorSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/sectors?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchSectorsResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: {
        status: params?.status,
        sectorName: params?.sectorname,
        sectorCode: params?.sectorCode
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

async function getAllSectors(
  toastActions: IToastActions
): Promise<GetAllSectorResponse> {
  let result: GetAllSectorResponse = {
    responseCode: '',
    responseDescription: '',
    sectors: []
  };

  try {
    const urlEndpoint = '/General/Sector/GetAllSector';

    const { data }: AxiosResponse<GetAllSectorResponse> = await axiosInstance({
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

async function getSectorByCode(
  toastActions: IToastActions,
  sectorCode: string | null
): Promise<GetAllSectorResponse> {
  let result: GetAllSectorResponse = {
    responseCode: '',
    responseDescription: '',
    sector: {} as ISector
  };

  try {
    const urlEndpoint = `/Configuration/Sector/GetSectorById?SectorCode=${decryptData(sectorCode as string)}`;

    const { data }: AxiosResponse<GetAllSectorResponse> = await axiosInstance({
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

export function useCreateSector(
  isUpdating: boolean = false,
  sectorCode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateSectorFormValues) =>
      createSector(toastActions, body, isUpdating, sectorCode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getSectorByCode],
        [queryKeys.filterSectorSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/kyc/sector/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

export function useFilterSectorSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterSectorSearch,
      params?.status?.toString() || '',
      params?.sectorCode || '',
      params?.sectorname || '',
      params?.page || 1
    ],
    queryFn: () => filterSectorSearch(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.sectorCode || '').length > 0 ||
        (params?.sectorname || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetSectorByCode(
  sectorCode: string | null
): GetAllSectorResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllSectorResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getSectorByCode, sectorCode],
    queryFn: () => getSectorByCode(toastActions, sectorCode),
    enabled: Boolean((sectorCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetAllSectors() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllSectorResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllSectors],
    queryFn: () => getAllSectors(toastActions)
  });

  return { ...data, isError, isLoading };
}
