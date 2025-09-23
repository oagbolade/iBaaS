import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  CreateEODConfigureFormValues,
  EODResponse,
  GetAllEODConfigurationResponse,
  GetAllEODDAYResponse,
  GetAllEODProcessesResponse,
  GetEODDAYResponse,
  GetProcessEODDAYResponse,
  IEODConfiguration,
  IEODLogs,
  IEODProcess,
  IEODProcessLogs,
  IEODViewLogs
} from '../ResponseTypes/operation';
import { APIResponse } from '../RequestTypes/CommonTypes';
import {
  axiosInstance,
  EndOfDayAxiosInstance,
  reportsAxiosInstance
} from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { handleRedirect } from '@/utils';
import { ISearchParams } from '@/app/api/search/route';
import { REPORT_BASE_URL } from '@/axiosInstance/constants';

async function createRunEOD(toastActions: IToastActions): Promise<EODResponse> {
  try {
    const urlEndpoint = `${REPORT_BASE_URL}/EODProcess/Run`;
    const { data }: AxiosResponse<EODResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);
    return data; // Return the EODResponse data
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse; // Rethrow or handle error appropriately
  }
}

async function createSaveEODConfiguration(
  toastActions: IToastActions,
  body: CreateEODConfigureFormValues
): Promise<void> {
  try {
    const urlEndpoint = `${REPORT_BASE_URL}/EODProcess/SaveEODConfiguration`;
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
    const urlEndpoint = `${REPORT_BASE_URL}/EODProcess/GetEODLogs?pageSize=${params?.pageSize || 1}&pageNumber=${params?.pageNumber || 10}&getAll=${params?.getAll || false}&searchWith=${params?.searchWith}&searchDate=${params?.searchDate}`;

    const { data }: AxiosResponse<GetEODDAYResponse> = await axiosInstance({
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
    const urlEndpoint = `${REPORT_BASE_URL}/EODProcess/GetEODResult`;

    const { data }: AxiosResponse<GetAllEODDAYResponse> = await axiosInstance({
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
async function getEODProcesses(
  toastActions: IToastActions
): Promise<GetAllEODProcessesResponse> {
  let result: GetAllEODProcessesResponse = {
    responseCode: '',
    responseDescription: '',
    data: [] as IEODProcessLogs[]
  };

  try {
    const urlEndpoint = `${REPORT_BASE_URL}/EODProcess/GetEODProcesses`;

    const { data }: AxiosResponse<GetAllEODProcessesResponse> =
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
async function getEODConfiguration(
  toastActions: IToastActions
): Promise<GetAllEODConfigurationResponse> {
  let result: GetAllEODConfigurationResponse = {
    responseCode: '',
    responseDescription: '',
    data: { days: [], time: '', options: 0 }
  };

  try {
    const urlEndpoint = `${REPORT_BASE_URL}/EODProcess/GetEODConfiguration`;

    const { data }: AxiosResponse<GetAllEODConfigurationResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });
    const transformedData: APIResponse = {
      ...data,
      responseCode: data.responseCode,
      responseDescription: data.responseDescription,
      data: data.data?.days // Pass only the days array
    };
    const { message, title, severity } = globalErrorHandler(transformedData);
    toast(message, title, severity, toastActions);

    result = data; // Ensure API response matches GetAllEODConfigurationResponse
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
    const urlEndpoint = `${REPORT_BASE_URL}/EODProcess/GetEODProcesslog?id=${id}&pageSize=${params?.pageSize || 1}&pageNumber=${params?.pageNumber || 10}&getAll=${params?.getAll || false}`;

    const { data }: AxiosResponse<GetProcessEODDAYResponse> =
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
export function useGetEODProcesses(): GetAllEODProcessesResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllEODProcessesResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getEODProcesses],
    queryFn: () => getEODProcesses(toastActions)
  });

  return { ...data, isError, isLoading };
}
export function useGetEODConfiguration(): GetAllEODConfigurationResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllEODConfigurationResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getEODConfiguration],
    queryFn: () => getEODConfiguration(toastActions)
  });

  return { ...data, isError, isLoading };
}
export function useCreateRunEOD() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, data } = useMutation({
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
    error,
    data
  };
}

export function useCreateEODConfiguration() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateEODConfigureFormValues) =>
      createSaveEODConfiguration(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [[queryKeys.getEODConfiguration]];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/operation/endOfDay/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
