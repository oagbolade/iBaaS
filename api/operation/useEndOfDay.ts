import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  GetAllEODDAYResponse,
  GetEODDAYResponse,
  GetProcessEODDAYResponse,
  IEODLogs,
  IEODProcess,
  IEODViewLogs
} from '../ResponseTypes/operation';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { EndOfDayAxiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { handleRedirect } from '@/utils';
import { ISearchParams } from '@/app/api/search/route';

async function createRunEOD(toastActions: IToastActions): Promise<void> {
  try {
    const urlEndpoint = '/EODProcess/Run';
    const { data }: AxiosResponse<APIResponse> = await EndOfDayAxiosInstance({
      url: urlEndpoint,
      method: 'POST',
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

async function getEODLogs(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<GetEODDAYResponse> {
  let result: GetEODDAYResponse = {
    responseCode: '',
    responseDescription: '',
    data: [] as IEODLogs[]
  };

  try {
    const urlEndpoint = `/EODProcess/GetEODLogs?pageSize=${params?.pageSize || 1}&pageNumber=${params?.pageNumber || 10}&getAll=${params?.getAll || false}&searchWith=${params?.searchWith}&searchDate=${params?.searchDate}`;

    const { data }: AxiosResponse<GetEODDAYResponse> =
      await EndOfDayAxiosInstance({
        url: urlEndpoint,
        method: 'GET',
        data: {
          searchWith: params?.searchWith,
          searchDate: params?.searchDate
        },
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
async function getEODResult(
  toastActions: IToastActions
): Promise<GetAllEODDAYResponse> {
  let result: GetAllEODDAYResponse = {
    responseCode: '',
    responseDescription: '',
    data: [] as IEODViewLogs[]
  };

  try {
    const urlEndpoint = '/EODProcess/GetEODResult';

    const { data }: AxiosResponse<GetAllEODDAYResponse> =
      await EndOfDayAxiosInstance({
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

async function getEODProcesslog(
  toastActions: IToastActions,
  params: ISearchParams | null,
  id: string | null
): Promise<GetProcessEODDAYResponse> {
  let result: GetProcessEODDAYResponse = {
    responseCode: '',
    responseDescription: '',
    data: [] as IEODProcess[]
  };

  try {
    const urlEndpoint = `/EODProcess/GetEODProcesslog?id=${id}&pageSize=${params?.pageSize || 1}&pageNumber=${params?.pageNumber || 10}&getAll=${params?.getAll || false}`;

    const { data }: AxiosResponse<GetProcessEODDAYResponse> =
      await EndOfDayAxiosInstance({
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
export function useGetEODProcesslog(
  params: ISearchParams | null,
  id: string | null
): GetProcessEODDAYResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetProcessEODDAYResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getEODProcesslog],
    queryFn: () => getEODProcesslog(toastActions, params, id)
  });

  return { ...data, isError, isLoading };
}

export function useGetEODLogs(params: ISearchParams | null): GetEODDAYResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetEODDAYResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getEODLogs,
      params?.searchDate || '',
      params?.searchWith || '',
      params?.pageSize || 10,
      params?.pageNumber || 1
    ],
    queryFn: () => getEODLogs(toastActions, params),
    enabled: Boolean(
      (params?.searchDate || '').length > 0 ||
        (params?.searchWith || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetEODResult(): GetAllEODDAYResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllEODDAYResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getEODResult],
    queryFn: () => getEODResult(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useCreateRunEOD() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => createRunEOD(toastActions),
    onSuccess: () => {
      const keysToInvalidate = [[queryKeys.getEODResult]];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/operation/createEndofday/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
